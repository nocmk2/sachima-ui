import { mock_g_userrole, mock_objects, mock_p_roleobjectaction, mock_roles, mock_users } from '../mock/data';
// import { useDataApi } from './api'
import axios from "axios"

const fetchUsers = async () => {
    // return mock_users
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getusers',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}
const fetchRoles = async () => {
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getroles',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}
const fetchObjects = async () => {
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getobjects',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}
const fetchUserRole = async () => {
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getuserrole',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}
const fetchRoleObjectAction = async () => {
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getroleobject',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}

function fetchData() {
    return Promise.all([fetchUsers(), fetchRoles(), fetchObjects(), fetchUserRole(), fetchRoleObjectAction()])
        .then(([users, roles, objects, userrole, roleobjectaction]) => ({ users, roles, objects, userrole, roleobjectaction }))
}

export const promise = fetchData()