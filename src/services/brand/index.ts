"use server";

const url = process.env.NEXT_PUBLIC_API_URL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTnVzcmF0IEphaGFuIFN1c2htaXRhIiwiZW1haWwiOiJudXNpZUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDg1NzQzMzQsImV4cCI6MTc0ODY2MDczNH0.5OSyyVqQDRj6NYlo1jqWLj78D0e5XFBGE0FbnvG68xw`;

export const createBrand = async (payload: FormData) => {
  console.log("payload", payload);
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

export const getAllBrands = async () => {
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
