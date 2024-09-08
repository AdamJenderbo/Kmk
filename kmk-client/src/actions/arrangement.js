import { apiGet, apiPost } from "./net";

export const EDIT_ARRANGEMENT = "EDIT_ARRANGEMENT";
export const SET_ARRANGEMENT = "SET_ARRANGEMENT";
export const SET_ARRANGEMENTS = "SET_ARRANGEMENTS";
export const ADD_PART = "ADD_PART";
export const EDIT_PART = "EDIT_PART";
export const CLEAR_ARRANGEMENT = "CLEAR_ARRANGEMENT";

export const ArrangementSorting = {
    SerialNumber: 0,
    Title: 1,
    Composer: 2,
    Arranger: 3
}

export function loadArrangements(filter, sorting) {
    return async (dispatch) => {
        try {

            const request = { 
                sorting: sorting,
                filter: filter.filter
            };

            const arrangements = await dispatch(apiPost("arrangement/list", request));

            dispatch({ type: SET_ARRANGEMENTS, arrangements});
        }

        catch(e) {
            console.log(e);
        }
    }
}

export function loadArragement(serialNumber) {
    return async (dispatch) => {
        try {
            const arrangement = await dispatch(apiPost(`arrangement/get`, {serialNumber}));

            dispatch({ type: SET_ARRANGEMENT, arrangement });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function registerArrangement() {
    return async (dispatch, getState) => {
        try {
            const {arrangement: {arrangement}} = getState();

            await dispatch(apiPost(`arrangement/register`, arrangement));
            
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function clearArrangement() {
    return async (dispatch) => {
        try {           
            dispatch({type: CLEAR_ARRANGEMENT});
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function createArrangement() {
    return async (dispatch, getState) => {
        try {
            const {arrangement: {arrangement}} = getState();

            const response = await dispatch(apiPost(`arrangement/create`, arrangement));

            if(!response.isSuccess) {
                console.log(response.message);
            }

            return response;
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function saveArrangement() {
    return async (dispatch, getState) => {
        try {
            const {arrangement: {arrangement}} = getState();

            await dispatch(apiPost(`arrangement/save`, arrangement));
            
            dispatch(loadArragement(arrangement.serialNumber));
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function editArrangement(change) {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ARRANGEMENT, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function deleteArrangement() {
    return async (dispatch, getState) => {
        try {

            const {arrangement: {arrangement}} = getState();

            await dispatch(apiPost(`arrangement/delete`, {serialNumber: arrangement.serialNumber}));  
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function addPart() {
    return async (dispatch) => {
        try {
            dispatch({ type: ADD_PART, part: {insturment: 1, count: 1} });
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function editPart(change) {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_PART, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}