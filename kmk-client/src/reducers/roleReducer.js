import { ADD_ROLE_CLAIM, EDIT_ROLE, EDIT_ROLE_CLAIM, SET_INHEIRITED_CLAIMS, SET_ROLE, SET_ROLES } from "../actions/role";

const defaultState = {
    inheiritedClaims: [],
    roles: [],
    role: {
        dirty: false,
        name: "",
        claims: [],
        parent: {
            id: 0
        }
    }
}

const reducer =  (state = defaultState, action) => {
    switch(action.type) {
        case SET_ROLES:
            return {
                ...state,
                roles: action.roles
            }
        case SET_ROLE:
            return {
                ...state,
                role: action.role
            }
        case EDIT_ROLE:
            return {
                ...state,
                role: {
                    ...state.role,
                    ...action.change,
                    dirty: true
                }
            }
        case ADD_ROLE_CLAIM:
            return {
                ...state,
                role: {
                    ...state.role,
                    claims: [...state.role.claims, action.claim],
                    dirty: true
                }
        }
        case EDIT_ROLE_CLAIM:
            const claims = state.role.claims.map(row => {
                if(row.claim === action.change.row.claim) {
                    return {
                        ...row,
                        ...action.change.change
                    }
                } else {
                    return row
                }
            });

        return {
            ...state,
            role: {
                ...state.role,
                claims,
                dirty: true
            }
        }
        case SET_INHEIRITED_CLAIMS:
            return {
                ...state,
                inheiritedClaims: action.inheiritedClaims
            }
        default: 
            return state;
    }
}

export default reducer;