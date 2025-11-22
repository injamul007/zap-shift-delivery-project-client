import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import { ClockLoader } from "react-spinners";
import Swal from "sweetalert2";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, setLoading, loading, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out Successful",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "small-swal-popup",
          },
        });
      })
      .catch((error) => console.log(error.message));
  };

  const links = (
    <>
      <li>
        <NavLink to={"/service"}>Service</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li>

      {user && user.email && (
        <li>
          <NavLink to={"/dashboard/my-parcels"}>My Parcels</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-3xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-2">
        {loading ? (
          <ClockLoader color="#CAEB66" size={34} />
        ) : user ? (
          <>
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 border-2 border-gray-300 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-fit p-2 shadow"
              >
                <div className=" pb-3 border-b border-b-gray-200">
                  <li className="text-sm font-bold">{user.displayName}</li>
                  <li className="text-xs">{user.email}</li>
                </div>
                <li className="my-2">
                  <NavLink to={"/my-profile"}>
                    <FaUser /> Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm my-btn flex lg:hidden"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
            <button
              onClick={handleLogOut}
              className="btn my-btn hidden lg:flex"
            >
              <IoLogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/auth/login"}
              className="btn btn-sm md:btn-md lg:btn-md my-btn"
            >
              {" "}
              <IoLogIn /> Login
            </Link>
          </>
        )}
        <Link to={"/rider"} className="btn bg-primary">
          Be a rider
        </Link>
        <BsFillArrowUpRightCircleFill size={30} color="#CAEB66" />
      </div>
    </div>
  );
};

export default Navbar;
