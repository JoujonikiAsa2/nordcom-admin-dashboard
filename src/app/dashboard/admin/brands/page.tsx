"use client";
import BrandForm from "@/components/dashboard/brand/brandForm";
import BrandTable from "@/components/dashboard/brand/brandTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsDemo = () => {
  return (
    <div className="flex items-start justify-center w-full h-full">
      <Tabs defaultValue="create-brand" className="w-1/2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create-brand">Create Brand</TabsTrigger>
          <TabsTrigger value="all-brands">All Brands</TabsTrigger>
        </TabsList>
        <TabsContent value="create-brand">
          <BrandForm />
        </TabsContent>
        <TabsContent value="all-brands">
          <BrandTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsDemo;
