import { useStateValue } from "../utils/state"
import React, { useState, useEffect } from "react";
import axios from "axios"

const Now = () => {
    return Math.floor(Date.now() / 1000)
}

const url = `http://localhost:8000/sachima/role`
const signal = axios.CancelToken.source();
// const [{ sachima }, dispatch] = useStateValue();

// axios.interceptors.response.use(response => {
//     return response;
// }, error => {
//     if (error.response.status === 401) {
//         //place your reentry code
//         // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "您没有权限,请登陆" } })
//         console.log("401....")
//     }
//     return error;
// });

export const getUserStatus = function () {
    const fetchData = async () => {
        const result = await axios({
            method: "GET",
            url: url,
            headers: { Authorization: "Bearer " + localStorage.token }
        }, { cancelToken: signal.token });
    };
    fetchData();
}

export const clearUserStatus = function () {
    console.log("clearUser")
}

export const useDataApi = () => {
    const [data, setData] = useState("no data");
    const [url, setUrl] = useState("http://localhost:8000/test");
    const [isLoading, setIsLoading] = useState(false);
    const [{ sachima }, dispatch] = useStateValue();
    const [querytime, setQueryTime] = useState(Now());
    const [features, setFeatures] = useState([]);

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            //place your reentry code
            dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "您没有权限,请登陆" } })
        }
        return error;
    });

    // simple get
    useEffect(() => {
        // const abortController = new AbortController()
        // const signal = abortController.signal
        const signal = axios.CancelToken.source();


        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await axios({
                    method: "GET",
                    url: url,
                    headers: { Authorization: "Bearer " + localStorage.token }
                }, { cancelToken: signal.token });
                // console.log(result.data);
                // console.log(result.data.text);
                setData(result.data.text);
                setQueryTime(Now());
                if (url === `${sachima.url}/sachima/featurelists`) {
                    setFeatures(result.data.text)
                }
                setIsLoading(false);
            } catch (error) {

                console.log(error)
                if (axios.isCancel(error)) {
                    console.log('Error: ', error.message); // => prints: Api is being canceled
                } else {
                    setIsLoading(false);
                }
                // if (error.response.status === 401) {
                //   dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "您没有权限,请登陆" } })
                // }
                return error
            }
        };

        fetchData();
        return function cleanup() {
            signal.cancel("Cancelling in cleanup")
        }
        // eslint-disable-next-line
    }, [url, querytime]);

    return [{ data, isLoading, querytime }, setUrl]

}


