import { DrawLineX, DisposeLine, ToggleAnimateRelativeLine } from '../../utils/line'

export const initialState = {
    // refs -> {[userid]: ref}
    refs: {},
    // relation -> [{ start: userid, end: roleid }]
    relation: [],
    users: [{ id: 'lllll Pvi', name: '初始值' }, { id: 'mao', name: '猫' }],
    roles: [],
    objects: []
}

export const reducer = (state, action) => {
    const { refs, relation } = state
    switch (action.type) {
        case "SETREFS":
            return { ...state, refs: action.payload }
        case "SETRELATION":
            return { ...state, relation: action.payload }
        case "DRAWLINE":
            DrawLineX(refs, relation)
            return state
        case "DISPOSELIN":
            DisposeLine()
            return state
        case 'ADD_USER':
            return { ...state, users: [...state.users, { id: '1', name: '1' }] }
        case 'SET_USERS':
            return { ...state, users: action.payload }
        default:
            return state
    }

}