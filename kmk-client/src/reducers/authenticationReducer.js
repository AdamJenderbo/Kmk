import { LOG_IN, LOG_OUT } from "../actions/authentication";

const defaultState = {
    isLoggedIn: false
}

const reducer =  (state = defaultState, action) => {
    switch(action.type) {
        case LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token
            }
        case LOG_OUT:
            return {
                ...state,
                isLoggedIn: false
            }
        default: 
            return state;
    }
}

export default reducer;