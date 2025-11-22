import React from "react";

const AboutUs = () => {
  return (
    <div className="my-14 p-12 bg-white rounded-3xl">
      <h2 className="text-3xl font-bold text-secondary">About Us</h2>
      <p className="text-sm font-semibold max-w-xl mt-4 text-gray-500">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
      <div className="w-full h-0.5 border-b-2 border-gray-200 py-6 mb-10"></div>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-lift">
        <input
          type="radio"
          name="my_tabs_3"
          className="tab text-xl font-semibold"
          aria-label="Story"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6 text-gray-500">
          We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
          <br />
          <br />
          We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
          <br />
          <br />
          We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab text-xl font-semibold"
          aria-label="Mission"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab text-xl font-semibold"
          aria-label="Success"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 3
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab text-xl font-semibold"
          aria-label="Team & Others"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Tab content 4
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
