import React from "react";
import websiteLogo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="inline-block">
      <div className="flex items-end">
        <img src={websiteLogo} alt="" className="inline-block" />
        <span className="font-bold text-2xl -ml-6">ZapShift</span>
      </div>
    </Link>
  );
};

export default Logo;
