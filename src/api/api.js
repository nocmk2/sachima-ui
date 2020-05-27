import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios"
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

// var OPTIONS = {}

// Object.defineProperty(OPTIONS, "headers", {
//     get: function () {
//         return { Authorization: "Bearer " + localStorage.token }
//     }
// })

// function getToken(callback) {
//     let token = localStorage.token
//     callback(token)
// }


// const OPTIONS = {
//     headers: { Authorization: "Bearer " + getToken(token => token) }
// }

const OPTIONS = () => {
    return {
        headers: { Authorization: "Bearer " + localStorage.token }
    }
}

// console.log(Object.keys(OPTIONS))

export const getRuleLists = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/rules`
    const ruleListsResponse = await axios.get(url, OPTIONS());
    return ruleListsResponse.data
}

export const getRule = async (name, version) => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/rule/${name}/${version}`
    const rule = await axios.get(url, OPTIONS());
    const ruleJSON = JSON.parse(rule.data.rule)
    return {
        name: rule.data.name,
        version: rule.data.version,
        comment: rule.data.comment,
        rule: ruleJSON
    }
}

export const getUsers = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getusers`
    const result = await axios.get(url, OPTIONS());
    return result.data
}

export const getRoles = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getroles`
    const result = await axios.get(url, OPTIONS());
    return result.data
}

/**
 * 权限对象 
 */
export const getObjects = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getobjects`
    const result = await axios.get(url, OPTIONS());
    return result.data
}

export const getUserRole = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getuserrole`
    const result = await axios.get(url, OPTIONS());
    return result.data
}

/**
 * roleobject关系中分为write和read两种action，读写权限分离
 */
export const getRoleObjectAction = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getroleobject`
    const result = await axios.get(url, OPTIONS());
    return result.data
}



/**
 * 随机增加 用户/角色/权限 测试
 *  
 */
export const addRandom = async (name) => {
    const randomNum = Math.floor(Math.random() * 1000) + 1
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/adduser`
    const response = await axios({
        ...OPTIONS, //headers
        method: 'POST',
        url: url,
        data: {
            "username": name + randomNum,
            "password": "1234567",
            "email": "admin@sachima.com",
            "firstname": "新增用户" + randomNum,
            "lastname": "新增用户" + randomNum
        }
    })
    return response
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
                console.log('throw error in suspense wraper')
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}




// { users: null, roles: null, objects: null, userrole: null, roleobject: null }
// const initialState = { count: 0 };

// const reducer = (state: ProfileDataType, action: any) => {
//     switch (action.type) {
//         case 'refresh':
//             return { count: state. + 1 };
//         default:
//             throw new Error();
//     }
// }

export const useFetchProfileData = () => {
    // const [state, dispatch] = useReducer(reducer, null)
    const [count, setCount] = useState(0)
    const [data, setData] = useState(null)

    const refresher = () => {
        setCount(prev => prev + 1)
    }

    useInterceptor()
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])


    useEffect(() => {
        // let mounted = true
        // if (mounted) {
        const users = wrapPromise(getUsers());
        const roles = wrapPromise(getRoles());
        const objects = wrapPromise(getObjects());
        const userRole = wrapPromise(getUserRole());
        const roleObject = wrapPromise(getRoleObjectAction());
        setData({ users, roles, objects, userRole, roleObject })
        // } else {
        //     setData(null)
        // }

        return () => {
            // mounted = false
        }
    }, [count])

    //TODO: return [data, refresher]
    return [data, refresher, count]
}


// 过度抽象？
// interface DataType {
//     [key: string]: SuspenseReader
// }
export const useImpromptu = (imps) => {
    const [data, setData] = useState(null)

    useInterceptor()

    useEffect(() => {
        imps.forEach(imp => {
            wrapPromise(imp())
        })

    }, [])




}

