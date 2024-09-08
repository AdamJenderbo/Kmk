import { apiGet } from "./net";

export const SET_NOTIFICATION = "SET_EVENT";
export const SET_NOTIFICATIONS = "SET_EVENTS";

export function loadNotifications() {
    return async (dispatch) => {
        try {
            const notifications = await dispatch(apiGet("notification"));

            console.log(notifications)

            dispatch({ type: SET_NOTIFICATIONS, notifications });

            return notifications;
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