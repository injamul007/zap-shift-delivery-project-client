import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data.result;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            console.log(res.data.result);
            if (res.data.result.deletedCount) {
              //? refresh the data in the UI
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your Parcel request has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.log(error.message));
      }
    });
  };


  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName
    }
    
    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)
    window.location.assign(res.data.url);
  }

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl text-center my-12">
        All of My Parcels : {parcels.length || "No Parcel Found"}
      </h1>

      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Delivery Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, idx) => (
                <tr key={parcel._id}>
                  <th>{idx + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>
                    {
                      parcel.paymentStatus === "paid" ? <span className="text-green-400">Paid</span> : 
                      <button onClick={()=>handlePayment(parcel)} className="btn btn-sm bg-primary text-black">Pay</button>
                    }
                  </td>
                  <td>{parcel?.deliveryStatus}</td>
                  <td>
                    {/* actions div */}
                    <div className="space-x-2">
                      <button
                        className="btn btn-square hover:bg-green-300"
                        title="View"
                      >
                        <LuView />
                      </button>
                      <button
                        className="btn btn-square hover:bg-blue-300"
                        title="Edit"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="btn btn-square hover:bg-red-400"
                        title="Delete"
                        onClick={() => handleParcelDelete(parcel._id)}
                      >
                        <FaRegTrashCan />
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

export default MyParcels;
