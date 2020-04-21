import { DrawLineX, DisposeLine, ToggleAnimateRelativeLine } from '../../utils/line'

const toRelation = (userrole, roleobject) => {
    const u = userrole.map(o => {
        return { start: o.user, end: o.role, type: 'userrole' }
    })

    const r = roleobject.map(o => {
        return { start: o.role, end: o.obj, type: 'roleobject' }
    })

    return [...u, ...r]
}


// const users = resource.users.read()
// const roles = resource.roles.read()
// const objects = resource.objects.read()
// const userrole = resource.userrole.read()
// const roleobject = resource.roleobject.read()

// export const initialState = 

export const reducer = (state, action) => {
    const { refs, relation } = state
    switch (action.type) {
        case "SETREFS":
            return { ...state, refs: action.payload }
        case "SETRELATION":
            return { ...state, relation: toRelation(action.userrole, action.roleobject) }
        case "DRAWLINE":
            DrawLineX(refs, relation)
            return state
        case "DISPOSELINE":
            DisposeLine()
            return state
        case 'ADD_USER':
            return { ...state, users: [...state.users, { id: '1', name: '1' }] }
        case 'SET_USERS':
            return { ...state, users: action.payload }
        case 'SET_ROLES':
            return { ...state, roles: action.payload }
        case 'SET_OBJECTS':
            return { ...state, objects: action.payload }
        case 'SET_USERROLE':
            return { ...state, userrole: action.payload }
        case 'SET_ROLEOBJECT':
            return { ...state, roleobject: action.payload }
        // case 'INIT':
        //     return { ...state, users, roles, objects, userrole, roleobject }
        default:
            return state
    }

}