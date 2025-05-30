"use server";

const url = process.env.NEXT_PUBLIC_API_URL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTnVzcmF0IEphaGFuIFN1c2htaXRhIiwiZW1haWwiOiJudXNpZUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDg1NzQzMzQsImV4cCI6MTc0ODY2MDczNH0.5OSyyVqQDRj6NYlo1jqWLj78D0e5XFBGE0FbnvG68xw`;
export const getAllUsers = async () => {
  try {
    console.log("get all users");
    console.log("urllllllllllll", url);
    const res = await fetch(`${url}/user`, {
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    // console.log("user from server", result);
    return result.data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch users", error as Error);
  }
};

export const updateUserStatus = async (id: string, status: string) => {
  console.log("id", id, "status", status);
  try {
    const res = await fetch(`${url}/admin/${id}?status=${status}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: unknown) {
    throw new Error("Failed to update status", error as Error);
  }
};
