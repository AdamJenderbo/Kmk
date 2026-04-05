import { LOG_IN, LOG_OUT } from "../actions/authentication";
import { SET_USERS, SET_USER, SET_UNAPPROVED_USERS } from "../actions/user";

const defaultState = {
    users: [],
    user: {},
    unapprovedUsers: []
}

const reducer =  (state = defaultState, action) => {
    switch(action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_UNAPPROVED_USERS:
            return {
                ...state,
                unapprovedUsers: action.users
            }
        case LOG_IN:
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case LOG_OUT:
            return {
                ...state,
                user: {}
            }
        default: 
            return state;
    }
}

export default reducer;