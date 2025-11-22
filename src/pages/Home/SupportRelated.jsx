import React from "react";
import liveParcelImg from "../../assets/live-tracking.png";
import safeDeliveryImg from "../../assets/safe-delivery.png";

const supportInfo = [
  {
    image: liveParcelImg,
    title: "Live Parcel Tracking",
    subtitle:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    image: safeDeliveryImg,
    title: "100% Safe Delivery",
    subtitle:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    image: safeDeliveryImg,
    title: "24/7 Call Center Support",
    subtitle:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const SupportRelated = () => {
  return (
    <div className="space-y-5">
      {supportInfo.map((data,idx) => (
        <div key={idx} className="flex lg:flex-row flex-col items-center bg-white rounded-3xl p-8">
          <img src={data.image} alt="" />
            <div className="lg:h-28 h-10 w-0.5 border border-gray-400 mx-8 border-dashed"></div>
          <div>
            <h2 className="text-xl font-bold text-secondary mb-3">{data.title}</h2>
            <p className="text-sm font-semibold text-gray-500">{data.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportRelated;
