"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RotateLoader } from "react-spinners";
import InputForm from "../../../../../signup/Input";
import GoogleAuto2 from "../GoogleAuto2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleClientInput, handleClientInput2, handleClientInput3 } from "../../../../../Redux/actions";

export default function NewClientModal({
  open,
  setOpen,
  handleAddNewClient,
  title, 
  button, 
  client = true
  
}) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { newJobInformation: {clientInformation} } = useSelector((state) => state.newJob);
  const newClientInfo = useSelector(state => state.newClient)
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const newClient = await handleAddNewClient();
      
    } catch (error) {
      console.log(error)
    }
    
    setOpen(false);
    setLoading(false);
  };


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative  transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 w-[50rem] ">
                <div>
                  <form className="space-y-2" action="#" method="POST">
                    <div className="text-xl text-gray-600 font-bold mb-1">
                      {title}
                    </div>
                    <div className="">
                      <InputForm
                        value={newClientInfo.clientDisplayName}
                        placeHolder={"Company"}
                        onChange={(e)=>dispatch(handleClientInput(e.target.name, e.target.value))}
                        label="Company Name"
                        id="clientDisplayName"
                        type="text"
                        autoComplete=""
                        required={false}
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <InputForm
                          value={newClientInfo.contact.firstName}
                          name="firstName"
                          onChange={(e)=>dispatch(handleClientInput2(e.target.name, e.target.value))}
                          label="First Name"
                          id="firstName"
                          type="text"
                          autoComplete="given-name"
                          required={true}
                          placeHolder={"First Name"}
                        />
                      </div>
                      <div className="w-1/2">
                        <InputForm
                          value={newClientInfo.contact.lastName}
                          onChange={(e)=>dispatch(handleClientInput2(e.target.name, e.target.value))}
                          label="Last Name"
                          id="lastName"
                          type="text"
                          autoComplete="family-name"
                          required={true}
                          placeHolder={"Last Name"}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <InputForm
                          value={newClientInfo.contact.email}
                          name="email"
                          onChange={(e)=>dispatch(handleClientInput2(e.target.name, e.target.value))}
                          label="Email Address"
                          id="email"
                          type="email"
                          autoComplete="email"
                          required={true}
                          placeHolder={"Email Address"}
                        />
                      </div>
                      <div className="w-1/2">
                        <InputForm
                          value={newClientInfo.phoneNumber}
                          name="phoneNumber"
                          onChange={(e)=>dispatch(handleClientInput2(e.target.name, e.target.value))}
                          label="Phone Number"
                          id="phoneNumber"
                          type="tel"
                          autoComplete="tel"
                          placeHolder={"Phone"}
                          required={false}
                        />
                      </div>
                    </div>

                    <div className="text-xl text-gray-600 font-bold mt-6">
                      Company Information
                    </div>
                    <div className="flex space-x-4">
                      <GoogleAuto2 address={newClientInfo}  />
                      <div className="w-1/3">
                        <InputForm
                          value={newClientInfo.client_address.suite}
                          name="suite"
                          onChange={(e)=>dispatch(handleClientInput3(e.target.name, e.target.value))}
                          label="Suite"
                          placeHolder={"Suite"}
                          id="suite"
                          type="text"
                          autoComplete=""
                          required={false}
                        />
                      </div>
                    </div>

                    <div className="w-full"></div>

                    <div className="flex space-x-7 mt-4">
                      <div className="w-1/3">
                        <InputForm
                         
                          value={newClientInfo.client_address.city}
                          name="city"
                          onChange={(e)=>dispatch(handleClientInput3(e.target.name, e.target.value))}
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
                         
                          value={newClientInfo.client_address.state}
                          name="state"
                          onChange={(e)=>dispatch(handleClientInput3(e.target.name, e.target.value))}
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
                         
                          value={newClientInfo.client_address.zip}
                          name="zip"
                          onChange={(e)=>dispatch(handleClientInput3(e.target.name, e.target.value))}
                          label="Zip"
                          placeHolder={"Zip"}
                          id="zip"
                          type="text"
                          autoComplete="address-level1"
                          required={false}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-7 mt-4">
                      <div className="w-1/3">
                        <InputForm
                          value={newClientInfo.website}
                        
                          name="website"
                          onChange={(e)=>dispatch(handleClientInput(e.target.name, e.target.value))}
                          label="Website"
                          placeHolder={"Website"}
                          id="website"
                          type="website"
                          autoComplete="website"
                          required={false}
                        />
                      </div>
                     
                    </div>

                    <div className="">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="cursor-pointer flex mt-6 w-full justify-center rounded-md bg-primaryGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {loading ? (
                          <RotateLoader color="#fff" height={2} />
                        ) : (
                          button
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
