import { SET_DUE_DATE, SET_PRIORITY } from "./jobActions";



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