"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RotateLoader } from "react-spinners";
import InputForm from "../../../../signup/Input";
import GoogleAuto3 from "./GoogleAuto3";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleContractorInput, handleContractorInput2, handleContractorInput3, fetchContractorInfo } from "../../../../Redux/actions";

export default function NewContractorModal({
  open,
  setOpen,
  handleAddNewClient,
  title, 
  buttonText, 
  client = true
  
}) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { newJobInformation: {contractInformation} } = useSelector((state) => state.newJob);
  const newContractor = useSelector(state => state.newContractor)
  const { user } = useSelector((state) => state.user);

  const handleAddNewContractor2 = async (event) => {
    const newContractor2 = {
      user: user,
      clientDisplayName: newContractor.clientDisplayName,
      client_address: newContractor.client_address,
      phoneNumber: newContractor.contact.phoneNumber,
      email: newContractor.contact.email,
      firstName: newContractor.contact.firstName,
      lastName: newContractor.contact.lastName,
      website: newContractor.website,
    };
    dispatch(fetchContractorInfo(newContractor2));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      

      const newContractor = await handleAddNewContractor2()
      
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
                        value={newContractor.clientDisplayName}
                        placeHolder={"Company"}
                        onChange={(e)=>dispatch(handleContractorInput(e.target.name, e.target.value))}
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
                          value={newContractor.contact.firstName}
                          name="firstName"
                          onChange={(e)=>dispatch(handleContractorInput2(e.target.name, e.target.value))}
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
                          value={newContractor.contact.lastName}
                          onChange={(e)=>dispatch(handleContractorInput2(e.target.name, e.target.value))}
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
                          value={newContractor.contact.email}
                          name="email"
                          onChange={(e)=>dispatch( handleContractorInput2(e.target.name, e.target.value))}
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
                          value={newContractor.phoneNumber}
                          name="phoneNumber"
                          onChange={(e)=>dispatch(handleContractorInput2(e.target.name, e.target.value))}
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
                      <GoogleAuto3 address={newContractor}  />
                      <div className="w-1/3">
                        <InputForm
                          value={newContractor.client_address.suite}
                          name="suite"
                          onChange={(e)=>dispatch(handleContractorInput3(e.target.name, e.target.value))}
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
                         
                          value={newContractor.client_address.city}
                          name="city"
                          onChange={(e)=>dispatch(handleContractorInput3(e.target.name, e.target.value))}
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
                         
                          value={newContractor.client_address.state}
                          name="state"
                          onChange={(e)=>dispatch(handleContractorInput3(e.target.name, e.target.value))}
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
                         
                          value={newContractor.client_address.zip}
                          name="zip"
                          onChange={(e)=>dispatch(handleContractorInput3(e.target.name, e.target.value))}
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
                          value={newContractor.website}
                        
                          name="website"
                          onChange={(e)=>dispatch(handleContractorInput(e.target.name, e.target.value))}
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
                          buttonText
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
