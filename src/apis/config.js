import React, { useEffect } from 'react'
import axios from "axios"
import { useStateValue } from "../utils/state"
import { useHistory } from "react-router-dom"


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

const useData = () => {
    const [{ sachima }, dispatch] = useStateValue();
    const history = useHistory();

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` } })
            history.push("/login")
        }
        return Promise.reject(error);
    });

    return Promise.all([fetchUsers(), fetchRoles(), fetchObjects(), fetchUserRole(), fetchRoleObjectAction()])
        .then(([users, roles, objects, userrole, roleobjectaction]) => ({ users, roles, objects, userrole, roleobjectaction }))
}

export default useData