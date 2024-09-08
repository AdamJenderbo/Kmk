import { apiGet, apiPost } from "./net";


export const claimOptions = [{
    value: 0,
    text: "Arrangemang (läs)",
}, {
    value: 1,
    text: "Arrangemang (skriv)",
}, {
    value: 2,
    text: "Användare (läs)",
}, {
    value: 3,
    text: "Användare (skriv)",
}, {
    value: 4,
    text: "Roller (läs)",
}, {
    value: 5,
    text: "Roller (skriv)",
}]

export const SET_ROLES = "SET_ROLES";
export const SET_ROLE = "SET_ROLE";
export const EDIT_ROLE = "EDIT_ROLE";
export const ADD_ROLE_CLAIM = "ADD_ROLE_CLAIM";
export const EDIT_ROLE_CLAIM = "EDIT_ROLE_CLAIM";
export const SET_INHEIRITED_CLAIMS = "SET_INHEIRITED_CLAIMS";

export function loadRoles() {
    return async (dispatch) => {
        try {
            const roles = await apiGet("role");

            dispatch({ type: SET_ROLES, roles });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function loadRole(id) {
    return async (dispatch) => {
        try {
            const role = await apiGet(`role/${id}`);

            dispatch({ type: SET_ROLE, role });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function createRole() {
    return async (_, getState) => {
        try {
            const {role: {role}} = getState();

            await apiPost("role/create", role);
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function saveRole() {
    return async (_, getState) => {
        try {
            const {role: {role}} = getState();

            const request = {
                id: role.id,
                name: role.name,
                parentId: role.id.parentId,
                claims: role.claims.map(x => x.claim)
            }

            await apiPost(`role/save`, request);
            
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function editRole(change) {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ROLE, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function addClaim() {
    return async (dispatch) => {
        try {
            dispatch({ type: ADD_ROLE_CLAIM, claim: { claim: 0 } });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function editClaim(change) {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ROLE_CLAIM, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}


export function loadInheiritedClaims(id) {
    return async (dispatch) => {
        try {
            const inheiritedClaims = await apiGet(`role/inheirited/${id}`);

            dispatch({ type: SET_INHEIRITED_CLAIMS, inheiritedClaims });
        }
        catch(e) {
            console.log(e);
        }
    }
}