"use client";

import { fetchTransactionById } from "@/lib/helpers"; // Adjust your import
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transaction } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "@/app/(dashboard)/_components/CategoryPicker";
import {
  EditTransactionSchema,
  EditTransactionSchemaType,
} from "@/schema/transaction";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { EditTransaction } from "@/app/(dashboard)/transactions/_actions/editTransaction";
import ClientPicker from "../../_components/ClientPicker";

interface Props {
    trigger: ReactNode;
    successCallback: (transaction: Transaction) => void;
    transactionId: number;
transaction: {
    id: number;
    amount: number;
    price: number;
    client: {
      name: string;
    };
        date: Date;
    description: string | null;
    type: string;
}

    open: boolean;
    setOpen: (open: boolean) => void;
  }
  function EditTransactionDialog({ open, setOpen, transactionId, transaction, trigger, successCallback}: Props) {
    const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
    const [transactionAmount, setTransactionAmount] = useState<number>(0);
    const [transactionDescription, setTransactionDescription] = useState<string>("");

    const [showPicker, setShowPicker] = useState(false); 
    const [clientName, setClientName] = useState<string>("");

    // React Hook Form setup with Zod validation
    const form = useForm<EditTransactionSchemaType>({
        resolver: zodResolver(EditTransactionSchema),
        defaultValues: {
            id: transaction.id,
            amount: transaction.amount,
            price: transaction.price || undefined,
            client: "",
            description: transaction.description || "",
            date: new Date(),
            type: "order" || "returns",
        },
    });
    const queryClient = useQueryClient();
    useEffect(() => {
        async function fetchTransaction() {
          try {

            const transactionResponse = await fetch(`/api/transactions?id=${transaction.id}`);
            const transactionData = await transactionResponse.json();
    

            if (transactionResponse.ok) {
            setTransactionAmount(transactionData.amount);          
            setTransactionDescription(transactionData.description)            }
                      } 
          catch (error) {
            toast.error("Failed to fetch transaction information.");
          }
        }
    
        if (open) {
          fetchTransaction();
        }
      }, [open, transaction.amount, transaction.description, transaction.client]);

    const { mutate, isPending } = useMutation({
        mutationFn: EditTransaction,
        onSuccess: async (data: Transaction) => {
            form.reset({
                id: transaction.id,
                description: "",
        date: new Date(),
        amount: 0,
        price: undefined,
              });
              toast.success(`Transaction ${data.id} edited successfully 🎉`, {
                id: transactionId,
              });
                    successCallback(data); // Execute the callback after success
           await queryClient.invalidateQueries({ 
            queryKey: ["transactions"],
        });
            setOpen(false); // Close dialog after success
        },
        onError: () => {
            toast.error("Failed to edit the transaction");
        },
    });

    const onSubmit = useCallback(
        (values: EditTransactionSchemaType) => {
          toast.loading("Editing transaction...", {
            id: transactionId,
          });
          mutate({
            id: transactionId,
            data: {
              id: values.id,
              client: values.client,
              amount: values.amount,
              price: values.price,
              date: values.date,
              description: values.description,
              type: values.type, // Convert category to ID if present
            },
          });    },
        [mutate]
      );

    return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    {trigger ? (
      trigger
    ) : (
      <Button
        variant={"ghost"}
        className="flex items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
      >
        Edit Transaction
      </Button>
    )}
  </DialogTrigger>           
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogDescription>Update transaction details</DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
  control={form.control}
  name="client"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Client</FormLabel>
      <FormControl>
        {!showPicker ? (
        <Input
          {...field} // Connects the input field to react-hook-form
          value={field.value || clientName} // Displays the fetched growerName
          onFocus={() => setShowPicker(true)} // Show picker on input focus
          placeholder="Enter grower name"
        />
      ) : (
        <ClientPicker
          clientName={clientName} // Pass the current grower name
          onChange={(value: string) => {
            field.onChange(value); // Update form value
            setShowPicker(false); // Hide picker once a value is selected
          }}
        />
      )}
      </FormControl>
    </FormItem>
  )}
/> 
        {/* Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Amount Field */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Enter description"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Date Field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[200px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? format(field.value, "PPP")
                        : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(value) => value && field.onChange(value)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select a date for this item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type Dropdown Field */}
        <FormField 
  control={form.control}
  name="type"
  render={({ field }) => (
    <FormItem style={{ marginBottom: '20px' }}>
      <FormLabel>Type</FormLabel>
      <FormControl>
        <select
          {...field}
          className="border rounded-md p-2
           w-full"
          style={{ minWidth: '100%' }} // Ensure the select box does not overflow
        >
          <option value="">Select Type</option>
          <option value="order">Order</option>
          <option value="returns">Returns</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

        <DialogFooter>
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => {
              form.reset();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending ? "Edit" : <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  </DialogContent>
</Dialog>

    );
}

export default EditTransactionDialog;
