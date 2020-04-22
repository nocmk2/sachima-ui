import axios from "axios"

// axios.interceptors.response.use(response => {
//     return response;
// }, error => {
//     if (error.response.status === 401) {
//         // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` } })
//         // history.push("/login")
//         console.log(401401401)
//     }
//     return Promise.resolve(error);
// });

export function fetchProfileData() {
    let usersPromise = fetchUsers();
    let rolesPromise = fetchRoles();
    let objectsPromise = fetchObjects();
    let userRolePromise = fetchUserRole();
    let roleObjectPromise = fetchRoleObjectAction();
    return {
        users: wrapPromise(usersPromise),
        roles: wrapPromise(rolesPromise),
        objects: wrapPromise(objectsPromise),
        userrole: wrapPromise(userRolePromise),
        roleobject: wrapPromise(roleObjectPromise)
    };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
const wrapPromise = (promise) => {
    let status = "pending";
    let result;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}


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