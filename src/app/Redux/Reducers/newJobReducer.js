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
  REMOVE_SELECTED_CLIENT_INFO,
  CONTRACTOR_SEARCH_BAR,
  SET_SELECTED_CONTRACTOR,
  SET_SELECTED_CONTRACTOR_INFO,
  REMOVE_SELECTED_CONTRACTOR_INFO,
  ADD_SERVICE_ADDRESS,
  DELETE_SERVICE_ADDRESS,
  UPDATE_SERVICE_ADDRESS,
  SET_RECIPIENT,
  SET_COURT_INFO
} from "../actionTypes";
import {SET_DUE_DATE, SET_PRIORITY, SET_SERVER_TYPE} from "../Actions/jobActions"

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
    selectedContractor: false,
    selectedContractorInfo: null,
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
    jobPriority: "routine",
    jobDueDate: "",
    serverType: "employee",
    recipient: "",
    serviceAddress: [
      {
        street: "",
        suite: "",
        city: "",
        state: "",
        zip: "",
        lat: "",
        lng: "",
        googleMapLink: "",
        primary: true
      }
     
    ],
    caseInformation: {
      caseId: "",
      caseNumber: "",
      plaintiff: "",
      defendant: "",
      courtName: "",

      
    }
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
        case CONTRACTOR_SEARCH_BAR: 
        return {
          ...state,
          newJobInformation: {
            ...state.newJobInformation,
            contractInformation: {
              ...state.contractInformation,
              contractorDisplayName: action.payload

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
        case SET_SELECTED_CONTRACTOR: 
        return {
          ...state,
          newJobInformation: {
            ...state.newJobInformation,
            selectedContractor: action.payload
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
        case SET_SELECTED_CONTRACTOR_INFO: 
        return {
          ...state,
          newJobInformation: {
            ...state.newJobInformation,
            selectedContractorInfo: {...action.payload}
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
        case SET_DUE_DATE: 
        return  {
          ...state,
          newJobInformation: {
            ...state.newJobInformation,
            jobDueDate: action.payload

          }
          
        }
        case SET_PRIORITY:
          
          return {
            ...state,
            newJobInformation: {
              ...state.newJobInformation,
              jobPriority: action.payload

            }
            
          }
        case SET_SERVER_TYPE:
          return {
            ...state,
            newJobInformation: {
             ...state.newJobInformation,
             serverType: action.payload
            }
            
          }
        case SET_RECIPIENT: 
          return {
            ...state,
            newJobInformation: {
              ...state.newJobInformation,
              recipient: action.payload
            }
          }
          case ADD_SERVICE_ADDRESS:
            return {
              ...state,
              newJobInformation: {
                ...state.newJobInformation,
                serviceAddress: [
                  ...state.newJobInformation.serviceAddress,
                  {
                    id: "",
                    street: "",
                    suite: "",
                    city: "",
                    state: "",
                    zip: "",
                    lat: "",
                    lng: "",
                    googleMapLink: "",
                    primary: false,
                  },
                ],
              },
            };
          case UPDATE_SERVICE_ADDRESS:
            return {
              ...state,
              newJobInformation: {
                ...state.newJobInformation,
                serviceAddress: state.newJobInformation.serviceAddress.map(
                  (address, index) =>
                    index === action.payload.index
                      ? { ...address, ...action.payload.address }
                      : address
                ),
              },
            };
          case DELETE_SERVICE_ADDRESS:
            return {
              ...state,
              newJobInformation: {
                ...state.newJobInformation,
                serviceAddress: state.newJobInformation.serviceAddress.filter(
                  (address, index) => index !== action.payload
                ),
              },
            };
            case SET_RECIPIENT:
              return {
                ...state,
                newJobInformation: {
                  ...state.newJobInformation,
                  recipient: action.payload
                },
              };
            case SET_COURT_INFO:
                return {
                ...state,
                newJobInformation: {
                  ...state.newJobInformation,
                  caseInformation: {
                    ...state.newJobInformation.caseInformation,
                    [action.payload.name]: action.payload.value,

                  }
                  
                },
      };
          
          



      
    default:
      return state;
  }
};

export default newJobReducer;
