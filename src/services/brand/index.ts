"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";

const url = process.env.NEXT_PUBLIC_API_URL;

export const createBrand = async (payload: FormData) => {
  const token = await getTokenFromCookies();

  try {
    const res = await fetch(`${url}/brand`, {
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
    throw new Error("Failed to create brand", error as Error);
  }
};
export const updateBrand = async (id: string, payload: FormData) => {
  const token = await getTokenFromCookies();

  try {
    const res = await fetch(`${url}/brand/update/${id}`, {
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
    throw new Error("Failed to create brand", error as Error);
  }
};

export const getAllBrands = async () => {
  const token = await getTokenFromCookies();

  try {
    const res = await fetch(`${url}/brand`, {
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log("brand from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch brands", error as Error);
  }
};
export const getSingleBrand = async (id: string) => {
  const token = await getTokenFromCookies();

  try {
    const res = await fetch(`${url}/brand/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log("brand from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch brands", error as Error);
  }
};
