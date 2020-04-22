export const mainReducer = (state, action) => {
    switch (action.type) {
        case "changeCount":
            return {
                ...state,
                count: action.newCount
            };
        case "changeUser":
            return {
                ...state,
                user: action.newUser
            };
        case "sendMessage":
            return {
                ...state,
                message: action.newMessage
            }
        default:
            return state;
    }
};