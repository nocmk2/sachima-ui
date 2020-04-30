import { useState, useEffect, useReducer } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { useStateValue } from "../utils/state"

// Suspense api example
// import * as source from './source'

// const url = `http://localhost:8000/sachima/role`
// const signal = axios.CancelToken.source();
// export const getUserStatus = function () {
//     const fetchData = async () => {
//         const result = await axios({
//             method: "GET",
//             url: url,
//             headers: { Authorization: "Bearer " + localStorage.token }
//         }, { cancelToken: signal.token });
//     };
//     fetchData();
// }

// export const clearUserStatus = function () {
//     console.log("clearUser")
// }

// export const API = () => source
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            return state
        // throw new Error();
    }
};

export const useReadApi = (initialURL, initialData) => {
    const [url, setUrl] = useState(initialURL);

    // const [data, setData] = useState(initialData);
    // const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        isLoading: false,
        isError: false,
        data: initialData
    })

    const [{ sachima }] = useStateValue();
    const history = useHistory();

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            dispatch({
                type: "sendMessage",
                newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` }
            })
            history.push("/login")
        }
        // return error;
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });

            try {
                const result = await axios({
                    method: "GET",
                    url: url,
                    headers: { Authorization: "Bearer " + localStorage.token }
                });
                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' });
                }
            }
        };
        fetchData();

        return (() => {
            didCancel = true;
        })
    }, [url]);

    return [state, setUrl]
}
