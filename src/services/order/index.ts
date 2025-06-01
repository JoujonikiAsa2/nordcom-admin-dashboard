"use server";

import { getTokenFromCookies } from "../user";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllOrders = async () => {
  const token = await getTokenFromCookies();
  try {
    const res = await fetch(`${url}/order`, {
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log("order from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch orders", error as Error);
  }
};

export const changeOrderStatus = async (id: string, status: string) => {
  const body = JSON.stringify({ status });
  const token = await getTokenFromCookies();

  try {
    const res = await fetch(`${url}/order/status/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body,
    });
    const result = await res.json();
    console.log("res", result);
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to update status", error as Error);
  }
};
