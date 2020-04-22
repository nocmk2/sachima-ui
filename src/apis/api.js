import { useStateValue } from "../utils/state"
import { useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
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

export const useReadApi = (initialURL, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialURL);
    const [isLoading, setIsLoading] = useState(false);
    const [{ sachima }, dispatch] = useStateValue();
    const history = useHistory();

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` } })
            history.push("/login")
        }
        // return error;
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await axios({
                    method: "GET",
                    url: url,
                    headers: { Authorization: "Bearer " + localStorage.token }
                });
                setData(result.data);
                // console.log(result.data)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url]);

    // console.log("--------api called--------")
    // console.log(data)
    return [{ data, isLoading }, setUrl]

}


export const useWriteApi = (initialURL, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialURL);
    const [isLoading, setIsLoading] = useState(false);
    const [{ sachima }, dispatch] = useStateValue();
    const history = useHistory();

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` } })
            history.push("/login")
        }
        // return error;
    });

    const setter = payload => {
        const result = axios({
            method: "POST",
            url: url,
            headers: { Authorization: "Bearer " + localStorage.token },
            data: payload
        });
        return result
    }

    // useEffect(() => {
    //     const writeData = async () => {
    //         setIsLoading(true);
    //         try {
    //             const result = await axios({
    //                 method: "POST",
    //                 url: url,
    //                 headers: { Authorization: "Bearer " + localStorage.token },
    //                 data: payload
    //             });
    //             setData(result.data);
    //             // console.log(result.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //         setIsLoading(false);
    //     };
    //     writeData();
    // }, [url]);

    // console.log("--------api called--------")
    // console.log(data)
    return [{ setter, data, isLoading }, setUrl]

}

