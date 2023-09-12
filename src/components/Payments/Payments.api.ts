import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Replace with your actual API base URL

export const getPayments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments`);
    return response.data;
  } catch (error: any) {
    throw "Error fetching payments: " + error.message;
  }
};
