export function toggleReducer(state = {}, action) {
    switch (action.type) {
        case "Toggle":
            return {
                ...state,
                val: action.payload
            };
        default:
            return state;
    }
}