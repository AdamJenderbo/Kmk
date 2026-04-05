import { apiGet, apiPost } from "./net";

export const SET_ALBUMS = "SET_ALBUMS"
export const SET_ALBUM = "SET_ALBUM"

export function getAlbums() {
    return async (dispatch) => {
        try {        
            const albums = await dispatch(apiGet("album"));

            dispatch({type: SET_ALBUMS, albums});
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function getAlbum(id) {
    return async (dispatch) => {
        try {        
            const album = await dispatch(apiGet(`album/${id}`));

            console.log(album)

            dispatch({type: SET_ALBUM, album});
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function createAlbum(request) {

    console.log(request);
    return async (dispatch) => {
        try {        
            const album = await dispatch(apiPost("album", request));

            dispatch({type: SET_ALBUM, album});
        }
        catch(e) {
            console.log(e);
        }
    }
}