import EditCategoryForm from "@/components/dashboard/category/editCategoryForm";
import { Package } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Edit Category
            </h1>
          </div>
          <p className="text-gray-600 text-lg"> Edit your category details</p>
        </div>

        <EditCategoryForm />
      </div>
    </div>
  );
};

export default page;
