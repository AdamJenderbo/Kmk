import { ADD_PART, CLEAR_ARRANGEMENT, EDIT_ARRANGEMENT, EDIT_PART, SET_ARRANGEMENT, SET_ARRANGEMENTS } from "../actions/arrangement";

const defaultState = {
    arrangements: [],
    arrangement: {
        serialNumber: 0,
        title: "",
        composer: "",
        arranger: "",
        parts: []
    }

}

const reducer =  (state = defaultState, action) => {
    switch(action.type) {
        case SET_ARRANGEMENTS:
            return {
                ...state,
                arrangements: action.arrangements
            }
        case CLEAR_ARRANGEMENT:
            console.log("do clear")
            return {
                ...state,
                arrangement: {
                    dirty: false,
                    serialNumber: 0,
                    title: "",
                    composer: "",
                    arranger: ""
                }
            };
        case SET_ARRANGEMENT:
            return {
                ...state,
                arrangement: action.arrangement
            }
        case EDIT_ARRANGEMENT:
            return {
                ...state,
                arrangement: {
                    ...state.arrangement,
                    ...action.change,
                    dirty: true
                }
            }
        case ADD_PART:
            console.log(action.part)
            return {
                ...state,
                arrangement: {
                    ...state.arrangement,
                    parts: [...state.arrangement.parts, action.part],
                    dirty: true
                }
            }

        case EDIT_PART:
            const parts = state.arrangement.parts.map(part => {
                if(part === action.change.part) {
                    return {
                        ...part,
                        ...action.change.change
                    };
                } else {
                    return part;
                }
            });

            return {
                ...state,
                arrangement: {
                    ...state.arrangement,
                    parts: parts,
                    dirty: true
                }
            };
            

    
        default: 
            return state;
    }
}

export default reducer;