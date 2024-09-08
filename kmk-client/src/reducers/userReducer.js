import { LOG_IN, LOG_OUT } from "../actions/authentication";
import { SET_USERS, SET_USER, EDIT_USER_FORM, SET_UNAPPROVED_USERS } from "../actions/user";

const defaultState = {
    users: [],
    user: {},
    unapprovedUsers: [],
    register: {
        form: {
            name: "",
            email: "",
            address: "",
            phoneNumber: "",
            instrument: 1,
            password: "",
            passwordConfirm: ""
        }
    }
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
        case EDIT_USER_FORM:
            return {
                ...state,
                register: {
                    ...state.register,
                    form: {
                        ...state.register.form,
                        ...action.change
                    }
                }
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