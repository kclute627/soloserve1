"use client"
import {GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE} from "./actionTypes";




export const getUserRequest = () => ({
    type: GET_USER_REQUEST,
   
});

export const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    payload: user
   
})
export const getUserFailure = (error) => ({
    type: GET_USER_FAILURE,
    payload: error, 
})