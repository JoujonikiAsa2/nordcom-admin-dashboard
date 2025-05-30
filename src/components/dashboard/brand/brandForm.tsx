"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBrand } from "@/services/brand";
import { BrandFormData } from "@/types";
import React, { useState } from "react";
import { toast } from "sonner";

const BrandForm = ({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [brandForm, setBrandForm] = useState<BrandFormData>({
    name: "",
    description: "",
    logoUrl: null,
    logoPreview: "",
    isFeatured: false,
  });
  const handleBrandLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setBrandForm((prev) => ({
        ...prev,
        logoUrl: file,
        logoPreview: blobUrl,
      }));
    }
  };
  const handleBrandSubmit = async () => {
    const toastId = toast.loading("Creating brand...");
    const modifedBrandForm = {
      name: brandForm.name,
      description: brandForm.description,
      isFeatured: brandForm.isFeatured,
    };
    const payload = new FormData();
    payload.append("file", brandForm.logoUrl as Blob);
    payload.append("data", JSON.stringify(modifedBrandForm));

    const res = await createBrand(payload);
    if (res.success) {
      toast.success(res.message, { id: toastId });
      setActiveTab("all-brand");
    } else {
      toast.error(res.message, { id: toastId });
    }
    // Handle brand creation
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Create New Brand
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Brand Name *</Label>
                <Input
                  id="brand-name"
                  type="text"
                  value={brandForm.name}
                  onChange={(e) =>
                    setBrandForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter brand name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Brand Logo</Label>
                <div className="space-y-4">
                  <Input
                    id="brand-logo"
                    type="file"
                    accept="image/*"
                    onChange={handleBrandLogoUpload}
                    className="cursor-pointer"
                  />
                  {brandForm.logoPreview && (
                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={brandForm.logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                id="brand-description"
                value={brandForm.description}
                onChange={(e) =>
                  setBrandForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter brand description"
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  id="is-featured"
                  type="checkbox"
                  checked={brandForm.isFeatured}
                  onChange={(e) =>
                    setBrandForm((prev) => ({
                      ...prev,
                      isFeatured: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <Label>
                  <label htmlFor="is-featured" className="cursor-pointer">
                    Featured Brand
                  </label>
                </Label>
              </div>
              <p className="text-sm text-gray-500">
                Mark this brand as featured to display it prominently
              </p>
            </div>
            <Button
              type="button"
              onClick={handleBrandSubmit}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Create Brand
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandForm;
