"use server";

import getTokenFromCookies from "@/utils/getTokenFromCookies";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL;
console.log(url)

export const login = async (email: string, password: string) => {
  const res = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const response = await res.json();
  console.log(response);
  if (response.success && response.data.accessToken) {
    const { data } = response;
    const cookieStore = await cookies();
    cookieStore.set("token", data.accessToken);
    return response;
  } else {
    return response;
  }
};

export const getAdminProfileInfo = async () => {
  const token = (await cookies()).get("token")?.value as string;
  const res = await fetch(`${url}/user/admin`, {
    headers: {
      Authorization: token,
    },
  });
  const response = await res.json();
  return response;
};

export const logout = async () => {
  const token = getTokenFromCookies();

  if (!token) return null;
  const cookieStore = await cookies();
  cookieStore.delete("token");
  const isTokenDeleted = await getTokenFromCookies();
  console.log("isTokenDeleted", isTokenDeleted);
  return isTokenDeleted ? true : false;
};
