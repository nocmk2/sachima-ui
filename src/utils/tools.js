import axios from "axios"
import { useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { useStateValue } from "utils/state"

export const useDidUpdateEffect = (fn, inputs) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current)
            fn();
        else
            didMountRef.current = true;
    }, inputs);
}

export const useInterceptor = () => {
    const [{ sachima }, dispatch] = useStateValue();
    const history = useHistory();
    useEffect(() => {
        return () => {
        }
    }, [])
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
        return Promise.reject(error)
    });

}