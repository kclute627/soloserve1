"use client";
import { createNewClientinDb, getClientFromDB } from "../firebase/firebase";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  DOCUMENT_UPLOAD_PROGRESS,
  DOCUMENT_UPLOAD_PROGRESS_SET_NUMBER_OF_FILES,
  DOCUMENT_UPLOAD_PROGRESS_SET_CURRENT_FILE,
  CLEAR_PROGRESS,
  SET_SELECTED_FILES,
  DELETE_FILE,
  CLIENT_REF,
  CLIENT_SEARCH_BAR,
  CLIENT_DATA_INPUT,
  CLIENT_DATA_INPUT2,
  CLIENT_DATA_INPUT3,
  CLIENT_GOOGLE_ADDRESS,
  SET_SELECTED_CLIENT,
  SET_SELECTED_CLIENT_INFO,
  REMOVE_SELECTED_CLIENT_INFO,
  RESET_CLIENT_INFORMATION,
  CLEAR_USER,
  REMOVE_SELECTED_CONTRACTOR_INFO,
  RESET_CONTRACTOR_INFORMATION,
  SET_SELECTED_CONTRACTOR_INFO,
  SET_SELECTED_CONTRACTOR,
  CONTRACTOR_GOOGLE_ADDRESS,
  CONTRACTOR_DATA_INPUT3,
  CONTRACTOR_DATA_INPUT2,
  CONTRACTOR_DATA_INPUT,
  CONTRACTOR_SEARCH_BAR,
  ADD_SERVICE_ADDRESS, 
  UPDATE_SERVICE_ADDRESS,
  DELETE_SERVICE_ADDRESS,
  SET_RECIPIENT,
  SET_CASE_NUMBER,
  SET_PLANT,
  SET_DEF,
  SET_COURT_NAME,
  SET_COURT_INFO
} from "./actionTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const logUserOut = () => ({
  type: CLEAR_USER
})

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});
export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

/// set New Job Document

export const setDocumentUploadProgrssNumFiles = (numberOfFiles) => ({
  type: DOCUMENT_UPLOAD_PROGRESS_SET_NUMBER_OF_FILES,
  payload: numberOfFiles,
});

export const setDocumentUploadProgress = (progress) => {
  console.log("setDocumentUploadProgress", progress);

  return { type: DOCUMENT_UPLOAD_PROGRESS, payload: progress };
};
export const setDocumentUploadProgrssCurrentFile = (currentFile) => ({
  type: DOCUMENT_UPLOAD_PROGRESS_SET_CURRENT_FILE,
  payload: currentFile,
});
export const clearProgress = () => ({
  type: CLEAR_PROGRESS,
});

export const setSelectedFiles = (files) => ({
  type: SET_SELECTED_FILES,
  payload: files,
});

export const deleteFile = (files) => ({
  type: DELETE_FILE,
  payload: files,
});

// new job client information

export const setClientRef = (clientRef) => ({
  type: CLIENT_REF,
  payload: clientRef,
});

export const handleClients = (clientInfo) => ({
  type: CLIENT_SEARCH_BAR,
  payload: clientInfo,
});
export const handleContractors = (contractorInfo) => ({
  type: CONTRACTOR_SEARCH_BAR,
  payload: contractorInfo,
});

export const handleClientInput = (name, value) => ({
  type: CLIENT_DATA_INPUT,
  payload: {
    name,
    value,
  },
});
export const handleContractorInput = (name, value) => ({
  type: CONTRACTOR_DATA_INPUT,
  payload: {
    name,
    value,
  },
});

export const handleClientInput2 = (name, value) => ({
  type: CLIENT_DATA_INPUT2,
  payload: {
    name,
    value,
  },
});
export const handleContractorInput2 = (name, value) => ({
  type: CONTRACTOR_DATA_INPUT2,
  payload: {
    name,
    value,
  },
});

export const handleClientInput3 = (name, value) => ({
  type: CLIENT_DATA_INPUT3,
  payload: {
    name,
    value,
  },
});

