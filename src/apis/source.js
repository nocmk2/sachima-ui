import axios from "axios"

export const fetchUsers = async () => {
    // return mock_users
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getusers',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}
export const fetchRoles = async () => {
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getroles',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}
export const fetchObjects = async () => {
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getobjects',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}
export const fetchUserRole = async () => {
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getuserrole',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}
export const fetchRoleObjectAction = async () => {
    const result = await axios({
        method: "GET",
        url: 'http://localhost:8000/sachima/getroleobject',
        headers: { Authorization: "Bearer " + localStorage.token }
    });
    return result.data
}