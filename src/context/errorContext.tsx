import React, { createContext, useContext, useState, ReactNode } from "react";
import { ErrorType } from "../assets/interfaces";

const ErrorContext = createContext<
  | {
      error: ErrorType | null;
      setError: (error: ErrorType | null) => void;
    }
  | undefined
>(undefined);

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
}

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ErrorType | null>(null);

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
}
