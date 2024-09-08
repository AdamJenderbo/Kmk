const local = true;

const url =  local ?  "http://localhost:5072/api/" : "https://kmkapi.premiumasp.net/api/";


export function apiGet(route, body) {

    return async (_, getState) => {

        const token = getState().authentication.token;

        const response = await fetch(`${url}${route}/`, {
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

        const response = await fetch(`${url}${route}/`, {
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
}

export async function apiPut(route, body) {
    await fetch(`${url}${route}/`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}


export async function apiDelete(route) {
    await fetch(`${url}${route}/`, {
        method: 'DELETE'
    });
}


export function apiPostFormData(route, form) {

    return async (_, getState) => {

        const token = getState().authentication.token;

        const response = await fetch(`${url}${route}/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: form
        });
        const payload = await response.json();
        return payload;
    }
}
