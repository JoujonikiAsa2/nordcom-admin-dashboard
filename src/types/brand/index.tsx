// 1. Define the Brand type based on the Prisma model (only necessary fields)
export type Brand = {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  isFeatured: boolean;
  createdAt: string;
};

import { ColumnDef } from "@tanstack/react-table";
// 2. Modify columns for BrandTable
import { ArrowUpDown, Calendar, Edit, Star, Tag } from "lucide-react";
import React from "react";

const ActionDropdown = ({
  brand,
  onEdit,
}: {
  brand: Brand;
  onEdit: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 hover:bg-gray-100 rounded-md flex items-center justify-center transition-colors"
      >
        <span className="sr-only">Open menu</span>
        <button
          onClick={() => {
            onEdit(brand.id);
            setIsOpen(false);
          }}
          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors curosr-pointer"
        >
          <Edit />
        </button>
      </button>
    </div>
  );
};

export const getBrandColumns = ({
  onEdit,
}: {
  onEdit: (id: string) => void;
}): ColumnDef<Brand>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-semibold text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Brand Name</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.logoUrl ? (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
            <img
              src={row.original.logoUrl}
              alt={`${row.original.name} logo`}
              className="w-8 h-8 object-contain"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <Tag className="h-5 w-5 text-orange-600" />
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.isFeatured ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Star className="w-3 h-3 mr-1" />
            Yes
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            No
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        className="flex items-center space-x-2 font-semibold text-gray-900 hover:text-orange-600 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <Calendar className="h-4 w-4" />
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
      return <ActionDropdown brand={brand} onEdit={onEdit} />;
    },
  },
];
