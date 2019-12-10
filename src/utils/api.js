import { useStateValue } from "../utils/state"
import axios from "axios"

const url = `http://localhost:8000/sachima/role`
const signal = axios.CancelToken.source();

export const getUserStatus = function () {
    console.log("getUserStatus")
    const fetchData = async () => {
        try {
            console.log("-------------")
            const result = await axios({
                method: "GET",
                url: url,
                headers: { Authorization: "Bearer " + localStorage.token }
            }, { cancelToken: signal.token });
            console.log(result.data);
            // console.log(result.data.text);
            // setData(result.data.userName);
            console.log(result.data.userName);
        } catch (error) {
            console.log(error)
            if (axios.isCancel(error)) {
                console.log('Error: ', error.message); // => prints: Api is being canceled
            } else {
                // setIsLoading(false);
                console.log("else....")
            }
            // if (error.response.status === 401) {
            //   dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "您没有权限,请登陆" } })
            // }
            return error
        }
    };
    fetchData();
}

export const clearUserStatus = function () {
    console.log("clearUser")
}


