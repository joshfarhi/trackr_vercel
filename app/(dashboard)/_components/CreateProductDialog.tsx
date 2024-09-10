"use client";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GrowerPicker from "@/app/(dashboard)/_components/GrowerPicker";
import CategoryPicker from "@/app/(dashboard)/_components/CategoryPicker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CreateProductSchema,
  CreateProductSchemaType,
} from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusSquare } from "lucide-react";
import React, { ReactNode, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProduct } from "@/app/(dashboard)/_actions/new-products";
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  trigger: ReactNode;
  successCallback: (product: Product) => void;
}

async function fetchUserSettings() {
  const res = await fetch("/api/user-settings");
  if (!res.ok) throw new Error("Failed to fetch user settings");
  return res.json();
}

function CreateProductDialog({ trigger, successCallback }: Props) {
  const form = useForm<CreateProductSchemaType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      createdAt: new Date(),
    },
  });

  const [open, setOpen] = useState(false);

  const { data: userSettings, isLoading } = useQuery({
    queryKey: ["userSettings"],
    queryFn: fetchUserSettings,
  });

  const handleProductChange = useCallback(
    (value: string) => {
      form.setValue("product", value);
    },
    [form]
  );

  const handleGrowerChange = useCallback(
    (value: string) => {
      form.setValue("grower", value);
    },
    [form]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      form.setValue("category", value);
    },
    [form]
  );

  const queryClient = useQueryClient();
  const theme = useTheme();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateProduct,
    onSuccess: async (data: Product) => {
      form.reset({
        product: "",
        description: "",
        grower: undefined,
        category: undefined,
      });

      toast.success(`Strain ${data.product} created successfully 🎉`, {
        id: "create-product",
      });

      successCallback(data);

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-product",
      });
    },
  });

  const onSubmit = useCallback(
    (values: CreateProductSchemaType) => {
      toast.loading("Creating strain...", {
        id: "create-product",
      });
      mutate(values);
    },
    [mutate]
  );

  if (isLoading) {
    return <div>Loading user settings...</div>;
  }

  const weightUnit = userSettings?.weight || "g";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant={"ghost"}
            className="flex items-center justify-start border-b px-3 py-3"
          >
            <PlusSquare className="mr-2 h-4 w-4" />
            Create new
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Create
            <span className="m-1 text-emerald-500"></span>
            new Strain
          </DialogTitle>
          <DialogDescription>
            Name a new Strain and assign a Grower and Category
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Strain" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your strain will appear in the app
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? 0}
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
                    <CategoryPicker
                      categoryName=""
                      onChange={handleCategoryChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Select a category for this Strain
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
                    <GrowerPicker
                      growerName=""
                      onChange={handleGrowerChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Select a grower for this Strain
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
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>
                    New strain description/notes (optional)
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
                          className="w-[200px] pl-3 text-left"
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
                        onSelect={(value) => {
                          if (!value) return;
                          field.onChange(value);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select a date for this</FormDescription>
                  <FormMessage />
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
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending && "Create"}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProductDialog;
