import { SET_FORM } from "./form";
import { apiGet, apiPost, apiPostFormData } from "./net";

const endpoint = "user";

export const EDIT_USER_FORM = "EDIT_USER_FORM";
export const SET_USER = "SET_USER";
export const SET_USERS = "SET_USERS";
export const SET_UNAPPROVED_USERS = "SET_UNAPPROVED_USERS";
export const EDIT_USER = "EDIT_USER";


export const Role = {
    Admin: 0,
    Chairman: 1,
    Secretery: 2,
    Treasurer: 3,
    BoardMember: 4,
    BoardDeputy: 5,
    Arrangement: 6,
    Transport: 7,
    Uniform: 8
}

export function roleToString(role) {
    switch(role){
        case Role.Admin:
            return "Admin";
        case Role.Chairman:
            return "Ordförande";
        case Role.Secretery:
            return "Sekreterare";
        case Role.Treasurer:
            return "Kassör";
        case Role.BoardMember:
            return "Styrelseledamot";
        case Role.BoardDeputy:
            return "Styrelsesuppleant";
        case Role.Arrangement:
            return "Notmarsk";
        case Role.Transport:
            return "Transportansvarig";
        case Role.Uniform:
            return "Klädansvarig";
        default:
            return "";
    }

}

export function instrumentToString(role) {
    switch(role){
        case Role.Admin:
            return "Admin";
        case Role.Chairman:
            return "Ordförande";
        case Role.Secretery:
            return "Sekreterare";
        case Role.Treasurer:
            return "Kassör";
        case Role.BoardMember:
            return "Styrelseledamot";
        case Role.BoardDeputy:
            return "Styrelsesuppleant";
        case Role.Arrangement:
            return "Notmarsk";
        case Role.Transport:
            return "Transportansvarig";
        case Role.Uniform:
            return "Klädansvarig";
        default:
            return "";
    }

}

export function getUsers(filter) {
    return async (dispatch) => {
        try {

            const users = await dispatch(apiPost("user/list", {filter}));

            dispatch({ type: SET_USERS, users });
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function getUser(id) {
    return async (dispatch) => {
        try {
            const user = await dispatch(apiGet(`${endpoint}/${id}`));
            dispatch({ type: SET_USER, user });
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function loadUsers(filter) {
    return async (dispatch) => {
        try {

            const request = { filter }

            const response = await dispatch(apiPost("user/list", request));

            if(response.isSuccess)
            {
                dispatch({ type: SET_USERS, users: response.payload });
            }

        }
        catch(e) {
            console.log(e);
        }
    }
}

export function loadUser(id) {
    return async (dispatch) => {
        try {
            const user = await dispatch(apiGet(`user/${id}`));

            dispatch({ type: SET_FORM, user });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function loadMembershipRequests() {
    return async (dispatch) => {
        try {
            const response = await dispatch(apiGet("user/unapproved"));

            dispatch({ type: SET_UNAPPROVED_USERS, users: response.payload });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function registerUser(user, image) {
    return async (dispatch) => {
        try {
            if(!validateUserForm(user)) {
                console.logError("User not valid!")
                return;
            }

            const response = await dispatch(apiPost("user/register", {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
                address: user.address,
                instrument: parseInt(user.instrument),
                dateOfBirth: user.dateOfBirth
            }));

            if(response.isSuccess) {
                dispatch({ type: SET_USER, user: response.user });

                if(image) {                  
                    await dispatch(uploadProfilePicture(response.payload.id, image));
                }
            }

            return response;
        }
        catch(e) {
            console.log(e);
            return {
                isSuccess: false,
                message: e.message
            };
        }
    }
}

export function uploadProfilePicture(userId, image) {
    return async (dispatch) => {
        const base64Response = await fetch(image);
        const blob = await base64Response.blob();

        const formData = new FormData();

        formData.append('file', blob);
        formData.append('userId', userId);

        await dispatch(apiPostFormData("user/picture", formData));
    }
}

export function approveUser(userId) {
    return async (dispatch) => {
        try {
            await dispatch(apiPost(`${endpoint}/approve/${userId}`));
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function editUserForm(change) {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_USER_FORM, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function editUser(change) {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_USER, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function validateUserForm(form) {
    if(!form.firstName || form.firstName.length === 0) {
        return false;
    }
    if(!form.lastName || form.lastName.length === 0) {
        return false;
    }
    if(!form.email || form.email.length === 0) {
        return false;
    }
    if(!form.instrument) {
        return false;
    }
    if(!form.password || form.password.length === 0) {
        return false;
    }
    if(form.password !== form.passwordConfirm) {
        return false;
    }
    return true;
}