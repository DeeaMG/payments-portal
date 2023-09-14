import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const getPayments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments`);
    return response.data;
  } catch (error: any) {
    throw new Error("Error fetching payments: " + error.message);
  }
};

export const editPayments = async (id: number, payment: object) => {
  try {
    await axios.put(`${API_BASE_URL}/payments/${id}`, { payment });
    console.log("Payment edited successfully", payment);
  } catch (error: any) {
    throw new Error("Error fetching payments: " + error.message);
  }
};
