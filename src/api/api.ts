import React, { useState, useEffect } from 'react'
import axios from "axios"
import { RuleSummary, RuleWithSummary, RuleRaw, User, Role, Object, UserRole, RoleObjectAction } from 'types/types'
import { useInterceptor } from "utils/tools"
// import { useStateValue } from "../utils/state"
// import { useHistory } from "react-router-dom"

// axios.interceptors.response.use(response => {
//     return response;
// }, error => {
//     if (error.response.status === 401) {
//         dispatch({
//             type: "sendMessage",
//             newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` }
//         })
//         history.push("/login")
//     }
//     // return error;
// });

const OPTIONS = {
    headers: { Authorization: "Bearer " + localStorage.token }
}

export const getRuleLists = async (): Promise<RuleSummary[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/rules`
    const ruleListsResponse = await axios.get<RuleSummary[]>(url, OPTIONS);
    return ruleListsResponse.data
}

export const getRule = async (name: string, version: string): Promise<RuleWithSummary> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/rule/${name}/${version}`
    const rule = await axios.get<RuleRaw>(url, OPTIONS);
    const ruleJSON = JSON.parse(rule.data.rule)
    return {
        name: rule.data.name,
        version: rule.data.version,
        comment: rule.data.comment,
        rule: ruleJSON
    }
}

export const getUsers = async (): Promise<User[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getusers`
    const result = await axios.get(url, OPTIONS);
    return result.data
}

export const getRoles = async (): Promise<Role[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getroles`
    const result = await axios.get(url, OPTIONS);
    return result.data
}

/**
 * 权限对象 
 */
export const getObjects = async (): Promise<Object[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getobjects`
    const result = await axios.get(url, OPTIONS);
    return result.data
}

export const getUserRole = async (): Promise<UserRole[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getuserrole`
    const result = await axios.get(url, OPTIONS);
    return result.data
}

/**
 * roleobject关系中分为write和read两种action，读写权限分离
 */
export const getRoleObjectAction = async (): Promise<RoleObjectAction[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getroleobject`
    const result = await axios.get(url, OPTIONS);
    return result.data
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
                console.log('throw error in suspense wraper')
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

// interface DataResult {
//     users: Promise<User[]> | null,
//     roles: Promise<Role[]> | null,
//     objects: Promise<Object[]> | null,
//     userrole: Promise<UserRole[]> | null,
//     roleobject: Promise<RoleObjectAction[]> | null
// }
// { users: null, roles: null, objects: null, userrole: null, roleobject: null }
export const useFetchProfileData = () => {
    const [data, setData] = useState<object | null>(null)

    useInterceptor()

    useEffect(() => {
        const users = wrapPromise(getUsers());
        const roles = wrapPromise(getRoles());
        const objects = wrapPromise(getObjects());
        const userRole = wrapPromise(getUserRole());
        const roleObject = wrapPromise(getRoleObjectAction());
        setData({ users, roles, objects, userRole, roleObject })
    }, [])

    return data
}
