"use client";

import ProductForm from "@/components/dashboard/product/productForm";
import ProductsTable from "@/components/dashboard/product/productTable";
import { List, Package, Plus } from "lucide-react";
import { useState } from "react";

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState("create-product");

  const tabs = [
    {
      id: "create-product",
      label: "Create Product",
      icon: Plus,
      color: "orange",
    },
    {
      id: "all-products",
      label: "All Products",
      icon: List,
      color: "blue",
    },
  ];

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Product Management
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your products efficiently with our comprehensive tools
          </p>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex-1
                      ${
                        isActive
                          ? `bg-gradient-to-r ${
                              tab.color === "orange"
                                ? "from-orange-500 to-orange-600"
                                : "from-blue-500 to-blue-600"
                            } text-white shadow-lg transform scale-105`
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" ")[0]}</span>

                    {/* Active indicator for mobile */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-sm animate-pulse sm:hidden" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab indicator line for desktop */}
          <div className="hidden sm:block mt-1 relative">
            <div className="h-1 bg-gray-200 rounded-full">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  activeTab === "create-product"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 w-1/2"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 w-1/2 translate-x-full"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Tab Content with Animation */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${
                activeTab === "create-product" ? "0%" : "-100%"
              })`,
            }}
          >
            {/* Create Product Tab */}
            <div className="w-full flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-1">
                  <ProductForm />
                </div>
              </div>
            </div>

            {/* All Products Tab */}
            <div className="w-full flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-1">
                  <ProductsTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
