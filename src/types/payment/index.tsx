"use client";
import React from "react";
import {
  CreditCard,
  ArrowUpDown,
  MoreHorizontal,
  DollarSign,
  Calendar,
  Hash,
} from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export interface Payment {
  id: string;
  orderId: string;
  method: string;
  amount: number;
  status: "UNPAID" | "PAID" | "FAILED";
  transactionId?: string | null;
  paidAt?: string | null;
}

export const getPaymentColumns = (): ColumnDef<Payment>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <Hash className="h-4 w-4" />
        <span>Payment ID</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm text-gray-600">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-gray-600">
        {row.original.orderId}
      </span>
    ),
  },
  {
    accessorKey: "method",
    header: "Payment Method",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <CreditCard className="h-4 w-4 text-gray-500" />
        <span className="text-gray-900">{row.original.method}</span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <DollarSign className="h-4 w-4" />
        <span>Amount</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">
        ${row.original.amount.toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        PAID: "bg-green-100 text-green-800",
        UNPAID: "bg-yellow-100 text-yellow-800",
        FAILED: "bg-red-100 text-red-800",
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
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-gray-600">
        {row.original.transactionId || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "paidAt",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <Calendar className="h-4 w-4" />
        <span>Paid At</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-gray-600">
        {row.original.paidAt
          ? new Date(row.original.paidAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Not paid"}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
              className="cursor-pointer"
            >
              Copy Payment ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.transactionId!)
              }
              className="cursor-pointer"
            >
              Copy Transaction ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const mockPayments: Payment[] = [
  {
    id: "pay_1",
    orderId: "ord_001",
    method: "Credit Card",
    amount: 299.99,
    status: "PAID",
    transactionId: "txn_abc123",
    paidAt: new Date("2024-03-20T10:30:00").toISOString(),
  },
  {
    id: "pay_2",
    orderId: "ord_002",
    method: "PayPal",
    amount: 149.5,
    status: "PAID",
    transactionId: "txn_def456",
    paidAt: new Date("2024-03-19T14:20:00").toISOString(),
  },
  {
    id: "pay_3",
    orderId: "ord_003",
    method: "Bank Transfer",
    amount: 89.99,
    status: "UNPAID",
    transactionId: null,
    paidAt: null,
  },
  {
    id: "pay_4",
    orderId: "ord_004",
    method: "Credit Card",
    amount: 450.0,
    status: "FAILED",
    transactionId: "txn_ghi789",
    paidAt: null,
  },
  {
    id: "pay_5",
    orderId: "ord_005",
    method: "Digital Wallet",
    amount: 199.99,
    status: "PAID",
    transactionId: "txn_jkl012",
    paidAt: new Date("2024-03-16T11:30:00").toISOString(),
  },
];
