"use client";

import CreateProductDialog from "@/app/(dashboard)/_components/CreateProductDialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Grower, Category } from "@prisma/client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  onChange: (value: string) => void;
}

function ProductPicker({ onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (!value) return;
    // when the value changes, call onChange callback
    onChange(value);
  }, [onChange, value]);

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`/api/products`).then((res) => res.json()),
  });

const products = Array.isArray(productsQuery.data) ? productsQuery.data : [];

  const selectedProduct = products.find(
    (product: Product) => product.product === value
  );

  const successCallback = useCallback(
    (product: Product) => {
      setValue(product.product);
      setOpen((prev) => !prev);
    },
    [setValue, setOpen]
  );

  const growersQuery = useQuery({
    queryKey: ["growers"],
    queryFn: () =>
      fetch(`/api/growers`).then((res) => res.json()),
  });
  if (growersQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (growersQuery.isError) {
    return <div>Error: {growersQuery.error.message}</div>;
  }
  const growers=Array.isArray(growersQuery.data) ? growersQuery.data : [];

  
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`/api/categories`).then((res) => res.json()),
  });
  if (categoriesQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (categoriesQuery.isError) {
    return <div>Error: {categoriesQuery.error.message}</div>;
  }
  const categories=Array.isArray(categoriesQuery.data) ? categoriesQuery.data : [];

  // Ensure productsQuery.data is an array
  // Ensure productsQuery.data is an array
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedProduct ? (
            <ProductRow
    product={selectedProduct}
    growers={growers}
    categories={categories}
/>          ) : (
            "Select strain"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search product..." />
          <CreateProductDialog successCallback={successCallback} trigger={undefined} />
          <CommandEmpty>
            <p>Strain not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: Create a new strain
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {products.map((product: Product) => (
                <CommandItem
                  key={product.product}
                  onSelect={() => {
                    setValue(product.product);
                    setOpen((prev) => !prev);
                  }}
                >
              <ProductRow product={product} growers={growersQuery.data} categories={categoriesQuery.data} />
              <Check
                    className={cn(
                      "mr-2 w-4 h-4 opacity-0",
                      value === product.product && "opacity-100"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ProductPicker;

function ProductRow({ product, growers, categories }: { product: Product, growers: any[], categories: any[] }) {

  const growerName = growers.find((grower) => grower.id === product.growerId).name;

  
  const categoryName = categories.find((category) => category.id === product.categoryId).name;

  return (
    <div className="flex items-center gap-2">
      {/* <span role="img">{product.icon}</span> */}
      <span>{product.product}</span>
      <span>    -        {growerName}</span>
      <span>    -        {categoryName}</span>
    </div>
  );
}