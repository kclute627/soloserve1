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
import ClientInfo from "../newjob/ClientInfo/ClientInfo";
import ProcessServer from "./ProcessServer/ProcessServer";
import ServiceDocumentInput from "./Service Documents/ServiceDocumentsInput";
import CourtInformation from "./Case/CaseInformation";
import Devider from "../../../components/Devider";

function Newjob() {
  const [user, setUser] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  /// new client
  const [selectedClient, setSelectedClient] = useState(false);
  const [selectedClientInfo, setSelectedClientInfo] = useState(null);
  const [clientInformation, setClientInformation] = useState({
    clientRef: "",
    clientDisplayName: "",
    client_address: {
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

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userInfo = await getUserFromDb(authUser);

          setUser(userInfo, "USER");
        } catch (error) {
          console.log(error, "error line98");
        }
      }
    });
  }, []);

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
    const newFiles = selectedFiles.filter((cur) => cur.id !== id);
    setSelectedFiles(newFiles);
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

      // Set the state with the updated array
      setSelectedFiles(updatedSelectedFiles);
    } else {
      console.error("File not found");
    }
  };

  const handleAddNewClient = async () => {
    try {
      const newClient = await createNewClientinDb(
        user,
        clientInformation.clientDisplayName,
        clientInformation.client_address,
        clientInformation.contact.phoneNumber,
        clientInformation.contact.email,
        clientInformation.contact.firstName,
        clientInformation.contact.lastName,
        clientInformation.website
      );

      const data = await getClientFromDB(newClient);

      setSelectedClientInfo(data);
      setSelectedClient(true);
    } catch (error) {
      console.log(error);
    }
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
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            handleFileDisplayNameChange={handleFileDisplayNameChange}
            handleDeleteFile={handleDeleteFile}
          />
        </div>
        <div className="p-5 pb-10 mt-10 bg-white shadow-lg rounded-lg ">
          <ClientInfo
            clientInformation={clientInformation}
            setClientInformation={setClientInformation}
            handleAddNewClient={handleAddNewClient}
            selectedClient={selectedClient}
            selectedClientInfo={selectedClientInfo}
            handleClientSuggestions={handleClientSuggestions}
            handleSelectedClient={handleSelectedClient}
            setSelectedClient={setSelectedClient}
            setSelectedClientInfo={setSelectedClientInfo}
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
