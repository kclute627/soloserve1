import { useState } from "react";
import NewJobTop from "../newjob/NewJobTop"
import ServiceDocumentInput from "./Service Documents/ServiceDocumentsInput"

function Newjob() {
  const [selectedFiles, setSelectedFiles] = useState([]);


  const handleDeleteFile = (e,id) => {  

    e.preventDefault()


    const newFiles = selectedFiles.filter(cur => cur.id !== id)

    setSelectedFiles(newFiles)
  }


  const handleFileDisplayNameChange = (e, id) => {
    // Locate the selectedFile
    const index = selectedFiles.findIndex(item => item.id === id);

    // Check if the file is found
    if (index !== -1) {
        const newDisplayName = e.target.value;

        // Create a new array with updated display name

        
        const updatedFileArray = {
            file: selectedFiles[index].file,
            displayName: newDisplayName,  // Keep the file object
            ...selectedFiles[index]

         
         } // Update the metadata
        ;

        // Create a new array with the updated file at the correct index
        const updatedSelectedFiles = [...selectedFiles];
        updatedSelectedFiles[index] = updatedFileArray;

        // Set the state with the updated array
        setSelectedFiles(updatedSelectedFiles);
    } else {
        console.error('File not found');
    }
}

  

  return (
    <div>
      <form action="">
        <ServiceDocumentInput selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}  handleFileDisplayNameChange={ handleFileDisplayNameChange} handleDeleteFile={handleDeleteFile} />
      </form>
    </div>
  );
}

export default Newjob;
