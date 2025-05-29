"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BrandFormData } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { Label } from "recharts";

const BrandForm = () => {
  const [brandForm, setBrandForm] = useState<BrandFormData>({
    name: "",
    description: "",
    logoFile: null,
    logoPreview: "",
  });
  const handleBrandLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setBrandForm((prev) => ({
        ...prev,
        logoFile: file,
        logoPreview: blobUrl,
      }));
    }
  };
  const handleBrandSubmit = () => {
    console.log("Brand Form Data:", brandForm);
    // Handle brand creation
  };
  console.log("Brand Form Data:", brandForm);
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
