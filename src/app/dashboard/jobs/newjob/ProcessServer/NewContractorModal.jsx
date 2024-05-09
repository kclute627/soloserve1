"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RotateLoader } from "react-spinners";
import InputForm from "../../../../signup/Input";
import {
  createNewClientinDb,
  auth,
  getUserFromDb,
} from "../../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import GoogleAutoContractor from "./GoogleAutoContractor";


export default function NewContractorModal({
  open,
  setOpen,
  handleAddNewClient,
  clientInformation,
  setClientInformation,
}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userInfo = await getUserFromDb(authUser);

          setUser(userInfo);
        } catch (error) {
          console.log(error, "error line98");
        }
      }
    });
  }, []);

  const handleInputdata = (e) => {

      setClientInformation((info) => ({
        ...info,
        [e.target.name]: e.target.value,
      }));

    
    
    
  };

  const handleInputdata2 = (e) => {
    
    setClientInformation((info) => ({
      ...info,
      contact: 
      { ...info.contact, 
        [e.target.name]: e.target.value 
      },
    }));
  };
  const handleInputdata3 = (e) => {
    setClientInformation((info) => ({
      ...info,
      client_address: { ...info.contractor_address, [e.target.name]: e.target.value },
    }));
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
                      Contractor Information
                    </div>
                    <div className="">
                      <InputForm
                        value={clientInformation.clientDisplayName}
                        
                        placeHolder={"Company"}
                        onChange={handleInputdata}
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
                          value={clientInformation.contact.firstName}
                          name="firstName"
                          onChange={handleInputdata2}
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
                          value={clientInformation.contact.lastName}
                          onChange={handleInputdata2}
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
                          value={clientInformation.contact.email}
                          name="email"
                          onChange={handleInputdata2}
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
                          value={clientInformation.phoneNumber}
                          name="phoneNumber"
                          onChange={handleInputdata2}
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
                      <GoogleAutoContractor address={clientInformation} setAddress={setClientInformation}  />
                      <div className="w-1/3">
                        <InputForm
                          value={clientInformation.contractor_address.suite}
                          name="suite"
                          onChange={handleInputdata3}
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
                         
                          value={clientInformation.contractor_address.city}
                          name="city"
                          onChange={handleInputdata3}
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
                         
                          value={clientInformation.contractor_address.state}
                          name="state"
                          onChange={handleInputdata3}
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
                         
                          value={clientInformation.contractor_address.zip}
                          name="zip"
                          onChange={handleInputdata3}
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
                          value={clientInformation.website}
                        
                          name="website"
                          onChange={handleInputdata}
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
                        // onClick={handleSubmit}
                        className="cursor-pointer flex mt-6 w-full justify-center rounded-md bg-primaryGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {loading ? (
                          <RotateLoader color="#fff" height={2} />
                        ) : (
                          "Add Client"
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
