"use client";

import React from "react";
import BasicInput from "../../BasicInput";
import ServiceAddress from "./ServiceAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipient,
  addServiceAddress,
  updateServiceAddress,
  deleteServiceAddress,
} from "../../../../Redux/actions";

function ServiceInfo() {
  const dispatch = useDispatch();
  const { newJobInformation } = useSelector((state) => state.newJob);

  const handleRecipient = (e) => {
    e.preventDefault();
    dispatch(setRecipient(e.target.value));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    dispatch(addServiceAddress());
  };

  const handleAddressChange = (index, address) => {
    console.log(address);
    dispatch(updateServiceAddress(index, address));
  };

  const handleDeleteAddress = (index) => {
    dispatch(deleteServiceAddress(index));
  };

  return (
    <div>
      <div className="flex w-full pb-4">
        <div className="w-full md:w-2/3">
          <label
            htmlFor="cover-photo"
            className="block text-lg md:text-2xl font-bold leading-6 text-gray-900"
          >
            Person / Company Served
          </label>
        </div>
      </div>

      <div className="w-full md:w-2/3">
        <div className="w-full  mt-5">
          <BasicInput
            label="Recipient"
            value={newJobInformation.recipient}
            placeholder="Who is Being Served?"
            type="text"
            onChange={handleRecipient}
          />
        </div>
        <div className="mt-8">
          <div className="flex w-full">
            <div className="w-full md:w-2/3">
              <label
                htmlFor="cover-photo"
                className="block text-lg md:text-2xl font-bold leading-6 text-gray-900"
              >
                Service Address
              </label>
            </div>
          </div>
          {newJobInformation.serviceAddress.map((address, index) => (
            <>
              <ServiceAddress
                key={index}
                index={index}
                address={address}
                onAddressChange={handleAddressChange}
                onDelete={() => handleDeleteAddress(index)}
              />
            </>
          ))}
        </div>
        <div className="flex w-full pt-4 ">
          <button
            className="px-4 py-2 bg-indigo-800 rounded-full drop-shadow-2xl cursor-pointer text-white"
            type="button "
            onClick={handleAddAddress}
          >
            Add an Additional Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceInfo;
