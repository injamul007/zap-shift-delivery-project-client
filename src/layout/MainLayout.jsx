import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-[#EAECED]">
      <div className="w-11/12 mx-auto">
        <header>
          <Navbar></Navbar>
        </header>
        <main className="min-h-[calc(100vh-335px)]">
          <Outlet></Outlet>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
