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
import { GetTransactionHistoryResponseType } from "@/app/api/transactions-history/route";
import { useEffect } from "react";

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
import { DownloadIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteTransactionDialog from "@/app/(dashboard)/transactions/_components/DeleteTransactionDialog";
import EditTransactionDialog from "@/app/(dashboard)/transactions/_components/EditTransactionDialog";

import * as XLSX from "xlsx";

interface Props {
  from: Date;
  to: Date;
}

const emptyData: any[] = [];

type TransactionHistoryRow = GetTransactionHistoryResponseType[0];

const columns: ColumnDef<TransactionHistoryRow>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <p className="text-md rounded-lg bg-gray-400/5 p-2 text-center font-medium">
        {row.original.amount}
      </p>
    ),
    enableHiding: false, // Amount is visible by default
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
      <div className="flex gap-2">
        <div className="">{row.original.productName}</div>
      </div>
    ),
    enableHiding: false, // Strain is visible by default
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
        {row.original.growerName}
      </div>
    ),
    enableHiding: false, // Grower is visible by default
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
      <DataTableColumnHeader column={column} title="Date Ordered/Returned" />
    ),
    filterFn: (row, id, value) => {
      const date = row.original.date;
      return value.includes(date);
    },
    cell: ({ row }) => {
      // const date = new Date(row.original.date);
      // const formattedDate = date.toLocaleDateString("default", {
      //   timeZone: "PST",
      //   year: "numeric",
      //   month: "2-digit",
      //   day: "2-digit",
      // });
      const date = new Date(row.original.date);
      const pstOffset = +4; // For PST without daylight savings, use -8
      const pstDate = new Date(date.getTime() + pstOffset * 60 * 60 * 1000);

      const formattedDate = `${pstDate.toLocaleDateString("default", {
        timeZone: "PST",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}`;
      return <div className="text-muted-foreground">{formattedDate}</div>;
    },
    enableHiding: true, // Date is hidden by default
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price ($)" />
    ),
    cell: ({ row }) => (
      <p className="text-md rounded-lg bg-gray-400/5 p-2 text-center font-medium">
        {row.original.price}
      </p>
    ),
    enableHiding: true, // Amount is visible by default
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
    enableHiding: false, // Category is hidden by default
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    filterFn: (row, id, value) => {
      const clientName = row.original.clientName;
      return value.includes(clientName);
    },
     cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.clientName}
      </div>
    ),
    enableHiding: true, // Grower is visible by default
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    filterFn: (row, id, value) => {
      const typeName = row.original.type;
      return value.includes(typeName);
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize rounded-lg text-center p-2",
          row.original.type === "order" && "bg-emerald-400/10 text-emerald-500",
          row.original.type === "returns" && "bg-red-400/10 text-red-500"
        )}
      >
        {row.original.type === "order" ? "ordered" : "returned"}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false, // Actions column is hidden by default
    cell: ({ row }) => <RowActions transaction={row.original} />,
  },
];



const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

function TransactionTable({ from, to }: Props) {
  // State to track if the component is rendering on the client
  const [isMounted, setIsMounted] = useState(false);

  // Detect when the component has mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    if (typeof window !== "undefined") {
      const savedFilters = localStorage.getItem('transactionTableFilters');
      return savedFilters ? JSON.parse(savedFilters) : [];
    }
    return [];
  });


