import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Navbar Title</div>
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
            <Link to={"/"}>
              <li>
                <button data-tip="Homepage">
                  {/* Home icon */}
                  <IoHomeOutline />
                  <span>Homepage</span>
                </button>
              </li>
            </Link>

            <Link to={"/dashboard/my-parcels"}>
              <li>
                {""}
                <button>
                  <AiOutlineProduct /> My Parcels
                </button>
              </li>
            </Link>

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
