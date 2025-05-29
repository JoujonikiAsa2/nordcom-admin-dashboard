export interface BrandFormData {
  name: string;
  description: string;
  logoFile: File | null;
  logoPreview: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  parentId: string;
}

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
