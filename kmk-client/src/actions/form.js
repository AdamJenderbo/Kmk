
export const SET_FORM = "SET_FORM";
export const EDIT_FORM = "EDIT_FORM";
export const ADD_ROW = "ADD_ROW";
export const EDIT_ROW = "EDIT_ROW";


export function editForm(form, change) {
    return async (dispatch) => {
        try {

            dispatch({ type: EDIT_FORM, form, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function addRow(source, property, row) {
    return async (dispatch) => {
        try {
            dispatch({ type: ADD_ROW, source, property, row });
        }
        catch(e) {
            console.log(e);
        }
    }
}

export function editRow(form, table, change) {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ROW, form, table, change });
        }
        catch(e) {
            console.log(e);
        }
    }
}