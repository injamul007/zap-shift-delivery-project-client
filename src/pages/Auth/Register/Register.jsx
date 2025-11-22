import React from "react";
import { useForm } from "react-hook-form";
import authImg from "../../../assets/authImage.png";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const { createRegisterUserFunc, updateUserProfileFunc, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log("after register", data.photo[0]);

    const profileImg = data.photo[0];

    createRegisterUserFunc(data.email, data.password)
      .then((result) => {
        const userAuthInfo = result.user;
        console.log(userAuthInfo);

        //? store the image in formData
        const formData = new FormData();
        formData.append("image", profileImg);

        //? send the photo to store and get the url
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_image_host_key
            }`,
            formData
          )
          .then((res) => {
            console.log("after image upload", res.data.data.url);

            //? now update the user profile to firebase
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };
            updateUserProfileFunc(userProfile)
              .then(() => {
                  logOut()
                    .then(() => {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Register Successful",
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                          popup: "small-swal-popup",
                        },
                      });
                      navigate(`${location.state ? location.state : '/'}`)
                    })
                    .catch((error) => console.log(error.message));
              })
              .catch((error) => console.log(error.message));
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="grid lg:grid-cols-12 lg:gap-0 gap-3">
      <div className="lg:col-span-6 order-2 lg:order-1 place-content-center mx-auto">
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <p className="mb-4">Register With ZapShift</p>
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            {/* Name field */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              {...register("name", { required: true })}
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is Required</p>
            )}

            {/* Photo field */}
            <label className="label">Photo</label>
            <input
              type="file"
              className="file-input"
              {...register("photo", { required: true })}
              placeholder="Your Photo"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is Required</p>
            )}

            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              {...register("email", { required: true })}
              placeholder="Example@email.com"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is Required</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
              })}
              placeholder="********"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is Required</p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 character or more
              </p>
            )}

            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have one uppercase,lowercase,special characters
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary text-secondary mt-2"
            >
              Register
            </button>

            <p className="mx-auto">
              Already have an account? Please{" "}
              <Link
              state={location.state}
               className="text-secondary font-bold" to={"/auth/login"}>
                Login
              </Link>{" "}
            </p>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
      <div className="lg:col-span-6 order-1 lg:order-2 bg-green-50 lg:-mt-22 lg:min-h-screen">
        <div>
          <img className="lg:mt-26" src={authImg} alt="authImg" />
        </div>
      </div>
    </div>
  );
};

export default Register;
