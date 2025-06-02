"use server";

import { getTokenFromCookies } from "../user";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllPayments = async () => {
  const token = await getTokenFromCookies();
  try {
    const res = await fetch(`${url}/payment`, {
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    console.log("Payment from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch orders", error as Error);
  }
};

