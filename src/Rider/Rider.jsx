import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useLoaderData } from "react-router";
import riderImage from "../assets/agent-pending.png";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const allRegionsData = useLoaderData();
  const regionsDuplicate = allRegionsData.map((region) => region.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtByRegion = (region) => {
    const regionDistrict = allRegionsData.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  //? explore useMemo useCallback
  const Region = useWatch({ control, name: "yourRegion" });

  const handleRiderApplication = async (data) => {
    // console.log(data);
    try {
      const result = await axiosSecure.post("/riders", data);
      console.log(result.data.result);
      if (result.data.result.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach out to you in 2 days!",
          showConfirmButton: false,
          timer: 2000,
          // customClass: {
          //   popup: "small-swal-popup",
          // },
        });
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold my-6 text-secondary">Be a Rider</h2>
      <p className="max-w-xl text-gray-500">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div>
        <form
          onSubmit={handleSubmit(handleRiderApplication)}
          className="mt-12 p-4"
        >
          <p className="text-2xl font-semibold">Tell Us About Yourself</p>
          {/* two column */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* sender info */}
            <div className="p-4">
              <p>Rider Information</p>
              <fieldset className="fieldset">
                <div className="grid lg:grid-cols-2 gap-2">
                  <div>
                    {/* sender name */}
                    <label className="label">Your Name</label>
                    <input
                      type="text"
                      className="input w-full"
                      defaultValue={user?.displayName}
                      // readOnly
                      {...register("name")}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    {/* NID number */}
                    <label className="label">NID Number</label>
                    <input
                      type="number"
                      className="input w-full"
                      {...register("nidNumber")}
                      placeholder="NID Number"
                    />
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-2">
                  <div>
                    {/* Driving license number */}
                    <label className="label">Driving License Number</label>
                    <input
                      type="number"
                      className="input w-full"
                      {...register("licenseNumber")}
                      placeholder="Driving License Number"
                    />
                  </div>
                  <div>
                    {/* sender phone */}
                    <label className="label">Phone Number</label>
                    <input
                      type="number"
                      className="input w-full"
                      {...register("phoneNumber")}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                {/* sender email */}
                <label className="label">Your Email</label>
                <input
                  type="email"
                  className="input w-full"
                  defaultValue={user?.email}
                  // readOnly
                  {...register("email")}
                  placeholder="Your Email"
                />

                {/* sender address */}
                <label className="label">Bike Brand Model and Year</label>
                <input
                  type="text"
                  className="input w-full"
                  {...register("bikeBrandModel")}
                  placeholder="Bike Brand Model and Year"
                />

                <div className="grid lg:grid-cols-2 gap-2 items-center">
                  <div>
                    {/* sender region */}
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Your Regions</legend>
                      <select
                        {...register("yourRegion")}
                        defaultValue="Pick a Region"
                        className="select w-full"
                      >
                        <option disabled={true}>Pick a Region</option>
                        {regions.map((region, idx) => (
                          <option key={idx} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                  <div>
                    {/* sender phone */}
                    <label className="label">Bike Registration Number</label>
                    <input
                      type="number"
                      className="input w-full"
                      {...register("bikeRegistrationNumber")}
                      placeholder="Bike Registration Number"
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-2 items-center">
                  <div>
                    {/* sender district */}
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">
                        Your Districts
                      </legend>
                      <select
                        {...register("yourDistrict")}
                        defaultValue="Pick a district"
                        className="select w-full"
                      >
                        <option disabled={true}>Pick a district</option>
                        {districtByRegion(Region).map((region, idx) => (
                          <option key={idx} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </fieldset>
                  </div>
                  <div>
                    {/* sender address */}
                    <label className="label">Tell Us About Yourself</label>
                    <input
                      type="text"
                      className="input w-full"
                      {...register("tellUsAboutYourself")}
                      placeholder="Tell Us About Yourself"
                    />
                  </div>
                </div>
              </fieldset>
              <button className="btn btn-primary w-full text-black mt-6">
                Apply as a Rider
              </button>
            </div>

            {/* rider image bg */}
            <div className="flex justify-center items-center">
              <img src={riderImage} alt="Rider_Image" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rider;
