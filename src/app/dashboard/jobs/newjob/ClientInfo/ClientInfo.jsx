"use client";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import BasicInput from "../../../jobs/BasicInput";
import { useState } from "react";
function ClientInfo({ clientInformation, setClientInformation }) {

  const [openNewClientModal, setOpenNewClientModal] = useState(false) 


  const handleClientRef = (e) => {
    const ref = e.target.value;

    const updatedClientinfo = {
      ...clientInformation,
      clientRef: ref,
    };
    setClientInformation(updatedClientinfo);
  };
  const handleClient = (e) => {
    const ref = e.target.value;

    const updatedClientinfo = {
      ...clientInformation,
      clientDisplayName: ref,
    };

    // here is where I need to search the Data base for existing clients

    setClientInformation(updatedClientinfo);
  };

  const handleopenNewClientModal = () => {


    set
  }
  return (
    <div>
      <div className="mt-10 ">
        <div className="flex w-full">
          <div className="w-full md:w-2/3 ">
            <label
              htmlFor="cover-photo"
              className="block text-lg md:text-2xl font-bold leading-6 text-gray-900"
            >
              Client Information
            </label>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="w-full md:w-1/3 mt-5">
            <BasicInput
              label="Client Refrence"
              value={clientInformation.clientRef}
              placeholder="Client Ref"
              type="text"
              onChange={handleClientRef}
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 ">
          <div className="w-full mt-5 md:flex  items-center space-x-8">
            <div className="w-full md:w-1/3 mt-5">
              <BasicInput
                label="Client Contact Info"
                value={clientInformation.clientDisplayName}
                placeholder="Start Typing To Find Existing Client"
                type="text"
                onChange={handleClient}
              />
            </div>
            <div className="md:mt-12">
              <button
                type="button"
                onClick={handleopenNewClientModal}
                className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
              >
                <PlusSmallIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Add Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
