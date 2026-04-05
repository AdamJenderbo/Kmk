import { apiGet, apiPost } from "../actions/net";

export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

export function loadNotifications() {
    return async (dispatch, getState) => {
        try {
            const {user: {user}} = getState();

            const response = await dispatch(apiGet(`notification/${user.id}`));

            console.log(response);

            dispatch({ type: SET_NOTIFICATIONS, notifications: response.payload });

            return response.payload ;
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function loadNotification(notificaitonId) {
    return async (dispatch) => {
        try {
            const notification = await dispatch(apiGet(`notification/${notificaitonId}`));

            dispatch({ type: SET_NOTIFICATION, notification });
            }
        catch(e) {
            console.log(e);
        }
    }
}

export function readNotifications(notificationIds) {
    return async (dispatch, getState) => {
        try {
            const {user: {user}} = getState();

            const response = await dispatch(apiPost(`notification/read`, {notificationIds, userId: user.id}));

            if(response.isSuccess) {
                console.log("Läste notifikationer")
            }
            else {
                console.log(response.message);
            }
        }
        catch(e) {
            console.log(e);
        }
    }
}