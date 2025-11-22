import React from 'react';
import serviceImg from "../../assets/service.png"


 const ourServiceData = [
    {
      title: "Express  & Standard Delivery",
      subtitle: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
    },
    {
      title: "Nationwide Delivery",
      subtitle: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
    },
    {
      title: "Fulfillment Solution",
      subtitle: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
    },
    {
      title: "Cash on Home Delivery",
      subtitle: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
    },
    {
      title: "Corporate Service / Contract In Logistics",
      subtitle: "Customized corporate services which includes warehouse and inventory management support."
    },
    {
      title: "Parcel Return",
      subtitle: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
    },
  ]

const OurService = () => {

  return (
    <div className='text-center bg-secondary py-12 px-16 mb-8 rounded-3xl'>
      {/* divide */}
      <div className='flex justify-center items-center mb-6'>
        <div className='h-1 w-4 bg-gray-300 rounded-2xl'></div>
      </div>
      <h2 className='text-3xl font-bold text-white'>Our Services</h2>
      <p className='max-w-3xl mx-auto py-3 text-white'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
      {/* divide */}
      <div className='flex justify-center items-center my-6'>
        <div className='h-1 w-4 bg-gray-300 rounded-2xl'></div>
      </div>

      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
        {
          ourServiceData.map((data,idx) => <div key={idx} className={`p-6 text-center rounded-2xl ${idx===1? "bg-primary" : "bg-white"} space-y-3`}>
            <img className='mx-auto p-3 rounded-full bg-[#EAECED]' src={serviceImg} alt="" />
            <h2 className='text-xl font-bold text-secondary'>{data.title}</h2>
            <p className='text-gray-500 font-semibold'>{data.subtitle}</p>
          </div>)
        }
      </div>
    </div>
  );
};

export default OurService;