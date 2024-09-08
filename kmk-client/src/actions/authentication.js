import { apiPost } from "./net";

const endpoint = "user";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export function logIn(email, password) {
    return async (dispatch) => {
        try {
            const response = await dispatch(apiPost(`${endpoint}/login`, {email, password}));
            if(response.isSuccess) {
                dispatch({ 
                    type: LOG_IN, 
                    user: {
                        ...response.user,
                        roles: response.user.roles.map(x => x.role)
                    }, 
                    token: response.token
                });
            } else {
                dispatch({ type: LOG_OUT })
            }

            return response;
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function logOut() {
    return async (dispatch) => {
        try {
            dispatch({ type: LOG_OUT })
        }
        catch(e) {
            console.log(e);
        }
    }
}