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
