import { apiGet, apiPost } from "./net";


export const InviteStatus = {
    Declined: 1,
    Accepted: 2
}

export const EDIT_EVENT = "EDIT_EVENT";
export const SET_EVENT = "SET_EVENT";
export const SET_EVENTS = "SET_EVENTS";

export function loadEvents() {
    return async (dispatch) => {
        try {           
            const events = await dispatch(apiGet("calendar"));

            dispatch({type: SET_EVENTS, events});
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function loadEvent(id) {
    return async (dispatch) => {
        try {
            const event = await dispatch(apiGet(`calendar/event/${id}`));
            
            dispatch({ type: SET_EVENT, event });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function editEvent(change) {
    return async (dispatch) => {
        console.log(change)
        try {
            dispatch({ type: EDIT_EVENT, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function createEvent() {
    return async (dispatch, getState) => {
        try {
            const {calendar: {event}} = getState();

            console.log(event)

            const response = await dispatch(apiPost("calendar/event", event));
            
            return response;
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function acceptInvite(eventId, userId) {
    return async (dispatch) => {
        try {
            await dispatch(apiPost("calendar/event/invite/accept", {eventId, userId}));

            dispatch(loadEvent(eventId)); 
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function declineInvite(eventId, userId) {
    return async (dispatch) => {
        try {
            await dispatch(apiPost("calendar/event/invite/decline", {eventId, userId}));

            dispatch(loadEvent(eventId));            
        }
        catch(e) {
            console.log(e);
        }
    }
}