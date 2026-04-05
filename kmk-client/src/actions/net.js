const baseUrl =  process.env.REACT_APP_API_URL;

export function apiGet(route, body) {

    return async (_, getState) => {


        console.log(baseUrl);

        const token = getState().authentication.token;

        const response = await fetch(`${baseUrl}${route}/`, {
            method: 'GET',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                    'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const payload = await response.json();
        return payload;
    }
}

export function apiPost(route, body) {

    return async (_, getState) => {

        const token = getState().authentication.token;

        try
        {
            const response = await fetch(`${baseUrl}${route}/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const payload = await response.json();

            return payload;
        }
        catch(e)
        {
            return {
                isSuccess: false,
                message: "Nätverksfel"
            }
        }
    }
}

export async function apiPut(route, body) {
    await fetch(`${baseUrl}${route}/`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}


export async function apiDelete(route) {
    await fetch(`${baseUrl}${route}/`, {
        method: 'DELETE'
    });
}


export function apiPostFormData(route, form) {

    return async (_, getState) => {

        const token = getState().authentication.token;

        await fetch(`${baseUrl}${route}/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: form
        });
    }
}

export function download(fileId) {
    window.location.href = `${baseUrl}arrangement/download/${fileId}`;
};

// export function uploadFile(file) {
//     return async (dispatch) => {
//         const formData = new FormData();
//         formData.append("file", file); // IMPORTANT: name must be "file"

//         try {
//             const response = await fetch("https://yourapi.com/upload", {
//                 method: "POST",
//                 body: formData, // DO NOT set Content-Type
//             });

//             const fileId = await response.json();
//             console.log("Uploaded. FileId:", fileId);
//         } 
//         catch (err) {
//             console.error(err);
//         }
//     }
// }