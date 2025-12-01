import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data.result;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="text-center min-h-[30vh] flex items-center justify-center space-x-2">
      <h2 className="font-bold text-2xl">
        Please Pay <span className="text-primary">${parcel.cost}</span> for :{" "}
        {parcel.parcelName}
      </h2>
      <button className="btn btn-sm btn-primary text-secondary font-bold">
        Pay
      </button>
    </div>
  );
};

export default Payment;
