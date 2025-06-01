"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
const url = process.env.NEXT_PUBLIC_API_URL;
export const getTokenFromCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;
  return token;
};
export const getAllUsers = async () => {
  try {
    const res = await fetch(`${url}/user`, {
      headers: {
        Authorization: await getTokenFromCookies(),
      },
    });
    const result = await res.json();
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch users", error as Error);
  }
};

export const updateUserStatus = async (id: string, status: string) => {
  try {
    const res = await fetch(`${url}/admin/${id}?status=${status}`, {
      method: "PATCH",
      headers: {
        Authorization: await getTokenFromCookies(),
      },
    });
    const result = await res.json();
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to update status", error as Error);
  }
};

export const decodedUserInfoFromToken = async () => {
  const token = await getTokenFromCookies();
  console.log("token", token);
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  console.log("decoded token", decodedToken);
  return decodedToken;
};
