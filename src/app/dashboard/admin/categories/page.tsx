"use client";

import CategoryForm from "@/components/dashboard/category/categoryForm";
import CategoryTable from "@/components/dashboard/category/categoryTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Category = () => {
  return (
    <div className="flex items-start justify-center w-full h-full">
      <Tabs defaultValue="create-category" className="w-1/2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create-category">Create Category</TabsTrigger>
          <TabsTrigger value="all-category">All Category</TabsTrigger>
        </TabsList>
        <TabsContent value="create-category">
          <CategoryForm />
        </TabsContent>
        <TabsContent value="all-category">
          <CategoryTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Category;
