import React from "react";
import authImg from "../../../assets/authImage.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const { setUser, setLoading, signInUserFunc } = useAuth();
  const location = useLocation()
  console.log(location)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);

    signInUserFunc(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        setLoading(false);
        setUser(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "small-swal-popup",
          },
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="grid lg:grid-cols-12 lg:gap-0 gap-3">
      <div className="lg:col-span-6 order-2 lg:order-1 place-content-center mx-auto">
        <h2 className="text-3xl font-bold">Welcome Back </h2>
        <p className="mb-4">Login With ZapShift</p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is Required</p>
            )}

            {/* password field */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is Required</p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or more
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="btn btn-primary text-secondary mt-2"
            >
              Login
            </button>

            <p className="mx-auto">
              New to ZapShift? Please{" "}
              <Link 
              state={location.state}
                className="font-bold text-secondary/99"
                to={"/auth/register"}
              >
                Register
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

export default Login;
