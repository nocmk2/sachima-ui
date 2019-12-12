import { useStateValue } from "../utils/state"
import { useState, useEffect } from "react";
import axios from "axios"


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

export const useDataApi = (initialURL, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialURL);
    const [isLoading, setIsLoading] = useState(false);
    const [{ sachima }, dispatch] = useStateValue();

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` } })
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
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url]);

    return [{ data, isLoading }, setUrl]

}


