import {
    CONTRACTOR_DATA_INPUT,
    CONTRACTOR_DATA_INPUT2,
    CONTRACTOR_DATA_INPUT3,
    CONTRACTOR_GOOGLE_ADDRESS,
    RESET_CONTRACTOR_INFORMATION,
    SET_SELECTED_CONTRACTOR,
    SET_SELECTED_CONTRACTOR_INFO
  } from "../actionTypes";
  
  const initialState = {
   
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
    isContractor: true,
    acceptedLink: false,
    coverageArea: []
  };
  
  const newContractorReducer = (state = initialState, action) => {
    switch (action.type) {
      case CONTRACTOR_DATA_INPUT:
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case CONTRACTOR_DATA_INPUT2:
        return {
          ...state,
          contact: {
            ...state.contact,
            [action.payload.name]: action.payload.value,
          },
        };
      case CONTRACTOR_DATA_INPUT3:
        return {
          ...state,
          client_address: {
            ...state.client_address,
            [action.payload.name]: action.payload.value,
          },
        };
      case CONTRACTOR_GOOGLE_ADDRESS:
        return {
          ...state,
          client_address: {
            ...action.payload,
          },
        };
  
      case RESET_CONTRACTOR_INFORMATION: 
      return {
          ...initialState
      }
      
      default:
        return state;
    }
  };
  
  export default newContractorReducer;