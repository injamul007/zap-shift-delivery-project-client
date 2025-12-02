import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [paymentInfoErr, setPaymentInfoErr] = useState({});
  const calledRef = useRef(false);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!sessionId || calledRef.current) return;
      calledRef.current = true;
      try {
        const result = await axiosSecure.patch(
          `/payment-success?session_id=${sessionId}`
        );
        console.log(result.data);
        setPaymentInfo({
          trackingId: result.data.trackingId,
          transactionId: result.data.transactionId,
        });
      } catch (error) {
        console.log(error.message);
        console.log("ERROR DATA:", error.response.data);
        setPaymentInfoErr({
          trackingId: error.response.data.trackingId,
          transactionId: error.response.data.transactionId,
        })
        // console.log(error.response.data.transactionId);
        // console.log(error.response.data.trackingId);
      }
    };
    updatePaymentStatus();
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex justify-center items-center min-h-2/4 flex-col gap-2">
      <h2 className="text-4xl font-semibold">Payment Successful</h2>
      <p>
        Your Transaction id:{" "}
        <span className="font-semibold">
          {paymentInfo.transactionId
            ? paymentInfo.transactionId
            : paymentInfoErr.transactionId}
        </span>
      </p>
      <p>
        Your Parcels Tracking id:{" "}
        <span className="font-semibold">{paymentInfo.trackingId ? paymentInfo.trackingId : paymentInfoErr.trackingId}</span>
      </p>
    </div>
  );
};

export default PaymentSuccess;
