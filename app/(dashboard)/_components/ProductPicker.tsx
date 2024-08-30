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
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  onChange: (value: string) => void;
}

function ProductPicker({ onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [onChange, value]);

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(`/api/products`).then((res) => res.json()),
  });

  const growersQuery = useQuery({
    queryKey: ["growers"],
    queryFn: () => fetch(`/api/growers`).then((res) => res.json()),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch(`/api/categories`).then((res) => res.json()),
  });

  const products = Array.isArray(productsQuery.data) ? productsQuery.data : [];
  const growers = Array.isArray(growersQuery.data) ? growersQuery.data : [];
  // const categories = Array.isArray(categoriesQuery.data) ? categoriesQuery.data : [];

  const selectedProduct = products.find((product: Product) => product.product === value);

  const successCallback = useCallback(
    (product: Product) => {
      setValue(product.product);
      setOpen(false);
    },
    []
  );

  // Handle loading and error states separately
  // if (growersQuery.isLoading || categoriesQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (growersQuery.isError ) {
  //   return <div>Error: {(growersQuery.error || categoriesQuery.error).message}</div>;
  // }
  if (growersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (growersQuery.isError ) {
    return <div>Error: {(growersQuery.error).message}</div>;
  }

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
            <ProductRow product={selectedProduct} growers={growers} />
          ) : (
            "Select strain"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search product..." />
          <CreateProductDialog successCallback={successCallback} trigger={undefined} />
          <CommandEmpty>
            <p>Strain not found</p>
            <p className="text-xs text-muted-foreground">Tip: Create a new strain</p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {products.map((product: Product) => (
                <CommandItem
                  key={product.product}
                  onSelect={() => {
                    setValue(product.product);
                    setOpen(false);
                  }}
                >
                  <ProductRow product={product} growers={growers} />
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

// function ProductRow({ product, growers, categories }: { product: Product, growers: any[], categories: any[] }) {

function ProductRow({ product, growers }: { product: Product, growers: any[]}) {
  const growerName = growers.find((grower) => grower.id === product.growerId)?.name;
  // const categoryName = categories.find((category) => category.id === product.categoryId)?.name;

  return (
    <div className="flex items-center gap-2">
      <span>{product.product}</span>
      <span> - {growerName}</span>
      {/* <span> - {categoryName}</span> */}
    </div>
  );
}
