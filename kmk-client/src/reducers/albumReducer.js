import { SET_ALBUM, SET_ALBUMS } from "../actions/album";

const defaultState = {
    albums: [],
    album: { 
        images: []
    }
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_ALBUM:
            return {
                ...state,
                album: action.album
            }
        case SET_ALBUMS:
            return {
                ...state,
                albums: action.albums
            }
        default: 
            return state;
    }
}

export default reducer;