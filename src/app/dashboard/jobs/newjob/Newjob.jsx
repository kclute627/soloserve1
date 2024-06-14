"use client"

import {
  createNewClientinDb,
  getClientFromDB,
  getMatchingClientsFromDb,
  saveAJobinDB,
} from "../../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFile,
  fetchClientInfo,
  getUserSuccess,
  setSelectedClient,
  setSelectedClientInfo,
} from "../../../Redux/actions";
import ClientInfo from "../newjob/ClientInfo/ClientInfo";
import Calendar from "./Calendar/Calendar";
import JobPriority from "./Calendar/JobPriority";
import ProcessServer from "./ProcessServer/ProcessServer";
import ServiceDocumentInput from "./Service Documents/ServiceDocumentsInput";
import CourtInformation from "./Case/CaseInformation";
import ServiceInfo from "./ServiceInfo/ServiceInfo"
import JobNotes from "./Calendar/JobNotes"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

function Newjob({setNewJob}) {
  /// new client

 

  // employee / contractor
  

  const dispatch = useDispatch();
  const { newJobInformation } = useSelector((state) => state.newJob);
  const newClientInfo = useSelector((state) => state.newClient);
  const { user } = useSelector((state) => state.user);
  

  const [loading, setLoading] =  useState(false)

  const handleClientSuggestions = async (text) => {

    if (text.length > 2) {
      try {
        const matchingArray = await getMatchingClientsFromDb(text, user);
        // console.log(matchingArray)
        return matchingArray;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteFile = (e, id) => {
    e.preventDefault();
    const newFiles = newJobInformation.selectedFiles.filter(
      (cur) => cur.id !== id
    );
    dispatch(deleteFile(newFiles));
  };

  const handleFileDisplayNameChange = (e, id) => {
    // Locate the selectedFile
    const index = selectedFiles.findIndex((item) => item.id === id);

    // Check if the file is found
    if (index !== -1) {
      const newDisplayName = e.target.value;

      // Create a new array with updated display name

      const updatedFileArray = {
        file: selectedFiles[index].file,
        displayName: newDisplayName, // Keep the file object
        ...selectedFiles[index],
      }; // Update the metadata
      // Create a new array with the updated file at the correct index
      const updatedSelectedFiles = [...selectedFiles];
      updatedSelectedFiles[index] = updatedFileArray;
    } else {
      console.error("File not found");
    }
  };

  const handleAddNewClient2 = async (event) => {
    const newClient = {
      user: user,
      clientDisplayName: newClientInfo.clientDisplayName,
      client_address: newClientInfo.client_address,
      phoneNumber: newClientInfo.contact.phoneNumber,
      email: newClientInfo.contact.email,
      firstName: newClientInfo.contact.firstName,
      lastName: newClientInfo.contact.lastName,
      website: newClientInfo.website,
    };
    dispatch(fetchClientInfo(newClient));
  };

 


  const handleSaveJob = async () => {

    setLoading(true)

    try {

      const newJobId = await saveAJobinDB(newJobInformation, user )
      if(newJobId){
        setNewJob(false)
      }
      
    } catch (error) {
      console.log(error, "error 111")
      
    }

    setLoading(false)
  }

 

 

  const handleSelectedClient = async (client) => {
    try {
      dispatch(setSelectedClientInfo(client));
      dispatch(setSelectedClient(true));
    } catch (error) {}
  };

  return (
    <div className="relative">
      <form action="">
        <div className="p-5 bg-white shadow-lg rounded-lg h-max ">
          <ServiceDocumentInput
            handleFileDisplayNameChange={handleFileDisplayNameChange}
            handleDeleteFile={handleDeleteFile}
          />
        </div>
        <div className="p-5 pb-10 mt-10 bg-white shadow-lg rounded-lg ">
          <ClientInfo
            handleAddNewClient={handleAddNewClient2}
            handleClientSuggestions={handleClientSuggestions}
            handleSelectedClient={handleSelectedClient}
          />
        </div>
        <div className="p-5 pb-10 mt-10 bg-white shadow-lg rounded-lg ">
          <div className="flex w-full items-center justify-ar\
          ">
            <div className="left ">
              <div className="">
                <JobPriority />
              </div>
              <div className="">
                <Calendar />
              </div>
            </div>
           
          </div>
        </div>
        <div className="p-5 pb-10 mt-10 bg-white shadow-lg rounded-lg ">
        <div className="right w-full">
              <JobNotes />
          </div>
        </div>
        <div className="p-5 pb-10 mt-10 bg-white shadow-lg rounded-lg ">
          <ProcessServer
          
   
            handleClientSuggestions={handleClientSuggestions}
            handleAddNewClient={handleAddNewClient2}

          />
        </div>

        <div className="p-5 pb-10 mt-10 bg-white shadow-lg rounded-lg ">
          <ServiceInfo />
        </div>
        <div className="p-5 pb-10 mt-10 bg-white shadow-lg rounded-lg ">
          <CourtInformation />
        </div>
    
      </form>
      <div className="fixed z-[300] right-10 bottom-20 w-[30rem] px-10 py-8 bg-indigo-500 rounded-full flex justify-around">
        <button onClick={()=>handleSaveJob()} className="h-[5rem] w-[10rem] bg-gray-600 text-white rounded-lg text-2xl">
          {!loading ? "Save Job" : <ClipLoader color="white" />}
          
        </button>
        <button onClick={()=>handleSaveJob()} className=" h-[5rem] w-[10rem] bg-gray-600 text-white rounded-lg text-2xl">
          Cancel Job
          
        </button>

      </div>
    </div>
  );
}

export default Newjob;
