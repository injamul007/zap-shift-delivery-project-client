import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [mutationId, setMutationId] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data.result;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ user, role }) => {
      const roleUpdate = { role: role };
      try {
        const result = await axiosSecure.patch(
          `/users/${user._id}`,
          roleUpdate
        );
        return result.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    onSuccess: (data, variables) => {
      const { user, role } = variables;
      const userName = user?.displayName || "This User";

      let roleDescription = "";
      if (role === "admin") {
        roleDescription = "marked as an admin";
      } else if (role === "user") {
        roleDescription = "remove from an admin";
      }

      if (data?.result?.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${userName}  ${roleDescription}`,
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "medium-swal-popup",
          },
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message || "Something went wrong",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
      setMutationId(null);
    },
  });

  const handleMakeAdmin = async (user) => {
    if (mutationId) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Don't worry you can also revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make this user to Admin!",
      customClass: {
        popup: "confirmation-swal-popup",
      },
    });
    if (result.isConfirmed) {
      try {
        setMutationId(user._id);
        await mutateAsync({ user, role: "admin" });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleRemoveAdmin = async (user) => {
    if (mutationId) return;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Don't worry you can also revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove this user from Admin!",
      customClass: {
        popup: "confirmation-swal-popup",
      },
    });
    if (result.isConfirmed) {
      try {
        setMutationId(user._id);
        await mutateAsync({ user, role: "user" });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl text-center my-6 font-semibold">
        Manage Users : {users.length}
      </h2>

      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Role</th>
                <th>Admin Actions</th>
                <th>Other Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <img className="w-20" src={user.photoURL} alt="" />
                  </td>
                  <td>
                    {user?.role === "admin" ? (
                      <p className="text-green-700 font-bold">{user?.role}</p>
                    ) : (
                      <p className="font-bold">{user?.role}</p>
                    )}
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-square hover:bg-purple-400"
                        title="Remove Admin"
                        disabled={mutationId === user._id}
                      >
                        {mutationId === user._id ? (
                          "..."
                        ) : (
                          <FiShieldOff color="red" size={26} />
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-square hover:bg-green-300"
                        title="Make Admin"
                        disabled={mutationId === user._id}
                      >
                        {mutationId === user._id ? (
                          "..."
                        ) : (
                          <FaUserShield color="green" size={26}></FaUserShield>
                        )}
                      </button>
                    )}
                  </td>
                  <td>
                    {/* actions div */}
                    <div className="space-x-2">
                      <button
                        className="btn btn-square hover:bg-red-400"
                        title="Delete Riders"
                      ></button>
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

export default UsersManagement;
