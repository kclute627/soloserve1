import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  createNewClientinDb,
  auth,
  getUserFromDb,
  getClientFromDB,
  getMatchingClientsFromDb,
} from "../../../firebase/firebase";
import ClientInfo from "../newjob/ClientInfo/ClientInfo";
import ProcessServer from "./ClientInfo/ProcessServer";
import ServiceDocumentInput from "./Service Documents/ServiceDocumentsInput";

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

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userInfo = await getUserFromDb(authUser);
          console.log(user);
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
      console.log(e.target.value);
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
      console.log(newClient, "new clienttt");

      const data = await getClientFromDB(newClient);
      console.log(data);

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
        <ServiceDocumentInput
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          handleFileDisplayNameChange={handleFileDisplayNameChange}
          handleDeleteFile={handleDeleteFile}
        />
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
        <ProcessServer />
      </form>
    </div>
  );
}

export default Newjob;
