export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_RULE":
            // TODO: maybe i should use immer
            return { ...state, rules: [...state.rules, action.payload] }
        default:
            return state
    }

}