"use client";
import { Button } from "@/components/ui/button";

// import { EditProduct } from "@/app/(dashboard)/_actions/new-products";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TransactionType } from "@/lib/types";
import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  EditProductSchema,
  EditProductSchemaType,
} from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleOff, Loader2, PlusSquare } from "lucide-react";
import  { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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
// import StrainPicker from "@/app/(dashboard)/_components/StrainPicker";
import GrowerPicker from "@/app/(dashboard)/_components/GrowerPicker";
import CategoryPicker from "@/app/(dashboard)/_components/CategoryPicker";

interface Props {
  trigger: ReactNode;
  product: Product;
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string;
  successCallback: (product: Product) => void;

}

function EditProductDialog({ productId, trigger, successCallback }: Props) {
  const form = useForm<EditProductSchemaType>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      createdAt: new Date(), // Ensure this is a valid Date object
      product: '',           // Default product name
      quantity: 0,           // Default quantity
      grower: '',            // Default grower
      category: '',          // Default category
      description: '',       // Default description
    },
  });
  const [open, setOpen] = useState(false);
  // const handleProductChange = useCallback(
  //   (value: string) => {
  //     form.setValue("product", value);
  //   },
  //   [form]
  // );
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

 // const productIdentifier = `${product.product}`;
  const queryClient = useQueryClient();
  const theme = useTheme();
//Try DeleteProductDialog
  // const editMutation = useMutation({
  //   mutationFn: EditProduct,
  //   onSuccess: async () => {
  //     toast.success("Product edited successfully", {
  //       id: productId,
  //     });

  //     await queryClient.invalidateQueries({
  //       queryKey: ["products"],
  //     });
  //   },
  //   onError: () => {
  //     toast.error("Something went wrong", {
  //       id: productId,
  //     });
  //   },
  // });
  //A) Try CreateProductDialog
  const { mutate, isPending } = useMutation({
    mutationFn: EditProduct,
    onSuccess: async (data: Product) => {
      form.reset({
        // product: "",
        description: "",
        // icon: "",
        // strain: undefined,
        grower: undefined,
        category: undefined,
      });

      toast.success(`Strain ${data.product} edited successfully 🎉`, {
        id: "edit-product",
      });

      successCallback(data);

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "edit-product",
      });
    },
  });
  const onSubmit = useCallback(
    (values: EditProductSchemaType) => {
      console.log('Submitting values:', values);
      const parsedValues = {
        ...values,
        createdAt: new Date(values.createdAt), // Force it to be a Date object
      };
  
      // Ensure `grower` field is not empty
      if (!parsedValues.grower) {
        toast.error("Grower is required");
        return;
      }
  
      // Show loading toast
      toast.loading("Editing strain...", {
        id: "edit-product",
      });
       // Submit parsed values
       mutate(parsedValues);
      },
      [mutate]
  );
  return (
    // A CreateProductDialog
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      {trigger ? (
        trigger
      ) : (
        <Button
          variant={"ghost"}
          className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
        >
          <PlusSquare className="mr-2 h-4 w-4" />
          Edit new
        </Button>
      )}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Edit
          <span className={cn("m-1", "text-emerald-500")}></span>
          new Strain
        </DialogTitle>
        <DialogDescription>
          Name a new Strain and assign a Grower and Category
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* <FormField
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
          /> */}
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
          {/* <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="h-[100px] w-full">
                        {form.watch("icon") ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-5xl" role="img">
                              {field.value}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Click to change
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <CircleOff className="h-[48px] w-[48px]" />
                            <p className="text-xs text-muted-foreground">
                              Click to select
                            </p>
                          </div>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Picker
                        data={data}
                        theme={theme.resolvedTheme}
                        onEmojiSelect={(emoji: { native: string }) => {
                          field.onChange(emoji.native);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  This is how your product will appear in the app
                </FormDescription>
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategoryPicker onChange={handleCategoryChange} />
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
                  <GrowerPicker onChange={handleGrowerChange} />
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
                <Input
        {...field}   // Spread field but override `value` within it
        value={field.value ?? ""}  // Coerce `null` to an empty string
      />
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
                          className={cn(
                            "w-[200px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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
          {/* <FormField
            control={form.control}
            name="strain"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Strain</FormLabel>
                <FormControl>
                  <StrainPicker onChange={handleStrainChange} />
                </FormControl>
                <FormDescription>
                  Select a strain for this Product
                </FormDescription>
              </FormItem>
            )}
          /> */}
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
          {!isPending && "Edit"}
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
    //B) Delete Product Dialog
    // <AlertDialog>
    //   <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         This action cannot be undone. This will permanently edit your
    //         product
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //       <AlertDialogAction
    //         onClick={() => {
    //           toast.loading("Deleting product...", {
    //             id: productId,
    //           });
    //           editMutation.mutate(productId);
    //         }}
    //       >
    //         Continue
    //       </AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
  );
}

export default EditProductDialog;
