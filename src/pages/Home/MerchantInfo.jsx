import React from "react";
import locationMerchantImg from "../../assets/location-merchant.png"
import merchantBgImg from "../../assets/be-a-merchant-bg.png"

const MerchantInfo = () => {
  return (
    <div className="bg-secondary my-22 flex lg:flex-row flex-col p-18 rounded-3xl bg-cover bg-center"
    style={{ backgroundImage: `url(${merchantBgImg})`, backgroundSize: '1230px', backgroundRepeat: "no-repeat", backgroundPositionY: "-2px" }}>
      <div className="max-w-xl mb-8">
        <h2 className="text-white lg:text-[34px] lg:text-left text-center text-2xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h2>
        <p className="font-semibold text-gray-300 lg:text-left text-center my-8">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex items-center gap-3 lg:flex-row flex-col">
          <button className="btn btn-primary text-secondary rounded-3xl">
            Become a Merchant
          </button>
          <button className="btn bg-transparent border-primary text-primary rounded-3xl">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>
      <div>
        <img src={locationMerchantImg} alt="" />
      </div>
    </div>
  );
};

export default MerchantInfo;
