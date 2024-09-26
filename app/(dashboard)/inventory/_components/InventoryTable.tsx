"use client";
import { VisibilityState } from "@tanstack/react-table"; // Import the correct type

import { DateToUTCDate } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState, useRef } from "react";
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
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import Modal from 'react-modal';
import NextImage from "next/image";

interface Props {
  from: Date;
  to: Date;
}

function generateQrCodeUrl(strainName: string, quantity: number, category: string, grower: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL; // Use your app's URL
  const url = new URL(`${baseUrl}/strain/${encodeURIComponent(strainName)}`);
  url.searchParams.append('quantity', quantity.toString());
  url.searchParams.append('category', category);
  url.searchParams.append('grower', grower);
  return url.toString();
}

const emptyData: any[] = [];

type ProductHistoryRow = GetProductHistoryResponseType[0];
// type ProductHistoryRow = {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   productName: string;
//   growerName: string;
//   categoryName: string;
//   quantity: number;
//   value: number;
//   description: string | null;
//   date: Date;
//   grower: { name: string };
//   category: { name: string } | null;
// };

const columns: ColumnDef<ProductHistoryRow>[] = [
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
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
      const date = row.original.createdAt;
      return value.includes(date);
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
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
      const dateA = new Date(rowA.original.createdAt).getTime();
      const dateB = new Date(rowB.original.createdAt).getTime();
      return dateA - dateB;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value ($)" />
    ),
    cell: ({ row }) => (
      <p className="text-md rounded-lg bg-gray-400/5 p-2 text-center font-medium">
        {row.original.value}
      </p>
    ),
    enableHiding: true, 
    sortingFn: (rowA, rowB) => {
      const amountA = rowA.original.value ?? 0;
      const amountB = rowB.original.value ?? 0;
      return amountA - amountB;
    },
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
        enableHiding: true, 
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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    description: false,
    date: false,
    value: false,
    type: false,
    category: false,
  });

// Add pagination state with pageSize set to 30
const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 5000,
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
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleExportExcel = (data: any[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "Inventory.xlsx");
  };
  const categoriesOptions = useMemo(() => {
    const categoriesMap = new Map<string, { value: string; label: string }>();
    history.data?.forEach((product) => {
      const categoryName = product.category?.name || "No Category";
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
    history.data?.forEach((product) => {
      productsMap.set(product.productName, {
        value: product.productName,
        label: `${product.productName}`,
      });
    });
    return Array.from(productsMap.values());
  }, [history.data]);
  
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-2 py-4">
        <div className="flex gap-2">
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
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            className="ml-auto h-8 lg:flex"
            onClick={() => {
              const data = table.getFilteredRowModel().rows.map((row) => {
                // Format the date and time for Date_Ordered_or_Returned. Idk why it needs me to manually add the hours like this sorry :/
                const date = new Date(row.original.createdAt);
                const pstOffset = +0; // For PST without daylight savings, use -8
                const pstDate = new Date(date.getTime() +pstOffset * 60 * 60 * 1000);

                const formattedDateTime = `${pstDate.toLocaleDateString("default", {
                  timeZone: "PST",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })} ${pstDate.toLocaleTimeString("default", {
                  timeZone: "PST",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true, // This keeps the AM/PM format; remove if you prefer 24-hour format

                })}`;

           return { 
            Quantity: row.original.quantity,
                Strain: row.original.productName,
                Grower: row.original.growerName,
                Category: row.original.categoryName,
                Description: row.original.description,
                Date_Dropped: formattedDateTime,
                Value: row.original.value,

              };
              });
              handleExportExcel(data);
            }}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>
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
        
      </SkeletonWrapper>
    </div>
  );
}

export default ProductTable;


function RowActions({ product }: { product: ProductHistoryRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = (qrRef.current as HTMLDivElement).querySelector('canvas');
      if (canvas) {
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = image;
        link.click();
      }
    }
  };
  
// Create a string with all the product details
const qrCodeUrl = generateQrCodeUrl(product.productName, product.quantity, product.categoryName, product.growerName);

  return (
    <>
      {/* Render the EditProductDialog conditionally */}
      {showEditDialog && (
        <EditProductDialog
          open={showEditDialog}
          setOpen={setShowEditDialog}
          product={{
            ...product,
            value: product.value || 0,
          }}
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
        {/* Modal for Google QR Code */}
        <Modal
  isOpen={isQrModalOpen}
  onRequestClose={() => setIsQrModalOpen(false)}
  className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex"
>
  <div className="relative p-4 w-full max-w-md m-auto flex-col flex bg-white rounded-lg shadow-lg">
    <div className="flex items-center justify-between pb-3">
      <h2 className="text-lg font-semibold text-black">QR Code for {product.productName}</h2>
      <button onClick={() => setIsQrModalOpen(false)} className="text-black close-modal">
        &times;
      </button>
    </div>
    <div className="mb-4 flex justify-center">
    <QRCodeCanvas 
  value={qrCodeUrl} 
  size={256} 
/>
    </div>
    <div className="flex justify-center">
      <button
        onClick={downloadQRCode}
        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-700"
      >
        Save QR Code
      </button>
    </div>
  </div>
</Modal>
    </>
  );
}