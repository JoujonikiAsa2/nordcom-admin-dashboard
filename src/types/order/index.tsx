"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  ArrowUpDown,
  MoreHorizontal,
  User,
  DollarSign,
  Package,
  Calendar,
  Eye,
} from "lucide-react";
import React from "react";

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  totalProduct: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "UNPAID" | "PAID" | "FAILED";
  shippingFee: number;
  createdAt: string;
  updatedAt: string;
}

export const getOrderColumns = ({
  onEdit,
  onDelete,
  onViewDetails,
}: {
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
  onViewDetails: (order: Order) => void;
}) => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <ShoppingCart className="h-4 w-4" />
        <span>Order ID</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <User className="h-4 w-4" />
        <span>Customer</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-gray-900">{row.original.userName}</div>
        <div className="text-sm text-gray-500">{row.original.userEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <DollarSign className="h-4 w-4" />
        <span>Total Amount</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        ${row.original.totalAmount.toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "totalProduct",
    header: "Products",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Package className="h-4 w-4 text-gray-500" />
        <span className="text-gray-600">{row.original.totalProduct} items</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        PAID: "bg-blue-100 text-blue-800",
        SHIPPED: "bg-purple-100 text-purple-800",
        CANCELLED: "bg-red-100 text-red-800",
        COMPLETED: "bg-green-100 text-green-800",
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
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const paymentStatus = row.original.paymentStatus;
      const paymentColors = {
        UNPAID: "bg-gray-100 text-gray-800",
        PAID: "bg-green-100 text-green-800",
        FAILED: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${paymentColors[paymentStatus]}`}
        >
          {paymentStatus}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <Calendar className="h-4 w-4" />
        <span>Created</span>
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
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => onViewDetails(order)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const mockOrders: Order[] = [
  {
    id: "ord_001",
    userId: "user_001",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    totalAmount: 299.99,
    totalProduct: 3,
    status: "COMPLETED",
    paymentStatus: "PAID",
    shippingFee: 15,
    createdAt: new Date("2024-03-01").toISOString(),
    updatedAt: new Date("2024-03-05").toISOString(),
  },
  {
    id: "ord_002",
    userId: "user_002",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    totalAmount: 149.5,
    totalProduct: 2,
    status: "SHIPPED",
    paymentStatus: "PAID",
    shippingFee: 10,
    createdAt: new Date("2024-03-10").toISOString(),
    updatedAt: new Date("2024-03-12").toISOString(),
  },
  {
    id: "ord_003",
    userId: "user_003",
    userName: "Mike Johnson",
    userEmail: "mike.johnson@example.com",
    totalAmount: 75.25,
    totalProduct: 1,
    status: "PENDING",
    paymentStatus: "UNPAID",
    shippingFee: 8,
    createdAt: new Date("2024-03-15").toISOString(),
    updatedAt: new Date("2024-03-15").toISOString(),
  },
  {
    id: "ord_004",
    userId: "user_004",
    userName: "Sarah Wilson",
    userEmail: "sarah.wilson@example.com",
    totalAmount: 450.0,
    totalProduct: 5,
    status: "CANCELLED",
    paymentStatus: "FAILED",
    shippingFee: 20,
    createdAt: new Date("2024-03-08").toISOString(),
    updatedAt: new Date("2024-03-09").toISOString(),
  },
  {
    id: "ord_005",
    userId: "user_005",
    userName: "David Brown",
    userEmail: "david.brown@example.com",
    totalAmount: 189.99,
    totalProduct: 2,
    status: "PAID",
    paymentStatus: "PAID",
    shippingFee: 12,
    createdAt: new Date("2024-03-20").toISOString(),
    updatedAt: new Date("2024-03-21").toISOString(),
  },
];
