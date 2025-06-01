"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { getAllBrands } from "@/services/brand";
import { Brand } from "@/types/brand";
import { getAllCategories } from "@/services/category";
import { Category } from "@/types/category";
import { toast } from "sonner";
import { getSingleProduct, updateProduct } from "@/services/product";
import { useParams } from "next/navigation";

// Validation schema
const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .min(3, "SKU must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid positive number",
    }),
  discountPrice: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Discount price must be a valid non-negative number",
    }),
  stock: z
    .string()
    .min(1, "Stock quantity is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Stock must be a valid non-negative number",
    }),
  purchasedPrice: z
    .string()
    .min(1, "Purchased price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Purchased price must be a valid positive number",
    }),
  brandId: z.string().min(1, "Brand selection is required"),
  categoryId: z.string().min(1, "Category selection is required"),
  specification: z
    .array(
      z.object({
        label: z.string().min(1, "Specification name is required"),
        value: z.string().min(1, "Specification value is required"),
      })
    )
    .min(1, "At least one specification is required"),
  imageFiles: z
    .array(
      z.object({
        file: z.any().nullable(),
        preview: z.string(),
      })
    )
    .min(1, "At least one image is required")
    .refine((files) => files.some((f) => f.file !== null), {
      message: "At least one image file must be uploaded",
    }),
  seoInformation: z.array(
    z.object({
      title: z.string({ required_error: "SEO title is required" }),
      keyword: z.string({ required_error: "SEO keyword is required" }),
      description: z.string({ required_error: "SEO description is required" }),
    })
  ),
  variants: z
    .array(z.string().min(1, "Variant name is required"))
    .min(1, "At least one variant is required"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const ProductFormEdit = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { id } = useParams();
  console.log("pathname", id);
  useEffect(() => {
    const fetchProductToEdit = async () => {
      const res = await getSingleProduct(id as string);
      console.log("res", res);
      form.setValue("name", res.name);
      form.setValue("sku", res.sku);
      form.setValue("description", res.description);
      form.setValue("price", String(res.price));
      form.setValue("discountPrice", String(res.discountPrice));
      form.setValue("stock", String(res.stock));
      form.setValue("purchasedPrice", String(res.purchasedPrice));
      form.setValue("brandId", res.brandId);
      form.setValue("categoryId", res.categoryId);
      form.setValue("specification", res.specification);
      form.setValue("seoInformation", res.seoInformation);
      form.setValue("variants", res.variants);
      setLoading(false);
    };

    if (id) {
      fetchProductToEdit();
    }
  }, [id, loading]);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: "",
      discountPrice: "",
      stock: "",
      purchasedPrice: "",
      brandId: "",
      categoryId: "",
      specification: [{ label: "", value: "" }],
      imageFiles: [{ file: null, preview: "" }],
      seoInformation: [{ title: "", keyword: "", description: "" }],
      variants: [""],
    },
  });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control: form.control,
    name: "specification",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "imageFiles",
  });

  const {
    fields: seoFields,
    append: appendSeo,
    remove: removeSeo,
  } = useFieldArray({
    control: form.control,
    name: "seoInformation",
  });

  const { fields: variantFields, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants" as any,
  });

  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const resBrand = await getAllBrands();
        const resCategory = await getAllCategories();

        if (resBrand.length > 0) {
          const brandOptions = resBrand.map((brand: Brand) => ({
            id: brand.id,
            name: brand.name,
          }));
          setBrands(brandOptions);
        }

        if (resCategory.length > 0) {
          const categoryOptions = resCategory.map((category: Category) => ({
            id: category.id,
            name: category.name,
          }));
          setCategories(categoryOptions);
        }
      } catch (error) {
        console.error("Error fetching brands and categories:", error);
      } finally {
        setLoading(false);
      }
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
      const currentImages = form.getValues("imageFiles");
      const updatedImages = currentImages.map((item, i) =>
        i === index ? { ...item, file, preview: blobUrl } : item
      );
      form.setValue("imageFiles", updatedImages);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    const toastId = toast.loading("Updating product...");
    const payload = {
      name: data.name,
      sku: data.sku,
      discountPrice: Number(data.discountPrice),
      description: data.description,
      price: Number(data.stock),
      stock: Number(data.stock),
      stockStatus: true,
      brandId: data.brandId,
      purchasedPrice: Number(data.purchasedPrice),
      specification: data.specification,
      categoryId: data.categoryId,
      seoInformation: data.seoInformation,
      variants: data.variants,
      isDeleted: false,
    };
    const formDataPayload = new FormData();
    if (data.imageFiles[0].file) {
      const imagePayload = data.imageFiles[0].file;
      formDataPayload.append("file", imagePayload as Blob);
    }

    formDataPayload.append("data", JSON.stringify(payload));
    const res = await updateProduct(formDataPayload, id as string);

    if (res.success) {
      toast.success(res.message, { id: toastId });
      setLoading(true);
      // setActiveTab("all-product");
    } else {
      toast.error(res.message, { id: toastId });
    }

    // Handle product creation
  };

  const addSpecification = () => {
    appendSpec({ label: "", value: "" });
  };

  const addImage = () => {
    appendImage({ file: null, preview: "" });
  };

  const addSeoInfo = () => {
    appendSeo({ title: "", keyword: "", description: "" });
  };

  const addVariant = () => {
    const currentVariants = form.getValues("variants");
    form.setValue("variants", [...currentVariants, ""]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Product Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product name"
                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          SKU *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product SKU"
                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Description *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description"
                            rows={4}
                            className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Price *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Discount Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purchasedPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Purchased Price *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Stock Quantity *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Brand and Category */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Brand & Category
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Brand *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Category *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Images */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Product Images *
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
                {imageFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-3 p-4 border border-gray-100 rounded-lg bg-gray-50 mb-4"
                  >
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProductImageUpload(index, e)}
                        className="flex-1 cursor-pointer h-12 border-gray-200"
                      />
                      {imageFields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {form.watch(`imageFiles.${index}.preview`) && (
                      <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                        <Image
                          src={form.watch(`imageFiles.${index}.preview`)}
                          alt={`Product preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={200}
                          height={200}
                        />
                      </div>
                    )}
                  </div>
                ))}
                {form.formState.errors.imageFiles && (
                  <p className="text-sm text-red-600 mt-2">
                    {form.formState.errors.imageFiles.message}
                  </p>
                )}
              </div>

              {/* Dynamic Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Specifications */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Specifications *
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
                  {specFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-2 gap-2 mb-4">
                      <FormField
                        control={form.control}
                        name={`specification.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Specification name"
                                className="border-gray-200 focus:border-orange-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`specification.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Specification value"
                                  className="border-gray-200 focus:border-orange-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {specFields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeSpec(index)}
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
                      SEO Information (Optional)
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
                  {seoFields &&
                    seoFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-3 mb-6 p-4 border border-gray-100 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">
                            SEO Entry #{index + 1}
                          </span>
                          {seoFields.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeSeo(index)}
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name={`seoInformation.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-600">
                                SEO Title
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter SEO title"
                                  className="border-gray-200 focus:border-orange-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`seoInformation.${index}.keyword`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-600">
                                SEO Keywords
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter SEO keywords"
                                  className="border-gray-200 focus:border-orange-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`seoInformation.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-600">
                                SEO Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter SEO description"
                                  rows={3}
                                  className="border-gray-200 focus:border-orange-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Variants */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Product Variants *
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
                {variantFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-4">
                    <FormField
                      control={form.control}
                      name={`variants.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Variant (e.g., Red, Large, 64GB)"
                              className="border-gray-200 focus:border-orange-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {variantFields.length > 1 && (
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
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Updating..."
                    : "Update Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFormEdit;
