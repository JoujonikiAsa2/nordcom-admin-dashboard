"use server";

const url = process.env.NEXT_PUBLIC_API_URL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTnVzcmF0IEphaGFuIFN1c2htaXRhIiwiZW1haWwiOiJudXNpZUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDg1NzQzMzQsImV4cCI6MTc0ODY2MDczNH0.5OSyyVqQDRj6NYlo1jqWLj78D0e5XFBGE0FbnvG68xw`;

export const createCategory = async (payload: {
  name: string;
  slug: string;
}) => {
  console.log("payload", payload);
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

export const getAllCategories = async () => {
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

export const deleteCategory = async () => {
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
