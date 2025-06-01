"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";

const url = process.env.NEXT_PUBLIC_API_URL;

export const createCategory = async (payload: {
  name: string;
  slug: string;
}) => {
  const token = await getTokenFromCookies();
  try {
    const res = await fetch(`${url}/category`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    console.log("result from server", result);
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to create category", error as Error);
  }
};
export const udpateCategory = async (
  id: string,
  payload: {
    name: string;
    slug: string;
  }
) => {
  const token = await getTokenFromCookies();
  try {
    const res = await fetch(`${url}/category/update/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    console.log("result from server", result);
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to create category", error as Error);
  }
};

export const getAllCategories = async () => {
  const token = await getTokenFromCookies();
  try {
    const res = await fetch(`${url}/category`, {
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log("category from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch categories", error as Error);
  }
};
export const getSingleCategory = async (id: string) => {
  const token = await getTokenFromCookies();
  try {
    const res = await fetch(`${url}/category/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log("category from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch categories", error as Error);
  }
};

export const deleteCategory = async () => {
  const token = await getTokenFromCookies();
  try {
    const res = await fetch(`${url}/category`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log("result from server", result);
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to delete category", error as Error);
  }
};
