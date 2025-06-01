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
import { ChevronDown, Tag } from "lucide-react";
import { getBrandColumns } from "@/types/brand/index"; // Make sure this file exports column definitions
import { Brand } from "@/types/brand/index";
import { getAllBrands } from "@/services/brand";
import { useRouter } from "next/navigation";

const BrandTable = () => {
  const [loading, setLoading] = React.useState(false);
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const router = useRouter();
  React.useEffect(() => {
    const fetchBrands = async () => {
      const res = await getAllBrands();
      if (res.length > 0) setBrands(res);
      console.log("brands", res);
      setLoading(false);
    };

    fetchBrands();
  }, [loading]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const onEdit = (id: string) => {
    router.push(`/dashboard/admin/edit/brand/${id}`);
    // console.log(id);
  };

  const onDelete = (id: string) => {
    // router.push(`/dashboard/brands/delete/${id}`);
    console.log(id);
  };
  const columns = getBrandColumns({ onEdit, onDelete });

  const table = useReactTable({
    data: brands,
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
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Header Section */}

      {/* Table Section */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Controls */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div>
              <input
                placeholder="Filter name..."
                value={String(table.getColumn("name")?.getFilterValue() ?? "")}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
            <div className="relative">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white flex items-center space-x-2 transition-colors bg-white">
                <span>Columns</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white border-b border-gray-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-6 py-4 text-left">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={
                        getBrandColumns({
                          onEdit,
                          onDelete,
                        }).length
                      }
                      className="h-32 text-center text-gray-500 bg-white"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Tag className="h-8 w-8 text-gray-300" />
                        <span>No brands found.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-700">
              <span className="font-medium">
                {table.getFilteredSelectedRowModel().rows.length}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {table.getFilteredRowModel().rows.length}
              </span>{" "}
              row(s) selected.
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandTable;
