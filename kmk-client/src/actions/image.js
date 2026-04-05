import { apiGet, apiPostFormData } from "./net";

export function uploadImage(albumId, image) {
    return async (dispatch) => {
        try {     
            const form = new FormData();

            form.append('file', image);
            form.append('albumId', albumId);

            await dispatch(apiPostFormData("image/upload", form));
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function getImage(imageId) {
    return async (dispatch) => {
        try {
            const image = await dispatch(apiGet(`image/${imageId}`));

            return image;
        }
        catch(e) {

        }
    }
}