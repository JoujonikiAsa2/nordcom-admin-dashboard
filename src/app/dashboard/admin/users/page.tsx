"use client";
import { getAllUsers, updateUserStatus } from "@/services/user";
import { getUserColumns, User } from "@/types/user";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, User as UserIcon } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function UserTable() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<User[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUsers();
      console.log("users", result);
      if (result.length > 0) setUsers(result);
      setLoading(false);
    };
    fetchUsers();
  }, [loading]);
  const handleView = (id: string) => {
    console.log("Edit user:", id);
    // Implement edit functionality
  };

  const handleStatusChange = async (id: string, status: string) => {
    const toastId = toast.loading("Updating user status...");

    // console.log("Delete user:", id);
    // console.log("id", id, "status", status);
    const res = await updateUserStatus(id, status);
    console.log("res", res);
    if (res.success) {
      toast.success(res.message, { id: toastId });
      setLoading(true);
    } else {
      toast.error(res.message, { id: toastId });
    }
    // Implement delete functionality
  };

  const table = useReactTable({
    data: users,
    columns: getUserColumns({
      onView: handleView,
      onStatusChange: handleStatusChange,
    }),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <UserIcon className="mr-3 h-8 w-8 text-orange-600" />
              User Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your users efficiently with comprehensive tools
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Controls */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <input
                placeholder="Filter users..."
                value={String(table.getColumn("name")?.getFilterValue() ?? "")}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <button className="ml-auto border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                <span>Columns</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
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
              {loading ? (
                <>
                  {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-100">
                      {Array.from({ length: 8 }).map((_, colIndex) => (
                        <td key={colIndex} className="px-4 py-3">
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : (
                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50 transition-colors"
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
                          getUserColumns({
                            onView: handleView,
                            onStatusChange: handleStatusChange,
                          }).length
                        }
                        className="h-24 text-center text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
