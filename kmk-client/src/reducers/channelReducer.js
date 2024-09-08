import { ADD_MESSAGE, SET_CHANNEL, SET_CHANNELS, SET_MESSAGES } from "../actions/channel";


const defaultState = {
    channels: [],
    channel: {
        name: "",
        posts: []
    },
    messages: []
}

const reducer =  (state = defaultState, action) => {
    switch(action.type) {
        case SET_CHANNEL:
            return {
                ...state,
                channel: action.channel
            }
        case SET_CHANNELS:
            return {
                ...state,
                channels: action.channels
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }

        default: 
            return state;
    }
}

export default reducer;