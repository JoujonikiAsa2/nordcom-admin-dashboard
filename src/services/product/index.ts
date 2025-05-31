"use server";

const url = process.env.NEXT_PUBLIC_API_URL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTnVzcmF0IEphaGFuIFN1c2htaXRhIiwiZW1haWwiOiJudXNpZUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDg2NjIyNzksImV4cCI6MTc0ODc0ODY3OX0.TPTYOH-yiLdBIhW5uVuiCdTXI28d4cr4fz-Otm9ems8`;

export const createProduct = async (payload: FormData) => {
  try {
    const res = await fetch(`${url}/product`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: payload,
    });
    const result = await res.json();
    console.log("result from server", result);
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to create product", error as Error);
  }
};
export const updateProduct = async (payload: FormData, id: string) => {
  try {
    const res = await fetch(`${url}/product/update/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
      body: payload,
    });
    const result = await res.json();
    console.log("result from server", result);
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to update product", error as Error);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${url}/product?admin=admin`);
    const result = await res.json();
    console.log("product from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch products", error as Error);
  }
};
export const getSingleProduct = async (id: string) => {
  try {
    const res = await fetch(`${url}/product/${id}`);
    const result = await res.json();
    console.log("product from server oid", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch products", error as Error);
  }
};
