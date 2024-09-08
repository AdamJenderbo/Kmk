import { ADD_ROW, EDIT_FORM, EDIT_ROW, SET_FORM } from "../actions/form";

const defaultState = {
    arrangement: {
        dirty: false,
        title: "",
        composer: "",
        arranger: "",
        parts: []
    },
    role: {
        dirty: false,
        name: "",
        claims: []
    },
    user: {
        dirty: false,
        name: "",
        email: "",
        instrument: 0,
        roles: []
    }
}

const reducer =  (state = defaultState, action) => {
    switch(action.type) {
        // case SET_ROWS:
        //     return {
        //         ...state,
        //         form: {
        //             ...state.form,
        //             [action.source]: {
        //                 ...state.form[action.source],
        //                 [action.property]: action.rows
        //             }
        //         }
        //     }
        case SET_FORM:
            return {
                ...state,
                ...action.source
            }
        case EDIT_FORM:
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    ...action.change,
                    dirty: true
                }
            }
        case ADD_ROW:
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    [action.property]: [...state[action.form][action.table], action.row],
                    dirty: true
                }
        }
        case EDIT_ROW:
            const rows = state[action.form][action.table].map(row => {
                if(row === action.change.row) {
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
            [action.form]: {
                ...state[action.form],
                [action.table]: rows,
                dirty: true
            }
        }      
        default: 
            return state;
    }
}

export default reducer;