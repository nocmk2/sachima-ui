export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_RULE":
            const imglength = state.rules.length
            return { ...state, rules: [...state.rules, { title: '评分卡模型x v0.1', img: `tech${imglength}.jpg` }] }
        default:
            return state
    }

}