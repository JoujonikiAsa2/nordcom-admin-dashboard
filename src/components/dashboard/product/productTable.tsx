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
import { ChevronDown, Filter, Package, Search } from "lucide-react";
import { getProductColumns } from "@/types/product";
import { mockProducts } from "./mockData";

const ProductsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showColumnMenu, setShowColumnMenu] = React.useState(false);

  const onView = (id: string) => {
    console.log("View product:", id);
  };

  const onEdit = (id: string) => {
    console.log("Edit product:", id);
  };

  const onDelete = (id: string) => {
    console.log("Delete product:", id);
  };

  const columns = getProductColumns({ onEdit, onDelete, onView });

  const table = useReactTable({
    data: mockProducts,
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
    <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Products Inventory
            </h3>
            <p className="text-blue-100 text-sm">
              Manage and track your product catalog
            </p>
          </div>

          {/* Enhanced Search and Filter Section */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                placeholder="Search products..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(e) =>
                  table.getColumn("name")?.setFilterValue(e.target.value)
                }
                className="pl-10 pr-4 py-3 w-full sm:w-80 bg-white/90 backdrop-blur border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent placeholder-gray-500 text-gray-800 shadow-lg"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowColumnMenu(!showColumnMenu)}
                className="px-6 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl hover:bg-white/20 flex items-center space-x-2 transition-all duration-200 text-white shadow-lg w-full sm:w-auto justify-center"
              >
                <Filter className="h-4 w-4" />
                <span>Columns</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showColumnMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Column visibility dropdown */}
              {showColumnMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10 py-2">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <label
                        key={column.id}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded mr-3"
                          checked={column.getIsVisible()}
                          onChange={(e) =>
                            column.toggleVisibility(!!e.target.checked)
                          }
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {column.id.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </label>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Table Section */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-gray-50 border-b border-gray-200"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center space-x-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all duration-200 ${
                      row.getIsSelected()
                        ? "bg-gradient-to-r from-blue-50 to-orange-50 border-l-4 border-l-blue-500"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50/30"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
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
                    colSpan={columns.length}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="p-4 bg-gray-100 rounded-full">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          No products found
                        </h3>
                        <p className="text-gray-500">
                          Get started by adding your first product to the
                          inventory.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Pagination Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hidden sm:inline">Showing</span>
            <span className="font-semibold text-blue-600">
              {table.getFilteredSelectedRowModel().rows.length}
            </span>
            <span>of</span>
            <span className="font-semibold text-blue-600">
              {table.getFilteredRowModel().rows.length}
            </span>
            <span className="hidden sm:inline">products selected</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                table.getCanPreviousPage()
                  ? "bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 shadow-sm hover:shadow-md"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            <div className="hidden sm:flex items-center space-x-1">
              {Array.from(
                { length: Math.min(5, table.getPageCount()) },
                (_, i) => {
                  const pageIndex = i;
                  const isCurrentPage =
                    pageIndex === table.getState().pagination.pageIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => table.setPageIndex(pageIndex)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isCurrentPage
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                }
              )}
            </div>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                table.getCanNextPage()
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
