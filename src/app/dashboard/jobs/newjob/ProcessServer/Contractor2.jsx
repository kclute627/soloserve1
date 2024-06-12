"use client";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import BasicInput from "../../../jobs/BasicInput";
import ClientInfoDropDown from "../ClientInfo/ClientInfoDropDown";
import ContractorInfoDropDown from "./ContractorInfoDropDown";
import NewClientModal from "../ClientInfo/NewClientModal/NewClientModal";
import NewContractorModal from "./NewContractorModal";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  handleContractorInput,
  handleContractors,
  handleContractorInput2,
  handleContractorInput3,
  removeSelectedContractorInfo,
  resetNewContractorInformation,
  setSelectedContractor,
  setSelectedContractorInfo,
  
} from "../../../../Redux/actions";
import ExistingContractorAutoComplete from "./ExistingContractorAutoComplete"

function Contractor2({handleClientSuggestions, handleAddNewClient}) {
  const [openNewClientModal, setOpenNewClientModal] = useState(false);
  const [matchingArray, setMatchingArray] = useState([]);

  const dispatch = useDispatch();
  const { newJobInformation } = useSelector((state) => state.newJob);
 



  const handleSelectedClient = async (client) => {
    try {
      dispatch(setSelectedContractorInfo(client));
      dispatch(setSelectedContractor(true));
    } catch (error) {}
  };

  const handleContractorInput = async (e) => {
    const inputValue = e.target.value;
 
    // here is where I need to search the Data base for existing clients
    try {
      const matchingArrayData = await handleClientSuggestions(inputValue);
     
      setMatchingArray(matchingArrayData);
    } catch (error) {}

    dispatch(handleContractors(inputValue));
  };

  const handleOpenNewContractorModal = () => {};

  const handleopenNewClientModal = () => {
    setOpenNewClientModal(true);
    setMatchingArray([]);
  };

  const handleRemoveContractor = (e) => {
    e.preventDefault();
    dispatch(removeSelectedContractorInfo())
    dispatch(resetNewContractorInformation())
    dispatch(setSelectedContractor(false))


    const syntheticEvent = { target: { value: "" } };
    handleContractorInput(syntheticEvent);
    setMatchingArray([]);
  };

 

  return (
    <>
      <div>
        <div className="mt-4 ">
          <div className="w-full md:w-2/3 ">
            {newJobInformation.selectedContractorInfo && newJobInformation.selectedContractor ? (
              <div className="w-2/3 mt-8 bg-slate-300 p-4 rounded-lg flex">
                <div className="left">
                  <div className="flex text-2xl">
                    <div className="w-[10rem]">Company:</div>
                    <div className="font-bold">
                      {" "}
                      {newJobInformation.selectedContractorInfo.name}
                    </div>
                  </div>
                  <div className="flex text-xl mt-4 items-center">
                    <div className="w-[10rem]">Contact:</div>
                    {newJobInformation.selectedContractorInfo ? (

                  
                    <div className="font-bold flex">
                      <ContractorInfoDropDown
                        contacts={newJobInformation.selectedContractorInfo.contacts}
                      />
                      <button></button>
                    </div>
                      ) : (<></>)}
                  </div>
                  <div className="flex text-xl ml-0 mt-4">
                    <div className=" flex items-start space-x-6  ">
                      <button
                        onClick={handleRemoveContractor}
                        className="underline text-gray-700"
                      >
                        Remove Contractor
                      </button>
                      <button className="underline text-gray-700">
                        Add Contact
                      </button>
                    </div>
                  </div>
                </div>
                <div className="right  w-1/3 ml-20">
                  <div className="">
                    <div className="m-auto">Past Serves</div>
                    <div className="">38 - Completed Jobs </div>
                  </div>
                  <div className="mt-10">
                    <div className="m-auto">Rating</div>
                    <div className="flex space-x-9">
                      <div className="">⭐️⭐️⭐️⭐️⭐️</div>
                   
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="m-auto">Private Note</div>
                    <div className="flex space-x-9">
                      <div className="">Great Work send all Indiana Jobs</div>
                   
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full mt-5 md:flex  items-center space-x-8">
                <div className="w-full md:w-1/2 mt-5 relative">
                  <BasicInput
                    label="Contractor Information"
                    value={
                      newJobInformation.contractInformation.contractorDisplayName
                    }
                    placeholder="Start Typing To Find Existing Contractor"
                    type="text"
                    onChange={(e) => handleContractorInput(e)}
                  />

                  {!openNewClientModal &&
                    newJobInformation.contractInformation.contractorDisplayName
                      .length > 2 &&
                    matchingArray && (
                      <ExistingContractorAutoComplete
                        data={matchingArray}
                        handleSelectedClient={handleSelectedClient}
                      />
                    )}
                  {!openNewClientModal &&
                  newJobInformation.contractInformation && // Check if newJobInformation.clientInformation is defined
                  newJobInformation.contractInformation.contractorDisplayName && // Check if clientDisplayName is defined
                  newJobInformation.contractInformation.contractorDisplayName.length >
                    2 && // Access clientDisplayName length
                  matchingArray &&
                  matchingArray.length === 0 && ( // Add a null check for matchingArray
                      <ExistingContractorAutoComplete
                        data={[
                          {
                            id: 4,
                            contacts: [
                              {
                                firstName: "Please Add New",
                                lastname: "Contractor",
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
                    onClick={handleopenNewClientModal}
                    className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                  >
                    <PlusSmallIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Add New Contractor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {openNewClientModal && (
        <NewContractorModal
          open={openNewClientModal}
          setOpen={setOpenNewClientModal}
          handleAddNewClient={handleAddNewClient}
          title="Contractor Information"
          buttonText={"Add Contractor"}
          client = {false} 

        />
      )}
    </>
  );
}

export default Contractor2;
