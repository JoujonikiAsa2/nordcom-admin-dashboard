"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CategoryFormData } from "@/types/category";
import { toast } from "sonner";
import { getSingleCategory, udpateCategory } from "@/services/category";
import { useParams } from "next/navigation";

const EditCategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    name: "",
    slug: "",
    parentId: "",
  });
  const { id } = useParams();
  useEffect(() => {
    const fetchCategoryToEdit = async () => {
      const res = await getSingleCategory(id as string);
      setCategoryForm((prev) => ({
        ...prev,
        name: res.name,
        slug: res.slug,
        parentId: res.parentId,
      }));
      setLoading(false);
    };
    fetchCategoryToEdit();
  }, [loading, id]);

  const handleCategorySubmit = async () => {
    const toastId = toast.loading("Updating category...");

    const res = await udpateCategory(id as string, {
      name: categoryForm.name,
      slug: categoryForm.slug,
    });
    if (res.success) {
      toast.success(res.message, { id: toastId });
    } else {
      toast.error(res.message, { id: toastId });
    }

    // Handle category creation
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Create New Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1  gap-6">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name *</Label>
                <Input
                  id="category-name"
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-slug">Slug</Label>
                <Input
                  id="category-slug"
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  placeholder="category-slug"
                />
              </div>
            </div>

            <div className="w-full flex justify-end ">
              <Button
                type="button"
                onClick={handleCategorySubmit}
                className="bg-orange-600 hover:bg-orange-700 "
              >
                Update Category
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategoryForm;
