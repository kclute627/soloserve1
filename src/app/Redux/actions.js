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
} from "./actionTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

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

export const handleClientInput = (name, value) => ({
  type: CLIENT_DATA_INPUT,
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

export const handleClientInput3 = (name, value) => ({
  type: CLIENT_DATA_INPUT3,
  payload: {
    name,
    value,
  },
});

export const setGoogleAddress = (address) => ({
  type: CLIENT_GOOGLE_ADDRESS,
  payload: address,
});

export const setSelectedClient = (bool) => ({
  type: SET_SELECTED_CLIENT,
  payload: bool,
});

export const setSelectedClientInfo = (data) => ({
    type: SET_SELECTED_CLIENT_INFO,
    payload: data,
});

export const removeSelectedClientInfo = () => ({
    type: REMOVE_SELECTED_CLIENT_INFO
})

export const resetNewClientInformation = ()=> ({
    type: RESET_CLIENT_INFORMATION
})



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



