"use client";

import {
  CLIENT_DATA_INPUT,
  CLIENT_DATA_INPUT2,
  CLIENT_DATA_INPUT3,
  CLIENT_GOOGLE_ADDRESS,
  RESET_CLIENT_INFORMATION,
  SET_SELECTED_CLIENT,
  SET_SELECTED_CLIENT_INFO
} from "../actionTypes";

const initialState = {
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
};

const newClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_DATA_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CLIENT_DATA_INPUT2:
      return {
        ...state,
        contact: {
          ...state.contact,
          [action.payload.name]: action.payload.value,
        },
      };
    case CLIENT_DATA_INPUT3:
      return {
        ...state,
        client_address: {
          ...state.client_address,
          [action.payload.name]: action.payload.value,
        },
      };
    case CLIENT_GOOGLE_ADDRESS:
      return {
        ...state,
        client_address: {
          ...action.payload,
        },
      };

    case RESET_CLIENT_INFORMATION: 
    return {
        ...initialState
    }
    
    default:
      return state;
  }
};

export default newClientReducer;
