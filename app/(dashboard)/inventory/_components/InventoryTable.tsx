"use client";

import { DateToUTCDate } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { GetProductHistoryResponseType } from "@/app/api/products-history/route";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { DataTableColumnHeader } from "@/components/datatable/ColumnHeader";
import { cn } from "@/lib/utils";
import { DataTableFacetedFilter } from "@/components/datatable/FacetedFilters";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/datatable/ColumnToggle";

import { download, generateCsv, mkConfig } from "export-to-csv";
import { DownloadIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProductDialog from "@/app/(dashboard)/inventory/_components/DeleteProductDialog";
import EditProductDialog from "@/app/(dashboard)/inventory/_components/EditProductDialog";

import * as XLSX from "xlsx";

interface Props {
  from: Date;
  to: Date;
}

const emptyData: any[] = [];

type ProductHistoryRow = GetProductHistoryResponseType[0];

const columns: ColumnDef<ProductHistoryRow>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <p className="text-md rounded-lg bg-gray-400/5 p-2 text-center font-medium">
        {row.original.quantity}
      </p>
    ),
    sortingFn: (rowA, rowB) => {
      const amountA = rowA.original.quantity;
      const amountB = rowB.original.quantity;
      return amountA - amountB;
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Strain" />
    ),
    filterFn: (row, id, value) => {
      const strainName = row.original.productName;
      return value.includes(strainName);
    },
    cell: ({ row }) => <div className="flex gap-2">{row.original.productName}</div>,
  },
  {
    accessorKey: "grower",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grower" />
    ),
    filterFn: (row, id, value) => {
      const growerName = row.original.growerName;
      return value.includes(growerName);
    },
    cell: ({ row }) => <div className="flex gap-2">{row.original.growerName}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    filterFn: (row, id, value) => {
      const categoryName = row.original.categoryName;
      return value.includes(categoryName);
    },
    cell: ({ row }) => <div className="flex gap-2">{row.original.categoryName}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date Dropped",
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      const formattedDate = date.toLocaleDateString("default", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return <div className="text-muted-foreground">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions product={row.original} />,
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

function ProductTable({ from, to }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const history = useQuery<GetProductHistoryResponseType>({
    queryKey: ["products", "history", from, to],
    queryFn: () =>
      fetch(`/api/products-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then(
        (res) => res.json()
      ),
  });
  const handleExportExcel = (data: any[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    
    XLSX.writeFile(workbook, "inventory.xlsx");
  };
  const table = useReactTable({
    data: history.data || emptyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const categoriesOptions = useMemo(() => {
    const categoriesMap = new Map<string, { value: string; label: string }>();
    history.data?.forEach((inventory) => {
      const categoryName = inventory.categoryName || "No Category";
      categoriesMap.set(categoryName, {
        value: categoryName,
        label: `${categoryName}`,
      });
    });
    return Array.from(categoriesMap.values());
  }, [history.data]);
  const growersOptions = useMemo(() => {
    const growersMap = new Map();
    history.data?.forEach((inventory) => {
      growersMap.set(inventory.growerName, {
        value: inventory.growerName,
        label: `${inventory.growerName}`,
      });
    });
    const uniqueGrowers = new Set(growersMap.values());
    return Array.from(uniqueGrowers);
  }, [history.data]);
  const productsOptions = useMemo(() => {
    const productsMap = new Map<string, { value: string; label: string }>();
  
    history.data?.forEach((inventory) => {  // Explicitly type 'product'
      productsMap.set(inventory.productName, {
        value: inventory.productName,
        label: `${inventory.productName}`,
      });
    });
  
    return Array.from(productsMap.values());
  }, [history.data]);
  return (
    <div className="w-full">
            <div className="flex gap-2">

      <SkeletonWrapper isLoading={history.isFetching}>
      {table.getColumn("category") && (
            <DataTableFacetedFilter
              title="Category"
              column={table.getColumn("category")}
              options={categoriesOptions}
            />
          )}
          {table.getColumn("grower") && (
            <DataTableFacetedFilter
              title="Grower"
              column={table.getColumn("grower")}
              options={growersOptions}
            />
          )}
                    {table.getColumn("product") && (
            <DataTableFacetedFilter
              title="Strain"
              column={table.getColumn("product")}
              options={productsOptions}
            />
          )}
        <div className="rounded-md border">
          
          <Table>

            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </SkeletonWrapper>
      </div>
      <div className="flex flex-wrap gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            className="ml-auto h-8 lg:flex"
            onClick={() => {
              const data = table.getFilteredRowModel().rows.map((row) => ({
                category: row.original.categoryName,
                // categoryIcon: row.original.categoryIcon,
                grower: row.original.growerName,
                // growerIcon: row.original.growerIcon,
                // strain: row.original.strain,
                // strainIcon: row.original.strainIcon,
                description: row.original.description,
                quantity: row.original.quantity,
                // formattedAmount: row.original.formattedAmount,
                date: row.original.date,
              }));
              handleExportExcel(data); // Use Excel export function

              // handleExportCSV(data);
            }}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>
  );
}

export default ProductTable;

function RowActions({ product }: { product: ProductHistoryRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <EditProductDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        product={product}              
        productId={product.id}  
        trigger={undefined}   
        successCallback={() => {
          // Logic to handle after a product is successfully created
          console.log("Strain edited successfully");
        }}  
            />

      {/* DeleteProductDialog */}
      <DeleteProductDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        productId={product.id.toString()}
      />

      {/* Dropdown Menu for Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Edit Action */}
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => setShowEditDialog(true)} // Open the Edit dialog
          >
            Edit
          </DropdownMenuItem>

          {/* Delete Action */}
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => setShowDeleteDialog(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
