import React, { useEffect, useState } from "react";
import axios from "axios";
import { IPayment } from "../../assets/interfaces";

function Payments() {
  const [payments, setPayments] = useState<IPayment[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/payments")
      .then((response) => {
        console.log(response.data);
        setPayments(response.data);
      })
      .catch((error) => {
        console.error("There was an error when fetching: ", error);
      });
  }, []);

  return (
    <div>
      <h1>Payments</h1>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            Payment ID: {payment.id}, Total: {payment.totalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Payments;
