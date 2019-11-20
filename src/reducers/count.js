const reducer = (state, action) => {
    switch (action.type) {
        case "changeCount":
            return {
                ...state,
                count: action.newCount
            };
        default:
            return state;
    }
};

export default reducer