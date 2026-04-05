import { EDIT_EVENT, SET_EVENT, SET_EVENTS } from "../actions/calendar"

const defaultState = {
    event:  {
        title: "",
        invites: []
    },
    events: []
}

const reducer =  (state = defaultState, action) => {
    switch(action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: action.events
            }
        case SET_EVENT:
            return {
                ...state,
                event: action.event
            }
        case EDIT_EVENT:
            return {
                ...state,
                event: {
                    ...state.event,
                    ...action.change
                }
            }
        default: 
            return state;
    }
}

export default reducer;