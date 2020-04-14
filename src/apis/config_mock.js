import { mock_g_userrole, mock_objects, mock_p_roleobjectaction, mock_roles, mock_users } from '../mock/data';

const fetchUsers = () => {
    return mock_users
}
const fetchRoles = () => {
    return mock_roles
}
const fetchObjects = () => {
    return mock_objects
}
const fetchUserRole = () => {
    return mock_g_userrole
}
const fetchRoleObjectAction = () => {
    return mock_p_roleobjectaction
}

function fetchData() {
    return Promise.all([fetchUsers(), fetchRoles(), fetchObjects(), fetchUserRole(), fetchRoleObjectAction()])
        .then(([users, roles, objects, userrole, roleobjectaction]) => ({ users, roles, objects, userrole, roleobjectaction }))
}

export const promise = fetchData()