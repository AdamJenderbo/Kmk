import { apiGet, apiPost } from "./net";


export const SET_CHANNELS = "SET_CHANNELS";

export const SET_CHANNEL = "SET_CHANNEL";


export function loadChannels() {
    return async (dispatch, getState) => {
        try {
            const state = getState();

            const channels = await dispatch(apiGet(`channel/my/${state.user.user.id}`));

            dispatch({ type: SET_CHANNELS, channels });

            return channels;
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function loadChannel(channelId) {
    return async (dispatch) => {
        try {
            const channel = await dispatch(apiGet(`channel/${channelId}`));

            dispatch({ type: SET_CHANNEL, channel });
            dispatch({ type: SET_MESSAGES, messages: channel.posts });

            return channel;
            }
        catch(e) {
            console.log(e);
        }
    }
}

export function loadMessages(channelId) {
    return async (dispatch) => {
        try {
            const messages = await dispatch(apiGet(`channel/message/get/${channelId}`));

            dispatch({ type: SET_CHANNEL, channel: {messages}});
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function sendMessage(channel, user, message) {
    return async (dispatch) => {
        try {

            await dispatch(apiPost(`channel/send`, {
                channelId: channel.id, 
                userId: user.id, 
                message
            }));

            const reloadedChannel = await dispatch(apiGet(`channel/${channel.id}`));

            dispatch({ type: SET_CHANNEL, channel: reloadedChannel });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export const SET_MESSAGES = "SET_MESSAGES";

export function setMessages(messages) {
    return  async (dispatch) => {
        dispatch({ type: SET_MESSAGES, messages });
    }
}

export const ADD_MESSAGE = "ADD_MESSAGE";

export function addMessage(message) {
    return  async (dispatch) => {
        dispatch({ type: ADD_MESSAGE, message });
    }
}