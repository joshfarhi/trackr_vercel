"use client";
import { Button } from "@/components/ui/button";
import { EditProduct } from "@/app/(dashboard)/inventory/_actions/editProduct";
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
import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode, useCallback, useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GrowerPicker from "@/app/(dashboard)/_components/GrowerPicker";
import CategoryPicker from "@/app/(dashboard)/_components/CategoryPicker";
import {
  EditProductSchema,
  EditProductSchemaType,
} from "@/schema/product";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleOff, Loader2, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  trigger: ReactNode;
  product: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string;
}

function EditProductDialog({ productId, trigger}: Props) {
  const form = useForm<EditProductSchemaType>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      createdAt: new Date(),
    },
  });
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: EditProduct,

    // mutationFn: ({ id, data }: { id: string; data: EditProductSchemaType }) => EditProduct({ id, data }), // Update here
    onSuccess: async (data: Product) => {
      form.reset();
      toast.success(`Strain ${data.product} edited successfully 🎉`, {
        id: productId,
      });
      // successCallback(data);
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: productId,
      });
    },
  });

  const onSubmit = useCallback(
    (values: EditProductSchemaType) => {
      toast.loading("Editing product...", { id: productId });
      mutate(values);
    },
    [mutate, productId]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant={"ghost"} className="flex items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground">
            <PlusSquare className="mr-2 h-4 w-4" />
            Edit Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Strain</DialogTitle>
          <DialogDescription>
            Update strain details
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={Number(field.value) ?? 0} // Ensure default value is 0
                      type="number"
                      placeholder="Enter product quantity"
                    />
                  </FormControl>
                  <FormDescription>
                    Quantity
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategoryPicker onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Select a category for this strain
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grower"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Grower</FormLabel>
                  <FormControl>
                    <GrowerPicker onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Select a grower for this strain
                  </FormDescription>
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
                    <Input
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Description/notes (optional)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Transaction date</FormLabel>
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
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(value) => {
                          if (!value) return;
                          field.onChange(value);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select a date for this transaction</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {!isPending && "Edit"}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductDialog;
