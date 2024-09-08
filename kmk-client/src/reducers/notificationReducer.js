import { SET_NOTIFICATION, SET_NOTIFICATIONS } from "../actions/notification";

const defaultState = {
    notifications: [],
    notification: {}
}

const reducer =  (state = defaultState, action) => {
    switch(action.type) {
        case SET_NOTIFICATION:
            return {
                ...state,
                notification: action.notification
            }
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications
            }
        default: 
            return state;
    }
}

export default reducer;