import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-[#EAECED]">
      <div className="lg:pt-8 pl-8 inline-block">
        <Logo></Logo>
      </div>
      <main>
        <div>
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
