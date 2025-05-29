"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { getBrandColumns } from "@/types/brand/index"; // Make sure this file exports column definitions
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Brand } from "@/types/brand/index";

const mockBrands: Brand[] = [
  {
    id: "1",
    name: "Samsung",
    description:
      "Leading global electronics company known for innovation in smartphones, TVs, and appliances.",
    logoUrl: "https://logo.clearbit.com/samsung.com",
    isFeatured: true,
    createdAt: "2024-08-01T10:15:00Z",
  },
  {
    id: "2",
    name: "Apple",
    description:
      "American technology company that designs iPhones, Macs, and other premium products.",
    logoUrl: "https://logo.clearbit.com/apple.com",
    isFeatured: true,
    createdAt: "2024-08-05T08:30:00Z",
  },
  {
    id: "3",
    name: "Sony",
    description:
      "Japanese brand famous for PlayStation, televisions, and high-quality audio gear.",
    logoUrl: "https://logo.clearbit.com/sony.com",
    isFeatured: false,
    createdAt: "2024-08-10T14:45:00Z",
  },
  {
    id: "4",
    name: "LG",
    description:
      "South Korean company that manufactures electronics, home appliances, and mobile devices.",
    logoUrl: "https://logo.clearbit.com/lg.com",
    isFeatured: false,
    createdAt: "2024-08-12T09:00:00Z",
  },
  {
    id: "5",
    name: "HP",
    description:
      "Trusted global brand for laptops, printers, and PC accessories.",
    logoUrl: "https://logo.clearbit.com/hp.com",
    isFeatured: true,
    createdAt: "2024-08-15T16:20:00Z",
  },
  {
    id: "6",
    name: "Dell",
    description:
      "American multinational company specializing in computers and related services.",
    logoUrl: "https://logo.clearbit.com/dell.com",
    isFeatured: false,
    createdAt: "2024-08-18T11:10:00Z",
  },
  {
    id: "7",
    name: "Asus",
    description:
      "Taiwanese electronics company that produces laptops, motherboards, and PC components.",
    logoUrl: "https://logo.clearbit.com/asus.com",
    isFeatured: true,
    createdAt: "2024-08-22T07:55:00Z",
  },
  {
    id: "8",
    name: "Acer",
    description:
      "Global PC brand known for affordable laptops, desktops, and monitors.",
    logoUrl: "https://logo.clearbit.com/acer.com",
    isFeatured: false,
    createdAt: "2024-08-25T13:40:00Z",
  },
];

const BrandTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const onView = (id: string) => {
    // router.push(`/dashboard/brands/${id}`);
    console.log(id);
  };

  const onEdit = (id: string) => {
    // router.push(`/dashboard/brands/edit/${id}`);
    console.log(id);
  };

  const onDelete = (id: string) => {
    // router.push(`/dashboard/brands/delete/${id}`);
    console.log(id);
  };
  const columns = getBrandColumns({ onEdit, onDelete, onView });

  const table = useReactTable({
    data: mockBrands, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full px-2">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
      </div>
    </div>
  );
};

export default BrandTable;
