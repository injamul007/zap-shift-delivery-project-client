import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const allRegionsData = useLoaderData();
  const regionsDuplicate = allRegionsData.map((region) => region.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtByRegion = (region) => {
    const regionDistrict = allRegionsData.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;
    const parcelWeight = parseFloat(data.parcelWeight);

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} Taka !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        //? save the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcels", res.data);
          if (res.data.result.insertedId) {
            Swal.fire({
              title: "Submitted!",
              text: "Your Parcel has been submitted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center mt-6">Send a Parcel</h1>
      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 p-4">
        {/* document */}
        <div className="space-x-5 mb-3">
          <label className="label">
            Document
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className="radio"
              defaultChecked
            />
          </label>
          <label className="label">
            Non-Document
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
              className="radio"
            />
          </label>
        </div>

        {/* parcel info */}
        <div>
          <fieldset className="fieldset grid grid-cols-2 gap-6">
            <div className="">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                className="input"
                {...register("parcelName")}
                placeholder="Parcel Name"
              />
            </div>
            <div className="">
              <label className="label">Parcel Weight</label>
              <input
                type="text"
                {...register("parcelWeight")}
                className="input"
                placeholder="Parcel Weight (KG)"
              />
            </div>
          </fieldset>
        </div>

        {/* two column */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* sender info */}
          <div>
            <p>Sender Information</p>
            <fieldset className="fieldset">
              {/* sender name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                className="input"
                defaultValue={user?.displayName}
                // readOnly
                {...register("senderName")}
                placeholder="Sender Name"
                />
              {/* sender email */}
              <label className="label">Sender Email</label>
              <input
                type="email"
                className="input"
                defaultValue={user?.email}
                // readOnly
                {...register("senderEmail")}
                placeholder="Sender Email"
              />
              {/* sender region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Regions</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((region, idx) => (
                    <option key={idx} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* sender district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Districts</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a district"
                  className="select"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtByRegion(senderRegion).map((region, idx) => (
                    <option key={idx} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* sender address */}
              <label className="label">Address</label>
              <input
                type="text"
                className="input"
                {...register("senderAddress")}
                placeholder="Address"
              />
              {/* sender phone */}
              <label className="label">Sender Phone No</label>
              <input
                type="number"
                className="input"
                {...register("senderPhoneNo")}
                placeholder="Sender Phone No"
              />
              {/* sender pickup instruction */}
              <label className="label">Pickup Instruction</label>
              <textarea
                className="textarea"
                {...register("senderPickupInstruction")}
                placeholder="Pickup Instruction"
              ></textarea>
            </fieldset>
          </div>

          {/* receiver info */}
          <div>
            <p>Receiver Information</p>
            <fieldset className="fieldset">
              <label className="label">Receiver Name</label>
              <input
                type="text"
                className="input"
                {...register("receiverName")}
                placeholder="Receiver Name"
              />
              <label className="label">Receiver Email</label>
              <input
                type="email"
                className="input"
                {...register("receiverEmail")}
                placeholder="Receiver Email"
              />

              {/* Receiver region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Regions</legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((region, idx) => (
                    <option key={idx} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Receiver district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Districts</legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a district"
                  className="select"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtByRegion(receiverRegion).map((region, idx) => (
                    <option key={idx} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              <label className="label">Address</label>
              <input
                type="text"
                className="input"
                {...register("receiverAddress")}
                placeholder="Address"
              />
              <label className="label">Receiver Phone No</label>
              <input
                type="number"
                className="input"
                {...register("receiverPhoneNo")}
                placeholder="Receiver Phone No"
              />

              <label className="label">Delivery Instruction</label>
              <textarea
                className="textarea"
                {...register("receiverDeliveryInstruction")}
                placeholder="Delivery Instruction"
              ></textarea>
            </fieldset>
          </div>
        </div>

        <button className="btn btn-primary text-black w-full mt-6">
          Send Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
