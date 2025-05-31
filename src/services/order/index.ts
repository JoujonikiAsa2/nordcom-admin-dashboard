"use server";

const url = process.env.NEXT_PUBLIC_API_URL;
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTnVzcmF0IEphaGFuIFN1c2htaXRhIiwiZW1haWwiOiJudXNpZUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDg2NjIyNzksImV4cCI6MTc0ODc0ODY3OX0.TPTYOH-yiLdBIhW5uVuiCdTXI28d4cr4fz-Otm9ems8`;

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
