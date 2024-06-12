import { SET_DUE_DATE, SET_PRIORITY, SET_RECIPIENT, SET_SERVER_TYPE } from "./jobActions";



export const setJobDueDate = (dueDate) => {
    const dateObj = new Date(dueDate);
   return { 
    type: SET_DUE_DATE,
    payload: dateObj.toISOString().split('T')[0]
}
};

export const setJobPriority = (priority) => ({
    type: SET_PRIORITY,
    payload: priority
})

export const setServerType = (type)=> ({
    type: SET_SERVER_TYPE,
    payload: type
})

export const setRecipient = (input) => ({
    type: SET_RECIPIENT,
    payload: input
    
})