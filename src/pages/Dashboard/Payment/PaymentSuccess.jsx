import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (sessionId) {
        try {
          const result = await axiosSecure.patch(
            `/payment-success?session_id=${sessionId}`
          );
          console.log(result.data.result);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    updatePaymentStatus();
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex justify-center items-center min-h-2/4">
      <h2 className="text-4xl font-semibold">Payment Successful</h2>
    </div>
  );
};

export default PaymentSuccess;
