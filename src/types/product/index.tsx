"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Package, Star } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export interface ProductFormData {
  name: string;
  sku: string;
  description: string;
  price: string;
  discountPrice: string;
  stock: string;
  purchasedPrice: string;
  brandId: string;
  categoryId: string;
  specification: Array<{ key: string; value: string }>;
  imageFiles: Array<{ file: File | null; preview: string }>;
  seoInformation: Array<{ key: string; value: string }>;
  variants: string[];
}

export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  discountPrice: number;
  stock: number;
  stockStatus: boolean;
  isFeatured: boolean;
  images: string[];
  brandId: string;
  categoryId: string;
  createdAt: string;
  brand?: { name: string };
  category?: { name: string };
};

export const getProductColumns = ({
  onEdit,
  onDelete,
  onView,
}: {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium hover:text-orange-500 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Product</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {product.images[0] ? (
              <Image
                src={product.images[product?.images?.length-1]}
                alt={product.name}
                className="h-12 w-12 rounded-lg object-cover"
                width={48}
                height={48}
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 flex items-center space-x-2">
              <span>{product.name}</span>
              {product.isFeatured && (
                <Star className="h-4 w-4 text-orange-500 fill-current" />
              )}
            </div>
            <div className="text-sm text-gray-500">{product.sku}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <span className="text-gray-900 font-medium">
        {row.original.brand?.name || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {row.original.category?.name || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium hover:text-orange-500 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Price</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const discountPrice = row.original.discountPrice;
      const hasDiscount = discountPrice < price;

      return (
        <div className="text-right">
          {hasDiscount ? (
            <div>
              <div className="text-lg font-bold text-orange-600">
                ${discountPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 line-through">
                ${price.toFixed(2)}
              </div>
            </div>
          ) : (
            <div className="text-lg font-bold text-gray-900">
              ${price.toFixed(2)}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-medium hover:text-orange-500 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Stock</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      const stockStatus = row.original.stockStatus;

      return (
        <div className="text-center">
          <div className="font-medium text-gray-900">{stock}</div>
          <div
            className={`text-xs px-2 py-1 rounded-full ${
              stockStatus && stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {stockStatus && stock > 0 ? "In Stock" : "Out of Stock"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-gray-600">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
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
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50 transition-colors"
              onClick={() => onView(brand.id)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 transition-colors"
              onClick={() => onEdit(brand.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
              onClick={() => onDelete(brand.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
