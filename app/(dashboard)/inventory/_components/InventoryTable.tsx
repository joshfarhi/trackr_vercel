"use client";
import { VisibilityState } from "@tanstack/react-table"; // Import the correct type

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
import { QRCodeSVG } from 'qrcode.react';
import Modal from 'react-modal';
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
    enableHiding: false, // Amount is visible by default
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
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.productName || "No Strain"}
      </div>
    ),
    enableHiding: false, // Amount is visible by default
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
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.growerName || "No Grower"}
      </div>
    ),
    enableHiding: false, // Amount is visible by default

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
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.categoryName || "No Category"}
      </div>
    ),
        enableHiding: false, // Amount is visible by default

  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.original.description}</div>
    ),
    enableHiding: true, // Description is visible by default
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Dropped" />
    ),
    filterFn: (row, id, value) => {
      const date = row.original.date;
      return value.includes(date);
    },
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      const formattedDate = date.toLocaleDateString("default", {
        timeZone: "PST",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return <div className="text-muted-foreground">{formattedDate}</div>;
    },
    enableHiding: true, // Description is visible by default

    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.date).getTime();
      const dateB = new Date(rowB.original.date).getTime();
      return dateA - dateB;
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

// Add pagination state with pageSize set to 30
const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 30,
});
  // Query to fetch product history, including pagination
  const history = useQuery<GetProductHistoryResponseType>({
    queryKey: ["products", "history", from, to],
    queryFn: () =>
      fetch(
        `/api/products-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  // Assuming your server returns total rows available for pagination
  // const totalRows = history.data?.totalRows ?? 0;

  const table = useReactTable({
    data: history.data || emptyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination, // Include pagination state
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination, // Handle pagination changes
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <SkeletonWrapper isLoading={history.isFetching}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </SkeletonWrapper>
    </div>
  );
}

export default ProductTable;



function RowActions({ product }: { product: ProductHistoryRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

// Create a string with all the product details
const qrCodeValue = `${process.env.NEXT_PUBLIC_APP_URL}/product/${product.id}`;


  return (
    <>
      {/* Render the EditProductDialog conditionally */}
      {showEditDialog && (
        <EditProductDialog
          open={showEditDialog}
          setOpen={setShowEditDialog}
          product={product}
          productId={product.id}
          trigger={undefined}
          successCallback={() => {
            console.log("Strain edited successfully");
          }}
        />
      )}
      <DeleteProductDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        productId={product.id.toString()}
      />

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

          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => setShowEditDialog(true)}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => setShowDeleteDialog(true)}
          >
            Delete
          </DropdownMenuItem>
          {/* QR Code Button */}
          <DropdownMenuItem onSelect={() => setIsQrModalOpen(true)}>
            View QR Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


        {/* QR Code Modal */}
        <Modal
        isOpen={isQrModalOpen}
        onRequestClose={() => setIsQrModalOpen(false)}
        contentLabel="QR Code Modal"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black/50"
        >
  
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">QR Code for {product.productName}</h2>
                <QRCodeSVG value={qrCodeValue} size={150} className="mx-auto" />
                <button
                  className="mt-4 bg-gray-800 text-white px-4 py-2 rounded w-full"
                  onClick={() => setIsQrModalOpen(false)}
                >
                Close
                </button>
            </div>
          </Modal>
          </>
          );
          }