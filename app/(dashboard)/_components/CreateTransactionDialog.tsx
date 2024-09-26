"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from "@/schema/transaction";
import { ReactNode, useCallback, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ClientPicker from "@/app/(dashboard)/_components/ClientPicker";
import ProductPicker from "@/app/(dashboard)/_components/ProductPicker";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransaction } from "@/app/(dashboard)/_actions/transactions";
import { toast } from "sonner";
import { DateToUTCDate } from "@/lib/helpers";

interface Props {
  trigger: ReactNode;
  type: TransactionType;
}

function CreateTransactionDialog({ trigger, type }: Props) {
  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
      client: undefined, // Initialize with undefined or null

      productId: undefined, // Initialize with undefined or null
    },
  });

  const [openDialog, setOpenDialog] = useState(false); // Separate state for the dialog

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateTransaction,
    onSuccess: () => {
      toast.success("Transaction created successfully 🎉", {
        id: "create-transaction",
      });

      form.reset({
        productId: undefined,
        price: undefined,
        type,
        client: "",
        description: "",
        amount: 0,
        date: new Date(),
      });

      // After creating a transaction, invalidate queries to refetch data
      queryClient.invalidateQueries({
        queryKey: ["overview"],
      });

      setOpenDialog((prev) => !prev);
    },
    onError: (error: any) => {
      // Catch any error thrown from the server (including negative inventory)
      toast.error(error?.message || "An error occurred during the transaction.");
    },
  });
  const handleClientChange = useCallback(
    (value: string) => {
      form.setValue("client", value);
    },
    [form]
  );
  const handleSubmit = useCallback(
    async (values: CreateTransactionSchemaType) => {
      try {
        // Proceed with transaction creation
        toast.loading("Creating transaction...", { id: "create-transaction" });

        mutate({
          ...values,
          date: DateToUTCDate(values.date),
        });

      } catch (error) {
        console.error("Error submitting transaction:", error);
      }
    },
    [mutate]
  );

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new
            <span
              className={cn(
                "m-1",
                type === "order" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type}
            </span>
            transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Strain</FormLabel>
                  <FormControl>
                    <ProductPicker onChange={(productId: number) => form.setValue("productId", productId)} />
                  </FormControl>
                  <FormDescription>Select a strain for this transaction</FormDescription>
                </FormItem>
              )}
            />
                                    <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? undefined} // Ensure default value is 0
                      type="number"
                      placeholder="Enter transaction price"
                      min={0} // Prevent negative values
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                  <ClientPicker clientName="" onChange={handleClientChange} />
                  </FormControl>
                  <FormDescription>
                    Select a client for this transaction
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input defaultValue={0} type="number" {...field} />
                  </FormControl>
                  <FormDescription>Transaction amount (required)</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>
                    Transaction description/notes (optional)
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isPending}
          >
            {!isPending && "Create"}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTransactionDialog;
