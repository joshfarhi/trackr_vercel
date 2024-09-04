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
import React, { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
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
import { Loader2, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  trigger: ReactNode;
  product: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    product: string;
    growerId: number;
    categoryId: number | null;
    quantity: number;
    description: string | null;
  };
  productId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function EditProductDialog({ productId, trigger, product, open, setOpen }: Props) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [growerName, setGrowerName] = useState<string>("");

  // Fetch category and grower names
  useEffect(() => {
    async function fetchCategoryAndGrower() {
      try {
        const categoryResponse = await fetch(`/api/category/${product.categoryId}`);
        const growerResponse = await fetch(`/api/grower/${product.growerId}`);

        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          setCategoryName(categoryData.name);
        }

        if (growerResponse.ok) {
          const growerData = await growerResponse.json();
          setGrowerName(growerData.name);
        }
      } catch (error) {
        console.error("Error fetching category or grower", error);
        toast.error("Failed to fetch category or grower information.");
      }
    }

    if (open) {
      fetchCategoryAndGrower();
    }
  }, [open, product.categoryId, product.growerId]);

  const form = useForm<EditProductSchemaType>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      quantity: product.quantity,
      grower: growerName, // Set growerName after fetching
      category: categoryName, // Set categoryName after fetching
      description: product.description || "",
      createdAt: new Date(product.createdAt),
    },
  });

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: EditProduct,
    onSuccess: async () => {
      toast.success("Product edited successfully", {
        id: productId,
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      form.reset(); // Reset the form after successful submission
      setOpen(false); // Close the dialog
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: productId,
      });
    },
  });

  const onSubmit = (values: EditProductSchemaType) => {
    toast.loading("Editing product...", { id: productId });
    editMutation.mutate({
      id: productId, // The product ID
      data: {
        id: product.id, // The product's ID
        quantity: values.quantity, // Quantity from the form values
        createdAt: values.createdAt, // CreatedAt from the form values
        grower: values.grower, // Grower from the form values
        description: values.description || null, // Description or null if empty
        category: values.category || null, // Category or null if empty
      },
    });
  };

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
          <DialogDescription>Update strain details</DialogDescription>
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
                      value={Number(field.value) ?? 0}
                      type="number"
                      placeholder="Enter product quantity"
                    />
                  </FormControl>
                  <FormDescription>Quantity</FormDescription>
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
                    <CategoryPicker onChange={field.onChange} categoryName={categoryName} />
                  </FormControl>
                  <FormDescription>Select a category for this strain</FormDescription>
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
                    <GrowerPicker onChange={field.onChange} growerName={growerName} />
                  </FormControl>
                  <FormDescription>Select a grower for this strain</FormDescription>
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
                      placeholder="Enter description"
                    />
                  </FormControl>
                  <FormDescription>Description/notes (optional)</FormDescription>
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
                        onSelect={(value) => value && field.onChange(value)}
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
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={editMutation.status === "pending"}>
                {editMutation.status === "pending" ? <Loader2 className="animate-spin" /> : "Edit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductDialog;
