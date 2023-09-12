import React, { useEffect, useState } from "react";
import { IPayment } from "../../assets/interfaces";
import { getPayments } from "../Payments/Payments.api";

function Payments() {
  const [payments, setPayments] = useState<IPayment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPayments();
        console.log(data);
        setPayments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
