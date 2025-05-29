import React from "react";
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
import {
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Phone,
  User,
  Shield,
} from "lucide-react";
export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  phone?: string;
  address?: string;
  country?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "CUSTOMER",
    status: "ACTIVE",
    phone: "+1234567890",
    address: "123 Main St, New York",
    country: "USA",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-03-20").toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    phone: "+1987654321",
    address: "456 Oak Ave, California",
    country: "USA",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    createdAt: new Date("2024-02-10").toISOString(),
    updatedAt: new Date("2024-03-18").toISOString(),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "CUSTOMER",
    status: "INACTIVE",
    phone: "+1122334455",
    address: "789 Pine St, Texas",
    country: "USA",
    createdAt: new Date("2024-01-05").toISOString(),
    updatedAt: new Date("2024-02-15").toISOString(),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "CUSTOMER",
    status: "SUSPENDED",
    phone: "+1555666777",
    address: "321 Elm Dr, Florida",
    country: "USA",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    createdAt: new Date("2024-03-01").toISOString(),
    updatedAt: new Date("2024-03-25").toISOString(),
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "CUSTOMER",
    status: "ACTIVE",
    phone: "+1888999000",
    address: "654 Maple Rd, Washington",
    country: "USA",
    createdAt: new Date("2024-02-20").toISOString(),
    updatedAt: new Date("2024-03-10").toISOString(),
  },
];

export const getUserColumns = ({
  onEdit,
  onDelete,
  onViewProfile,
}: {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onViewProfile: (user: User) => void;
}) => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <User className="h-4 w-4" />
        <span>Name</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        {row.original.imageUrl ? (
          <img
            src={row.original.imageUrl}
            alt={row.original.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
            <User className="h-4 w-4 text-orange-600" />
          </div>
        )}
        <span className="font-medium text-gray-900">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <Mail className="h-4 w-4" />
        <span>Email</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Shield className="h-4 w-4 text-gray-500" />
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            row.original.role === "ADMIN"
              ? "bg-purple-100 text-purple-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {row.original.role}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        ACTIVE: "bg-green-100 text-green-800",
        INACTIVE: "bg-gray-100 text-gray-800",
        SUSPENDED: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        {row.original.phone ? (
          <>
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{row.original.phone}</span>
          </>
        ) : (
          <span className="text-gray-400">Not provided</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <span className="text-gray-600">
        {row.original.country || "Not specified"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Created At</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600">
        {new Date(row.original.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-8 z-50 min-w-[160px] bg-white rounded-md shadow-lg border border-gray-200 py-1">
              <button
                onClick={() => {
                  onViewProfile(user);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  onEdit(user);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Edit User
              </button>
              <button
                onClick={() => {
                  onDelete(user);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete User
              </button>
            </div>
          )}

          {isOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      );
    },
  },
];
