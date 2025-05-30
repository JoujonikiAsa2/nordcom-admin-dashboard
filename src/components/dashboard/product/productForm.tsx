"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { mockBrands, mockCategories } from "./mockData";
import { getAllBrands } from "@/services/brand";
import { Brand } from "@/types/brand";
import { getAllCategories } from "@/services/category";
import { Category } from "@/types/category";
const ProductForm = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    purchasedPrice: "",
    brandId: "",
    categoryId: "",
    specification: [{ key: "", value: "" }],
    imageFiles: [{ file: null as File | null, preview: "" }],
    seoInformation: [{ key: "", value: "" }],
    variants: [""],
  });

  React.useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      const resBrand = await getAllBrands();
      const resCategory = await getAllCategories();
      if (resBrand.length > 0) {
        const brandOptions = resBrand.map((brand: Brand) => ({
          id: brand.id,
          name: brand.name,
        }));
        console.log("brands", brandOptions);
        setBrands(brandOptions);
      }
      if (resCategory.length > 0) {
        const categoryOptions = resCategory.map((category: Category) => ({
          id: category.id,
          name: category.name,
        }));
        setCategories(categoryOptions);
        console.log("categories", categoryOptions);
      }

      setLoading(false);
    };

    fetchBrandsAndCategories();
  }, []);

  const handleProductImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setProductForm((prev) => ({
        ...prev,
        imageFiles: prev.imageFiles.map((item, i) =>
          i === index ? { ...item, file, preview: blobUrl } : item
        ),
      }));
    }
  };
  const handleProductSubmit = () => {
    const payload = {
      ...productForm,
      imageUrl: productForm.imageFiles[0],
    };
    console.log("Product Form Data:", payload);

    // Handle product creation
  };
  const addSpecification = () => {
    setProductForm((prev) => ({
      ...prev,
      specification: [...prev.specification, { key: "", value: "" }],
    }));
  };

  const removeSpecification = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      specification: prev.specification.filter((_, i) => i !== index),
    }));
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setProductForm((prev) => ({
      ...prev,
      specification: prev.specification.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  const addImage = () => {
    setProductForm((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, { file: null, preview: "" }],
    }));
  };

  const removeImage = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
    }));
  };

  const addSeoInfo = () => {
    setProductForm((prev) => ({
      ...prev,
      seoInformation: [...prev.seoInformation, { key: "", value: "" }],
    }));
  };

  const removeSeoInfo = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      seoInformation: prev.seoInformation.filter((_, i) => i !== index),
    }));
  };

  const updateSeoInfo = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setProductForm((prev) => ({
      ...prev,
      seoInformation: prev.seoInformation.map((info, i) =>
        i === index ? { ...info, [field]: value } : info
      ),
    }));
  };

  const addVariant = () => {
    setProductForm((prev) => ({
      ...prev,
      variants: [...prev.variants, ""],
    }));
  };

  const removeVariant = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const updateVariant = (index: number, value: string) => {
    setProductForm((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? value : variant
      ),
    }));
  };
  // console.log(productForm);
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="product-name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Product Name *
                  </Label>
                  <Input
                    id="product-name"
                    type="text"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter product name"
                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="product-sku"
                    className="text-sm font-medium text-gray-700"
                  >
                    SKU *
                  </Label>
                  <Input
                    id="product-sku"
                    type="text"
                    value={productForm.sku}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        sku: e.target.value,
                      }))
                    }
                    placeholder="Enter product SKU"
                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label
                  htmlFor="product-description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description *
                </Label>
                <Textarea
                  id="product-description"
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter product description"
                  rows={4}
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Pricing & Inventory
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="product-price"
                    className="text-sm font-medium text-gray-700"
                  >
                    Price *
                  </Label>
                  <Input
                    id="product-price"
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    placeholder="0.00"
                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="discount-price"
                    className="text-sm font-medium text-gray-700"
                  >
                    Discount Price
                  </Label>
                  <Input
                    id="discount-price"
                    type="number"
                    value={productForm.discountPrice}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        discountPrice: e.target.value,
                      }))
                    }
                    placeholder="0"
                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="purchased-price"
                    className="text-sm font-medium text-gray-700"
                  >
                    Purchased Price *
                  </Label>
                  <Input
                    id="purchased-price"
                    type="number"
                    step="0.01"
                    value={productForm.purchasedPrice}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        purchasedPrice: e.target.value,
                      }))
                    }
                    placeholder="0.00"
                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="product-stock"
                    className="text-sm font-medium text-gray-700"
                  >
                    Stock Quantity *
                  </Label>
                  <Input
                    id="product-stock"
                    type="number"
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        stock: e.target.value,
                      }))
                    }
                    placeholder="0"
                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Brand and Category */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Brand & Category
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="product-brand"
                    className="text-sm font-medium text-gray-700"
                  >
                    Brand *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setProductForm((prev) => ({ ...prev, brandId: value }))
                    }
                  >
                    <SelectTrigger className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="product-category"
                    className="text-sm font-medium text-gray-700"
                  >
                    Category *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setProductForm((prev) => ({ ...prev, categoryId: value }))
                    }
                  >
                    <SelectTrigger className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Product Images
                </h3>
                <Button
                  type="button"
                  onClick={addImage}
                  variant="outline"
                  size="sm"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
              {productForm.imageFiles.map((imageData, index) => (
                <div
                  key={index}
                  className="space-y-3 p-4 border border-gray-100 rounded-lg bg-gray-50 mb-4"
                >
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleProductImageUpload(index, e)}
                      className="flex-1 cursor-pointer h-12 border-gray-200"
                    />
                    {productForm.imageFiles.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeImage(index)}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 lallu" />
                      </Button>
                    )}
                  </div>
                  {imageData.preview && (
                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <Image
                        src={imageData.preview}
                        alt={`Product preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dynamic Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Specifications */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Specifications
                  </h3>
                  <Button
                    type="button"
                    onClick={addSpecification}
                    variant="outline"
                    size="sm"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                {productForm.specification.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2 mb-4">
                    <Input
                      type="text"
                      value={spec.key}
                      onChange={(e) =>
                        updateSpecification(index, "key", e.target.value)
                      }
                      placeholder="Specification name"
                      className="border-gray-200 focus:border-orange-500"
                    />
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpecification(index, "value", e.target.value)
                        }
                        placeholder="Specification value"
                        className="flex-1 border-gray-200 focus:border-orange-500"
                      />
                      {productForm.specification.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeSpecification(index)}
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* SEO Information */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    SEO Information
                  </h3>
                  <Button
                    type="button"
                    onClick={addSeoInfo}
                    variant="outline"
                    size="sm"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                {productForm.seoInformation.map((seo, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2 mb-4">
                    <Input
                      type="text"
                      value={seo.key}
                      onChange={(e) =>
                        updateSeoInfo(index, "key", e.target.value)
                      }
                      placeholder="SEO key"
                      className="border-gray-200 focus:border-orange-500"
                    />
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={seo.value}
                        onChange={(e) =>
                          updateSeoInfo(index, "value", e.target.value)
                        }
                        placeholder="SEO value"
                        className="flex-1 border-gray-200 focus:border-orange-500"
                      />
                      {productForm.seoInformation.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeSeoInfo(index)}
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Product Variants
                </h3>
                <Button
                  type="button"
                  onClick={addVariant}
                  variant="outline"
                  size="sm"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Variant
                </Button>
              </div>
              {productForm.variants.map((variant, index) => (
                <div key={index} className="flex gap-2 mb-4">
                  <Input
                    type="text"
                    value={variant}
                    onChange={(e) => updateVariant(index, e.target.value)}
                    placeholder="Variant (e.g., Red, Large, 64GB)"
                    className="flex-1 border-gray-200 focus:border-orange-500"
                  />
                  {productForm.variants.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeVariant(index)}
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="button"
                onClick={handleProductSubmit}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
              >
                Create Product
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
