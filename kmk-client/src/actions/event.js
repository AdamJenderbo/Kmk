import { apiPost } from "./net";

const endpoint = "event";

const JANUARY = 1;
const FEBUARY = 2;
const MARS = 3;
const APRIL = 4;
const MAY = 5;
const JUNE = 6;
const JULI = 7;
const AUGUST = 8;
const SEPTEMBER = 9;
const OCTOBER = 10;
const NOVEMBER = 11;
const DECEMBER = 12;

export const EDIT_EVENT = "EDIT_EVENT";
export const SET_EVENT = "SET_EVENT";
export const SET_EVENTS = "SET_EVENTS";


export function getEvents() {
    return async (dispatch) => {
        try {
            const events = await apiPost(`${endpoint}/get`, {});

            dispatch({ type: SET_EVENTS, events });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function getEvent(id) {
    return async (dispatch) => {
        try {
            const event = await dispatch(apiPost(`${endpoint}/getById`, {id}));
            
            dispatch({ type: SET_EVENT, event });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function createEvent() {
    return async (_, getState) => {
        try {
            const {event: {event}} = getState();

            await apiPost(`${endpoint}/create`, event);
            
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function cancelEvent(id) {
    return async (dispatch) => {
        try {
            await apiPost(`${endpoint}/cancel`, {id});

            dispatch({ type: SET_EVENT, event: {} });
            
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function getMonthInfo(month) {
    switch(month) {
        case JANUARY:
            return {
                noOfDays: "31"
            };
        case FEBUARY:
            return 28;
        case MARS:
            return 31;
        case APRIL:
            return 30;
        case MAY:
            return 31;
        case JUNE:
            return 30;
        case JULI:
            return 31;
        case AUGUST:
            return 31;
        case SEPTEMBER:
            return 30;
        case OCTOBER:
            return 31;
        case NOVEMBER:
            return 30;
        case DECEMBER:
            return 31;
        default:
            return "";
    }
}


export const monthOptions = [
    {value: JANUARY, text: "Januari"}, 
    {value: FEBUARY, text: "Februari"},
    {value: MARS, text: "Mars"}, 
    {value: APRIL, text: "April"},
    {value: MAY, text: "Maj"}, 
    {value: 6, text: "Juni"},
    {value: 7, text: "Juli"}, 
    {value: 8, text: "Augusti"},
    {value: 9, text: "September"}, 
    {value: 10, text: "Oktober"},
    {value: 11, text: "November"},
    {value: 12, text: "December"},
]

export function getNoOfDaysInMonth(month) {
    switch(month) {
        case JANUARY:
            return 31;
        case FEBUARY:
            return 28;
        case MARS:
            return 31;
        case APRIL:
            return 30;
        case MAY:
            return 31;
        case JUNE:
            return 30;
        case JULI:
            return 31;
        case AUGUST:
            return 31;
        case SEPTEMBER:
            return 30;
        case OCTOBER:
            return 31;
        case NOVEMBER:
            return 30;
        case DECEMBER:
            return 31;
        default:
            return "";
    }
}


export function getNameOfMonth(month) {
    switch(month) {
        case 0:
            return "januari";
        case 1:
            return "februari"
        case 2:
            return "mars";
        case 3:
            return "april"
        case 4:
            return "maj";
        case 5:
            return "juni"
        case 6:
            return "juli";
        case 7:
            return "augusti"
        case 8:
            return "september";
        case 9:
            return "oktober";
        case 10:
            return "november";
        case 11:
            return "december";
        default:
            return "";
    }
}

export function getWeekDayOfDate(year, month, day) {
    const lastTwoDigitsOfYear = parseInt(`${year[2]}${year[3]}`);
    const quarterOfLastTwoDigits = lastTwoDigitsOfYear / 4;
    const keyNumberOfMonth = getKeyNumberOfMonth(month);
    
    const sum = lastTwoDigitsOfYear + quarterOfLastTwoDigits + keyNumberOfMonth + day - (year > 1999 ? 0 : 0);
    return (sum / 7) - 1;
}


function getKeyNumberOfMonth(month) {
    switch(month) {
        case JANUARY:
            return 1;
        case FEBUARY:
            return 4;
        case MARS:
            return 4;
        case APRIL:
            return 0;
        case MAY:
            return 2;
        case JUNE:
            return 5;
        case JULI:
            return 0;
        case AUGUST:
            return 3;
        case SEPTEMBER:
            return 6;
        case OCTOBER:
            return 1;
        case NOVEMBER:
            return 4;
        case DECEMBER:
            return 6;
        default:
            return "";
    }
}