const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10000,
  });

  const history = useQuery<GetTransactionHistoryResponseType>({
    queryKey: ["transactions", "history", from, to],
    queryFn: () =>
      fetch(
        `/api/transactions-history?from=${DateToUTCDate(
          from
        )}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  const handleExportCSV = (data: any[]) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };
  const handleExportExcel = (data: any[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    if (typeof window !== "undefined") {
      const savedVisibility = localStorage.getItem('transactionTableVisibility');
      return savedVisibility ? JSON.parse(savedVisibility) : {
        description: false, // Initially hidden
        date: false, // Initially hidden
        price: false,
        category: false,
        client: false,
        type: false,
      };
    }
    return {
      description: false, // Initially hidden
      date: false, // Initially hidden
      price: false,
      category: false,
      client: false,
      type: false,
    };
  });


 // Save filters and visibility state to localStorage on client side only
 useEffect(() => {
  if (isMounted) {
    localStorage.setItem('transactionTableFilters', JSON.stringify(columnFilters));
  }
}, [columnFilters, isMounted]);

useEffect(() => {
  if (isMounted) {
    localStorage.setItem('transactionTableVisibility', JSON.stringify(columnVisibility));
  }
}, [columnVisibility, isMounted]);

  const table = useReactTable({
    data: history.data || emptyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility, // Include the column visibility state here
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility, // Update visibility state based on changes

  });
  const categoriesOptions = useMemo(() => {
    const categoriesMap = new Map<string, { value: string; label: string }>();
    history.data?.forEach((transaction) => {
      const categoryName = transaction.categoryName || "No Category";
      categoriesMap.set(categoryName, {
        value: categoryName,
        label: `${categoryName}`,
      });
    });
    return Array.from(categoriesMap.values());
  }, [history.data]);
  const clientsOptions = useMemo(() => {
    const clientsMap = new Map();
    history.data?.forEach((transaction) => {
      clientsMap.set(transaction.clientName, {
        value: transaction.clientName,
        label: `${transaction.clientName}`,
      });
    });
    const uniqueGrowers = new Set(clientsMap.values());
    return Array.from(uniqueGrowers);
  }, [history.data]);
  const growersOptions = useMemo(() => {
    const growersMap = new Map();
    history.data?.forEach((transaction) => {
      growersMap.set(transaction.growerName, {
        value: transaction.growerName,
        label: `${transaction.growerName}`,
      });
    });
    const uniqueGrowers = new Set(growersMap.values());
    return Array.from(uniqueGrowers);
  }, [history.data]);
  const productsOptions = useMemo(() => {
    const productsMap = new Map<string, { value: string; label: string }>();
  
    history.data?.forEach((transaction) => {  // Explicitly type 'product'
      productsMap.set(transaction.productName, {
        value: transaction.productName,
        label: `${transaction.productName}`,
      });
    });
  
    return Array.from(productsMap.values());
  }, [history.data]);


    // Render a fallback (e.g., a loading state) while the component is hydrating
    if (!isMounted) {
      return <div>Loading...</div>;
    }
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
                    {table.getColumn("client") && (
            <DataTableFacetedFilter
              title="Client"
              column={table.getColumn("client")}
              options={clientsOptions}
            />
          )}
          {table.getColumn("type") && (
            <DataTableFacetedFilter
              title="Type"
              column={table.getColumn("type")}
              options={[
                { label: "order", value: "order" },
                { label: "returns", value: "returns" },
              ]}
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
                const date = new Date(row.original.date);
                const pstOffset = +4; // For PST without daylight savings, use -8
                const pstDate = new Date(date.getTime() + pstOffset * 60 * 60 * 1000);

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
                  Amount: row.original.amount, // Assuming this is numeric, no formatting required
                  Strain: row.original.productName,
                  Grower: row.original.growerName,
                  Category: row.original.categoryName,
                  Client: row.original.clientName,
                  Description: row.original.description,
                  Date_Ordered_or_Returned: formattedDateTime, // Use the formatted date and time for export
                 Price: row.original.price,
                  Type: row.original.type,                };
              });
              
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
      <SkeletonWrapper isLoading={history.isFetching}>
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
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
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

export default TransactionTable;


function RowActions({ transaction }: { transaction: TransactionHistoryRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      {showEditDialog && (
        <EditTransactionDialog
          open={showEditDialog}
          setOpen={setShowEditDialog}
          transaction={{
            ...transaction,
            price: transaction.price || 0,
            client: { name: transaction.clientName }, // Ensure client property is included
          }}
          transactionId={transaction.id}
          trigger={undefined}
          successCallback={() => {
            console.log("Transaction edited successfully");
          }}
        />
      )}
      <DeleteTransactionDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        transactionId={transaction.id.toString()}
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

        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
