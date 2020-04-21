import React, { Component } from 'react'
import { useStateValue } from "../utils/state"
import { useHistory } from "react-router-dom"


const Error = ({ type }) => {
    const [{ sachima }, dispatch] = useStateValue();
    const history = useHistory();

    if (type === '401') {
        dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` } })
        history.push("/login")
    }

    return <div>Error</div>
}

export default Error