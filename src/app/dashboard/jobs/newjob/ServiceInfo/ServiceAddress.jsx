import React, { useState, useEffect } from "react";
import ServiceInfoGoogle from "./ServiceInfoGoogle";
import InputForm from "../../../../signup/Input";

const ServiceAddress = ({ index, address, onAddressChange, onDelete }) => {
  const [localAddress, setLocalAddress] = useState(address);

  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedAddress = { ...localAddress, [name]: value };
    setLocalAddress(updatedAddress);
    onAddressChange(index, updatedAddress);
  };

  const handleChange = (updatedAddress) => {
    setLocalAddress(updatedAddress);
    onAddressChange(index, updatedAddress);
  };

  const handleGoogleAddressChange = (updatedAddress) => {
    setLocalAddress(updatedAddress);
    onAddressChange(index, updatedAddress);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mb-6 pb-6 md:w-2/3">
      <div className="flex space-x-4 mt-4">
        <ServiceInfoGoogle
          address={localAddress}
          onAddressChange={handleGoogleAddressChange}
        />

        <div className="w-1/3">
          <InputForm
            value={localAddress.suite}
            name="suite"
            onChange={handleInputChange}
            label="Suite"
            placeHolder={"Suite"}
            id="suite"
            type="text"
            autoComplete=""
            required={false}
          />
        </div>
      </div>
      <div className="flex space-x-7 mt-4">
        <div className="w-1/3">
          <InputForm
            value={localAddress.city}
            name="city"
            onChange={handleInputChange}
            label="City"
            placeHolder={"City"}
            id="city"
            type="text"
            autoComplete="address-level2"
            required={false}
          />
        </div>
        <div className="w-1/3">
          <InputForm
            value={localAddress.state}
            name="state"
            onChange={handleInputChange}
            label="State"
            placeHolder={"State"}
            id="state"
            type="text"
            autoComplete="address-level1"
            required={false}
          />
        </div>
        <div className="w-1/3">
          <InputForm
            value={localAddress.zip}
            name="zip"
            onChange={handleInputChange}
            label="Zip"
            placeHolder={"Zip"}
            id="zip"
            type="text"
            autoComplete="address-level1"
            required={false}
          />
        </div>
      </div>
      {index !== 0 && (
        <button
          type="button"
          className="mt-4 text-red-500 hover:text-red-700"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ServiceAddress;

