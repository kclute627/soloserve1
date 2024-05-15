import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  createNewClientinDb,
  auth,
  getUserFromDb,
  getClientFromDB,
  getMatchingClientsFromDb,
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
import ProcessServer from "./ProcessServer/ProcessServer";
import ServiceDocumentInput from "./Service Documents/ServiceDocumentsInput";
import CourtInformation from "./Case/CaseInformation";
import Devider from "../../../components/Devider";

function Newjob() {
  /// new client

 

  const [contractInformation, setContractInformation] = useState({
    sendLink: false,
    contractorDisplayName: "",
    contractor_address: {
      street: "",
      suite: "",
      city: "",
      state: "",
      zip: "",
      lat: "",
      lng: "",
      googleMapLink: "",
    },
    website: "",
    contact: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  // employee / contractor
  const [serverTypeSelect, setServerTypeSelect] = useState("employee");

  const dispatch = useDispatch();
  const { newJobInformation } = useSelector((state) => state.newJob);
  const newClientInfo = useSelector((state) => state.newClient);
  const { user } = useSelector((state) => state.user);

  const handleClientSuggestions = async (text) => {
    if (text.length > 2) {
      try {
        const matchingArray = await getMatchingClientsFromDb(text, user);

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
      website: newClientInfo.website
    }
    dispatch(fetchClientInfo(newClient))
  }

  const handleAddNewClient = async() =>  {
    let data = null
    let newDataStructure = null
    try {
      const newClient = await createNewClientinDb(
        user,
        newClientInfo.clientDisplayName,
        newClientInfo.client_address,
        newClientInfo.contact.phoneNumber,
        newClientInfo.contact.email,
        newClientInfo.contact.firstName,
        newClientInfo.contact.lastName,
        newClientInfo.website
      );

      await getClientFromDB(newClient).then((dispatch) => {
        dispatch(setSelectedClientInfo(dispatch));
      })
      console.log(data)
      newDataStructure = {
        id: data.id,
        clientDisplayName: data.name,
        clientAddress: [...data.addresses],
        website: data.website,
        contact: [...data.contacts],

      }
      console.log(newDataStructure)

     
    } catch (error) {
      console.log(error);
    }

    if(newDataStructure != null){
      setTimeout(()=>{
        
      }, 1000)
   
    dispatch(setSelectedClient(true));
    }
  };

  const setSelectedClientData = async (data) => async (dispatch) => {
    await dispatch(setSelectedClientInfo(data));
    await dispatch(setSelectedClient(true));
  };

  const handleSelectedClient = async (client) => {
    try {
      setSelectedClientInfo(client);
      setSelectedClient(true);
    } catch (error) {}
  };

  return (
    <div>
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
        <div className="">Due Date Slider</div>

        <ProcessServer
          contractInformation={contractInformation}
          setContractInformation={setContractInformation}
          setServerTypeSelect={setServerTypeSelect}
          serverTypeSelect={serverTypeSelect}
        />
        <div className="pt-10">
          <Devider />
        </div>
        <CourtInformation />
      </form>
    </div>
  );
}

export default Newjob;
