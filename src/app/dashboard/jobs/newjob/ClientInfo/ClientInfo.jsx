"use client";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import BasicInput from "../../../jobs/BasicInput";
import ClientInfoDropDown from "./ClientInfoDropDown";
import NewClientModal from "./NewClientModal/NewClientModal";
import ExistingClientAutoComplete from "./ExistingClientAutoComplete";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleClients, removeSelectedClientInfo, resetNewClientInformation, setClientRef, setSelectedClient, setSelectedClientInfo } from "../../../../Redux/actions";

function ClientInfo({
  handleAddNewClient,
  handleClientSuggestions,
  handleSelectedClient,
  

}) {
  const [openNewClientModal, setOpenNewClientModal] = useState(false);
  const [matchingArray, setMatchingArray] = useState([]);

  const dispatch = useDispatch();
  const { newJobInformation } = useSelector((state) => state.newJob);
  const newClientInfo = useSelector((state) => state.newClient);

  const handleClientRef = (e) => {
    const ref = e.target.value;
    dispatch(setClientRef(ref));
  };
  const handleClientInput = async (e) => {
    const inputValue = e.target.value;

    // here is where I need to search the Data base for existing clients
    try {
      const matchingArrayData = await handleClientSuggestions(inputValue);
      setMatchingArray(matchingArrayData);
    } catch (error) {}

    
    dispatch(handleClients(inputValue));
  };

  const handleopenNewClientModal = () => {
    setOpenNewClientModal(true);
    setMatchingArray([]);
  };

  const handleRemoveClient = (e) => {
    e.preventDefault();
    dispatch(removeSelectedClientInfo());
    dispatch(resetNewClientInformation())
    dispatch(setSelectedClient(false))
    
    const syntheticEvent = { target: { value: "" } };
    handleClientInput(syntheticEvent);
    setMatchingArray([]);
  };
  return (
    <>
      <div>
        <div className="mt-4 ">
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
                value={newJobInformation.clientRef}
                placeholder="Client Ref"
                type="text"
                onChange={handleClientRef}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 ">
            {newJobInformation.selectedClientInfo ? (
              <div className="w-2/3 mt-8 bg-slate-300 p-4 rounded-lg flex">
                <div className="left">
                  <div className="flex text-2xl">
                    <div className="w-[10rem]">Company:</div>
                    <div className="font-bold"> {newJobInformation.selectedClientInfo.name}</div>
                  </div>
                  <div className="flex text-xl mt-4 items-center">
                    <div className="w-[10rem]">Contact:</div>
                    <div className="font-bold flex">
                      <ClientInfoDropDown
                        contacts={newJobInformation.selectedClientInfo.contacts}
                      />
                      <button></button>
                    </div>
                  </div>
                  <div className="flex text-xl ml-0 mt-4">
                    <div className=" flex items-start space-x-6  ">
                      <button
                        onClick={handleRemoveClient}
                        className="underline text-gray-700"
                      >
                        Remove Client
                      </button>
                      <button className="underline text-gray-700">
                        Add Contact
                      </button>
                    </div>
                  </div>
                </div>
                <div className="right  w-1/3 ml-20">
                  <div className="">
                    <div className="m-auto">Past Due Invoices</div>
                    <div className="">3 - Past Due </div>
                  </div>
                  <div className="mt-10">
                    <div className="m-auto">Total Jobs</div>
                    <div className="flex space-x-9">
                      <div className="">3 - Open </div>
                      <div className=""> 75 - Closed </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full mt-5 md:flex  items-center space-x-8">
                <div className="w-full md:w-1/3 mt-5 relative">
                  <BasicInput
                    label="Client Contact Info"
                    value={
                      newJobInformation.clientInformation.clientDisplayName
                    }
                    placeholder="Start Typing To Find Existing Client"
                    type="text"
                    onChange={(e) => handleClientInput(e)}
                  />

                  {!openNewClientModal &&
                    newJobInformation.clientInformation.clientDisplayName
                      .length > 2 &&
                    matchingArray && (
                      <ExistingClientAutoComplete
                        data={matchingArray}
                        handleSelectedClient={handleSelectedClient}
                      />
                    )}
                  {!openNewClientModal &&
                  newJobInformation.clientInformation && // Check if newJobInformation.clientInformation is defined
                  newJobInformation.clientInformation.clientDisplayName && // Check if clientDisplayName is defined
                  newJobInformation.clientInformation.clientDisplayName.length >
                    2 && // Access clientDisplayName length
                  matchingArray &&
                  matchingArray.length === 0 && ( // Add a null check for matchingArray
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
                    onClick={handleopenNewClientModal}
                    className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                  >
                    <PlusSmallIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Add Client
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {openNewClientModal && (
        <NewClientModal
          open={openNewClientModal}
          setOpen={setOpenNewClientModal}
          handleAddNewClient={handleAddNewClient}
          
        />
      )}
    </>
  );
}

export default ClientInfo;
