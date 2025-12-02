import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { LuView } from "react-icons/lu";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/payment-history?email=${user.email}`
      );
      return result.data.result;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-semibold text-center my-6">
        Payment History : {payments.length}
      </h2>

      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Parcel Name</th>
                <th>Transaction ID</th>
                <th>Tracking ID</th>
                <th>Payment Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={payment._id}>
                  <th>{idx + 1}</th>
                  <td>{payment.parcelName}</td>
                  <td>{payment.transactionId}</td>
                  <td>
                    {payment.trackingId}
                  </td>
                  <td>$ <span className="font-bold">{payment?.amount}</span> ({payment.paymentStatus})</td>
                  <td>
                    {/* actions div */}
                    <div className="space-x-2">
                      <button
                        className="btn btn-square hover:bg-green-300"
                        title="View"
                      >
                        <LuView />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
