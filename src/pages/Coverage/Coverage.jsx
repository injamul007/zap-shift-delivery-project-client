import React, { useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.7514, 90.3858];
  const serviceCenterData = useLoaderData();
  const mapRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenterData.find(d => d.district.toLowerCase().includes(location.toLowerCase()));
    if(district) {
      const coordinate = [district.latitude, district.longitude]
      mapRef.current.flyTo(coordinate,12)
    }
  }

  return (
    <div className="mb-22">
      <h2 className="text-3xl font-bold my-8">
        We are available in {serviceCenterData.length} districts
      </h2>
      {/* search */}
      <form onSubmit={handleSearch} className="mb-8">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" name="location" placeholder="Search Location" />
          <button type="submit" className="btn btn-sm h-full -mr-3">Search</button>
        </label>
      </form>
      {/* */}
      <div className="h-[800px] border">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <div>
            {serviceCenterData.map((center, idx) => (
              <Marker key={idx} position={[center.latitude, center.longitude]}>
                <Popup>
                  <strong>{center.district}</strong> <br />{" "}
                  {center.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </div>
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
