import React from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleLoginFunc, setUser, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = () => {
    googleLoginFunc()
      .then((result) => {
        result.user;
        setLoading(false);
        setUser(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Login Successfully",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: "small-swal-popup",
          },
        });
        navigate(`${location.state ? location.state : "/"}`);
        
        //? create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure
          .post("/users", userInfo)
          .then((res) => {
            if (res.data.result.insertedId) {
              console.log("user created in the DB -->", res.data.result);
            }
          })
          .catch((err) => {
            console.log(err.message);
            console.log(err.response.data.message);
          });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="flex items-center flex-col">
      <p className="mx-auto font-bold">or</p>

      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        className="btn bg-white hover:bg-gray-300 text-black border-[#e5e5e5] w-full"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
