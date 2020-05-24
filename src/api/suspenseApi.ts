import axios from "axios"
// import { useHistory } from "react-router-dom"
import { getUsers, getRoles, getObjects, getUserRole, getRoleObjectAction } from './api'

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` } })
        // history.push("/login")
        // alert('你没有权限！')
        console.log(401401401)
    }
    return Promise.resolve(error);
});

export function fetchProfileData() {
    // const history = useHistory()
    let usersPromise = getUsers();
    let rolesPromise = getRoles();
    let objectsPromise = getObjects();
    let userRolePromise = getUserRole();
    let roleObjectPromise = getRoleObjectAction();
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
const wrapPromise = (promise: Promise<any>) => {
    let status = "pending";
    let result: any;
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
                throw suspender
                // console.log('throw error in suspense wraper')
                // throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}
