import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [mutationId, setMutationId] = useState(null);

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const result = await axiosSecure.get("/riders");
      return result.data.result;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ rider, status }) => {
      const updateInfo = { status: status, email: rider.email };
      const result = await axiosSecure.patch(`/riders/${rider._id}`, updateInfo);
      return result.data;
    },
    onSuccess: (data, variables) => {
      const { status } = variables;
      if (data?.result?.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been ${status}.`,
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "small-swal-popup",
          },
        });
      }
    },
    onError: (error) => {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message || "Something went wrong",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["riders", "pending"]);
      setMutationId(null);
    },
  });

  const handleApproval = async (rider) => {
    try {
      setMutationId(rider._id);
      await mutateAsync({ rider, status: "approved" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRejection = async (rider) => {
    try {
      setMutationId(rider._id);
      await mutateAsync({ rider, status: "rejected" });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-semibold text-center my-6">
        Riders Pending Approval: {riders.length}
      </h2>

      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>District</th>
                <th>NID No</th>
                <th>Phone No</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, idx) => (
                <tr key={rider._id}>
                  <th>{idx + 1}</th>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.yourDistrict}</td>
                  <td>{rider?.nidNumber}</td>
                  <td>{rider?.phoneNumber}</td>
                  <td>
                    {rider?.status === "approved" ? (
                      <p className="text-green-500 font-bold">{rider?.status}</p>
                    ) : rider?.status === "rejected" ? <p className="text-red-500 font-bold">{rider?.status}</p> : <p className="text-yellow-500 font-bold">{rider?.status}</p>}
                  </td>
                  <td>
                    {/* actions div */}
                    <div className="space-x-2">
                      <button
                        onClick={() => handleApproval(rider)}
                        className="btn btn-square hover:bg-green-300"
                        title="Accept Riders"
                        disabled={
                          rider?.status === "approved"
                            ? true
                            : mutationId === rider._id
                        }
                      >
                        {mutationId === rider._id ? (
                          "..."
                        ) : (
                          <FaUserCheck size={20} />
                        )}
                      </button>
                      <button
                        className="btn btn-square hover:bg-purple-400"
                        title="Reject Riders"
                        onClick={() => handleRejection(rider)}
                        disabled={rider?.status === 'rejected' ? true : mutationId === rider._id}
                      >
                        {
                          mutationId === rider._id ? "..." : <IoPersonRemove size={20} />
                        }
                      </button>
                      <button
                        className="btn btn-square hover:bg-red-400"
                        title="Delete Riders"
                      >
                        <MdDeleteForever size={26} />
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

export default ApproveRiders;
