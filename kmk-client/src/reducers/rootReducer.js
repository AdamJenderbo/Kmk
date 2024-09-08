import { combineReducers } from "redux";
import arrangementReducer from "./arrangementReducer";
import authenticationReducer from "./authenticationReducer";
import userReducer from "./userReducer";
import formReducer from "./formReducer";
import roleReducer from "./roleReducer";
import channelReducer from "./channelReducer";
import calendarReducer from "./calendarReducer";
import notificationReducer from "./notificationReducer";
import albumReducer from "./albumReducer";

export default combineReducers({
    album: albumReducer,
    arrangement: arrangementReducer,
    authentication: authenticationReducer,
    channel: channelReducer,
    calendar: calendarReducer,
    form: formReducer,
    notification: notificationReducer,
    role: roleReducer,
    user: userReducer
})