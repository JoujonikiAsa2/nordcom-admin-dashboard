"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";

const url = process.env.NEXT_PUBLIC_API_URL;
export const getAnalyticsData = async () => {
  const token = await getTokenFromCookies();

  try {
    const res = await fetch(`${url}/admin/analytics`, {
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    // console.log("order from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch orders", error as Error);
  }
};
