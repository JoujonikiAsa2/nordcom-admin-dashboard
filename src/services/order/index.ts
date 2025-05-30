"use server";

const url = process.env.NEXT_PUBLIC_API_URL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTnVzcmF0IEphaGFuIFN1c2htaXRhIiwiZW1haWwiOiJudXNpZUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDg1NzQzMzQsImV4cCI6MTc0ODY2MDczNH0.5OSyyVqQDRj6NYlo1jqWLj78D0e5XFBGE0FbnvG68xw`;

export const getAllOrders = async () => {
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
  console.log("id", id, "status", body);
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
