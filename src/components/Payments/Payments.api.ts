import axios from "axios";
import { IPayment } from "../../assets/interfaces";
import { Dispatch, SetStateAction } from "react";
import { ErrorType } from "../../assets/interfaces";

const API_BASE_URL = "http://localhost:3001";

export function handleApiError(error: Error, setError: Dispatch<SetStateAction<ErrorType | null>>) {
  const err: Error = error as Error;
  console.error(err.message);
  setError({ message: err.message });
  throw err;
}

export const getPayments = async (setError: Dispatch<SetStateAction<ErrorType | null>>) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments`);
    return response.data;
  } catch (error) {
    const err: Error = error as Error;
    handleApiError(err, setError);
  }
};

export const editPayments = async (
  id: number,
  payment: IPayment | undefined,
  setError: Dispatch<SetStateAction<ErrorType | null>>
) => {
  try {
    await axios.put(`${API_BASE_URL}/payments/${id}`, payment);
    console.info("Payment edited successfully", payment);
  } catch (error) {
    const err: Error = error as Error;
    handleApiError(err, setError);
  }
};
