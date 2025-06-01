import React from "react";

import {
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Phone,
  User,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
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
  onView,
  onStatusChange,
}: {
  onView: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}): ColumnDef<User>[] => [
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
          <Image
            src={row.original.imageUrl}
            alt={row.original.name}
            className="h-8 w-8 rounded-full object-cover"
            width={32}
            height={32}
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
        BLOCKED: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            statusColors[status as keyof typeof statusColors]
          }`}
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
      const brand = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className={`${brand.role === "ADMIN" && "hidden"}`}
          >
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={brand.role === "ADMIN"}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-blue-600"
              onClick={() => onView(brand.id)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              className={
                brand.status === "ACTIVE" ? "text-red-600" : "text-green-600"
              }
              onClick={() =>
                onStatusChange(
                  brand.id,
                  brand.status === "ACTIVE" ? "BLOCKED" : "ACTIVE"
                )
              }
            >
              {row.original.status === "ACTIVE" ? "Block" : "Activate"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