export const handleContractorInput3 = (name, value) => ({
  type: CONTRACTOR_DATA_INPUT3,
  payload: {
    name,
    value,
  },
});

export const setGoogleAddress = (address) => ({
  type: CLIENT_GOOGLE_ADDRESS,
  payload: address,
});
export const setGoogleAddressContractor = (address) => ({
  type: CONTRACTOR_GOOGLE_ADDRESS,
  payload: address,
});
// export const setServiceAddressContractor = (address) => ({
//   type: CONTRACTOR_GOOGLE_ADDRESS,
//   payload: address,
// });

export const setSelectedClient = (bool) => ({
  type: SET_SELECTED_CLIENT,
  payload: bool,
});
export const setSelectedContractor = (bool) => ({
  type: SET_SELECTED_CONTRACTOR,
  payload: bool,
});

export const setSelectedClientInfo = (data) => ({
    type: SET_SELECTED_CLIENT_INFO,
    payload: data,
});

export const setSelectedContractorInfo = (data) => ({
  type: SET_SELECTED_CONTRACTOR_INFO,
  payload: data,
});

export const removeSelectedClientInfo = () => ({
    type: REMOVE_SELECTED_CLIENT_INFO
})
export const removeSelectedContractorInfo = () => ({
  type: REMOVE_SELECTED_CONTRACTOR_INFO
})

export const resetNewClientInformation = ()=> ({
    type: RESET_CLIENT_INFORMATION
})

export const resetNewContractorInformation = ()=> ({
  type: RESET_CONTRACTOR_INFORMATION
})

export const addServiceAddress = () => ({
  type: ADD_SERVICE_ADDRESS,
});

export const setRecipient = (r) => ({
  type: SET_RECIPIENT,
  payload: r
});


export const updateServiceAddress = (index, address) => ({
  type: UPDATE_SERVICE_ADDRESS,
  payload: { index, address },
});

export const deleteServiceAddress = (index) => ({
  type: DELETE_SERVICE_ADDRESS,
  payload: index,
});


export const setCourtName = (courtName) => ({
  type: SET_COURT_NAME,
  payload: courtName
})
export const setCaseNum = (caseNum) => ({
  type: SET_CASE_NUMBER,
  payload: caseNum
})

export const setPlant = (plaintiff) => ({
  type: SET_PLANT,
  payload: plaintiff
})

export const setDef = (def) => ({
  type: SET_DEF,
  payload: def
})


export const handleCourtInfo = (name, value) => {
console.log(name)
  return {
  type: SET_COURT_INFO,
  payload: {
    name,
    value,
  },
}
};





  export const fetchClientInfo = (newClient) => async (dispatch) => {
    try {
      // Assuming getClientFromDB is an asynchronous function that fetches data from a database
      const dbNewClient = await createNewClientinDb(newClient.user, newClient.clientDisplayName, newClient.client_address, newClient.phoneNumber, newClient.email, newClient.firstName, newClient.lastName, newClient.website )
      const data = await getClientFromDB(dbNewClient);
      console.log(data)
      // Dispatching actions using the dispatch function passed as an argument
      dispatch(setSelectedClientInfo(data));
      dispatch(setSelectedClient(true));
    } catch (error) {
      // Handle error
      console.error('Error fetching client info:', error);
    }
  };

  export const fetchContractorInfo = (newContractor) => async (dispatch) => {
    try {
     
      // Assuming getClientFromDB is an asynchronous function that fetches data from a database
      const dbNewClient = await createNewClientinDb(newContractor.user, newContractor.clientDisplayName, newContractor.client_address,  newContractor.phoneNumber,  newContractor.email,  newContractor.firstName,  newContractor.lastName,  newContractor.website )
      const data = await getClientFromDB(dbNewClient);
      console.log(data)
      // Dispatching actions using the dispatch function passed as an argument
      dispatch(setSelectedContractorInfo(data));
      dispatch(setSelectedContractor(true));
    } catch (error) {
      // Handle error
      console.error('Error fetching client info:', error);
    }
  };



