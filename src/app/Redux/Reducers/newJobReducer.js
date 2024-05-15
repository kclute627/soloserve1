"use client";
import {
  DOCUMENT_UPLOAD_PROGRESS,
  DOCUMENT_UPLOAD_PROGRESS_SET_NUMBER_OF_FILES,
  DOCUMENT_UPLOAD_PROGRESS_SET_CURRENT_FILE,
  CLEAR_PROGRESS,
  SET_SELECTED_FILES,
  DELETE_FILE,
  CLIENT_REF,
  CLIENT_SEARCH_BAR,
  SET_SELECTED_CLIENT,
  SET_SELECTED_CLIENT_INFO,
  REMOVE_SELECTED_CLIENT_INFO
} from "../actionTypes";

const initialState = {
  loading: false,
  error: null,
  uploadProgress: {
    numberOfFiles: 0,
    currentFile: 0,
    uploadProgress: 0,
  },
  newJobInformation: {
    selectedFiles: [],
    selectedClient: false,
    selectedClientInfo: null,
    clientRef: "",
    clientInformation: {
     
      id: "",
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
    },
    contractInformation: {
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
    },
    serverTypeSelect: "employee",
    selectedEmployeeServer: "",
  },
};

const newJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_UPLOAD_PROGRESS_SET_NUMBER_OF_FILES:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          numberOfFiles: action.payload,
        },
      };
    case DOCUMENT_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          uploadProgress: action.payload,
        },
      };
    case DOCUMENT_UPLOAD_PROGRESS_SET_CURRENT_FILE:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          currentFile: action.payload,
        },
      };
    case CLEAR_PROGRESS:
      return {
        ...state,
        uploadProgress: { numberOfFiles: 0, currentFile: 0, uploadProgress: 0 },
      };
    case SET_SELECTED_FILES:
      return {
        ...state,
        newJobInformation: {
          ...state.newJobInformation,
          selectedFiles: [...state.newJobInformation.selectedFiles, ...action.payload]

        }

      }
    case DELETE_FILE:
      return {
        ...state,
        newJobInformation: {
          ...state.newJobInformation,
          selectedFiles: [...action.payload]
        }
      }
    case CLIENT_REF:
      return {
        ...state,
        newJobInformation: {
          ...state.newJobInformation,
          clientRef: action.payload
          
        }
      }
      case CLIENT_SEARCH_BAR:
        return {
          ...state,
          newJobInformation: {
            ...state.newJobInformation,
            clientInformation: {
              ...state.newJobInformation.clientInformation,
              clientDisplayName: action.payload
            }
          }
        }
        case SET_SELECTED_CLIENT:
        return {
          ...state,
          newJobInformation: {
            ...state.newJobInformation,
            selectedClient: action.payload
          }
        }
        case SET_SELECTED_CLIENT_INFO:
         
          return {
            ...state,
            newJobInformation: {
              ...state.newJobInformation,
              selectedClientInfo: {...action.payload}
            }
          }
       case REMOVE_SELECTED_CLIENT_INFO:
        return {
          ...state,
          newJobInformation: {
            ...state.newJobInformation,
            selectedClientInfo: null
          }
        }
    default:
      return state;
  }
};

export default newJobReducer;
