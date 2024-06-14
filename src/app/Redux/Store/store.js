"use client"
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Reducers/userReducer";
import newJobReducer from "../Reducers/newJobReducer";
import newClientReducer from "../Reducers/newClientReducer"
import newContractorReducer from "../Reducers/newContractorReducer"
import jobsReducer from "../Reducers/jobsReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    newJob: newJobReducer, 
    newClient: newClientReducer,
    newContractor: newContractorReducer,
    jobs: jobsReducer
  },
})



