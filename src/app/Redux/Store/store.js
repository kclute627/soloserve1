"use client"
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Reducers/userReducer";
import newJobReducer from "../Reducers/newJobReducer";
import newClientReducer from "../Reducers/newClientReducer"

export default configureStore({
  reducer: {
    user: userReducer,
    newJob: newJobReducer, 
    newClient: newClientReducer,
  },
})



