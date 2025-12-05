import React from "react";
import { FaCreditCard, FaUsers } from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { RiEBike2Fill } from "react-icons/ri";
import { TfiPackage } from "react-icons/tfi";
import { NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {

  const {role} = useRole();


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square lg:hidden btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <GoSidebarCollapse />
          </label>
          <div className="px-4 font-bold">My Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 lg:w-46 w-40">
          {/* Sidebar content here */}
          <ul className="menu w-full pt-16">
            {/* our dashboard links */}
            {/* List item */}
            <NavLink to={"/"}>
              <li>
                <button data-tip="Homepage">
                  {/* Home icon */}
                  <IoHomeOutline />
                  <span>Homepage</span>
                </button>
              </li>
            </NavLink>

            <NavLink to={"/dashboard/my-parcels"}>
              <li>
                {""}
                <button>
                  <TfiPackage /> My Parcels
                </button>
              </li>
            </NavLink>
            
            <NavLink to={"/dashboard/payment-history"}>
              <li>
                {""}
                <button>
                  <FaCreditCard /> Payment History
                </button>
              </li>
            </NavLink>

            {
              role === "admin" && <>
                <NavLink to={"/dashboard/approve-riders"}>
              <li>
                {""}
                <button>
                  <RiEBike2Fill /> Approve Riders
                </button>
              </li>
            </NavLink>

            <NavLink to={"/dashboard/users-management"}>
              <li>
                {""}
                <button>
                  <FaUsers /> Users Management
                </button>
              </li>
            </NavLink>
              </>
            }

            {/* List item */}
            <li>
              <button data-tip="Settings">
                {/* Settings icon */}
                <IoSettingsOutline />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
