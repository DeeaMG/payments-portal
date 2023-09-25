import axios from "axios";
import { IPayment } from "../../assets/interfaces";

const API_BASE_URL = "http://localhost:3001";

export const getPayments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments`);
    return response.data;
  } catch (error) {
    const err: Error = error as Error;
    console.error("Error fetching payments: " + err.message);
  }
};

export const editPayments = async (id: number, payment: IPayment | undefined) => {
  try {
    await axios.put(`${API_BASE_URL}/payments/${id}`, payment);
    console.info("Payment edited successfully", payment);
  } catch (error) {
    const err: Error = error as Error;
    console.error("Error fetching payments: " + err.message);
  }
};
