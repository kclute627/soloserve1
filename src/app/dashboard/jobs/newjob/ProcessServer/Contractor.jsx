import { useState } from "react";
import BasicInput from "../../../jobs/BasicInput";
import ExistingClientAutoComplete from "../ClientInfo/ExistingClientAutoComplete";

import { PlusSmallIcon } from "@heroicons/react/20/solid";

function Contractor({handleOpenNewContractorModal, open, matchingArray, contractInformation, handleContractor}) {



    

  return (
    <div className="w-full">
      <div className="w-full mt-5 md:flex  items-center space-x-8">
        <div className="w-full md:w-1/3 mt-5 relative">
          <BasicInput
            label="Client Contact Info"
            value={contractInformation.clientDisplayName}
            placeholder="Start Typing To Find Existing Client"
            type="text"
            onChange={handleContractor}
          />

          {!open &&
            
            matchingArray && (
              <ExistingClientAutoComplete
                data={matchingArray}
                // handleSelectedClient={handleSelectedClient}
              />
            )}
          {!open &&
            matchingArray.length == 2 && (
              <ExistingClientAutoComplete
                data={[
                  {
                    id: 4,
                    contacts: [
                      {
                        firstName: "Please Add New",
                        lastname: "Client",
                      },
                    ],
                    addresses: [],
                    name: "No Results Found",
                    firstName: "No Results",
                    lastname: "Found",
                  },
                ]}
              />
            )}
        </div>
        <div className="md:mt-12">
          <button
            type="button"
            onClick={handleOpenNewContractorModal}
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
          >
            <PlusSmallIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Add Contractor
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contractor;
