"use client"
import { CLEAR_USER, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "../actionTypes"; 



const initialState = {
    user: null,
    loading: false,
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST: 
            return {...state, loading: true, error: null};
        case GET_USER_SUCCESS: 
            return {...state, loading: false, user: action.payload, error: null}
        case GET_USER_FAILURE: 
            return {...state, loading: false, error: action.payload}
        case CLEAR_USER: 
            return {...state}
        default:
            return state
    }
}

export default userReducer

