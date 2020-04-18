import { DrawLineX, DisposeLine, ToggleAnimateRelativeLine } from '../../utils/line'

export const initialState = {
    // refs -> {[userid]: ref}
    refs: {},
    // relation -> [{ start: userid, end: roleid }]
    relation: [],
    users: [{ id: '23ijg5jg', name: 'ekijfejfoj' }, { id: 'mao', name: '猫' }],
    roles: [],
    objects: []
}

export const reducer = (state, action) => {
    const { refs, relation } = state
    if (action.type === "SETREFS") {
        return { ...state, refs: action.payload }
    } else if (action.type === "SETRELATION") {
        return { ...state, relation: action.payload }
    } else if (action.type === "DRAWLINE") {
        DrawLineX(refs, relation)
        return state
    } else if (action.type === "DISPOSELINE") {
        DisposeLine()
        return state
    } else if (action.type === 'ADD_USER') {
        return { ...state, users: [{ id: '1', name: '1' }] }
    } else if (action.type === 'SET_USERS') {
        return { ...state, users: action.payload }
    } else {
        throw new Error(action.type + ': no such action!');
    }
}