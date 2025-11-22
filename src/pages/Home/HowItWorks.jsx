import React from "react";
import howItWorksLogo from "../../assets/bookingIcon.png";

const sectionData = [
  {
    title: "Booking Pick & Drop",
  },
  {
    title: "Cash on Delivery",
  },
  {
    title: "Delivery Hub",
  },
  {
    title: "Booking SME & Corporate",
  },
];

const HowItWorks = () => {
  return (
    <div className="w-[85%] mx-auto my-22">
      <h2 className="text-2xl font-bold text-secondary mb-4">How it Works</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {sectionData.map((data, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white">
            <img src={howItWorksLogo} alt="" />
            <h2 className="font-bold py-3 text-secondary">{data.title}</h2>
            <p className="text-gray-500 text-sm font-semibold">
              From Personal packages to business shipments - we deliver on time,
              every time
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
