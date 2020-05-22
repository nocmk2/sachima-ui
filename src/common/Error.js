import React from 'react'
// import classes from '*.module.css'
// import { useStateValue } from "../utils/state"
// import { useHistory } from "react-router-dom"


const Error = ({ type, mes }) => {
    // const [{ sachima }, dispatch] = useStateValue();
    // const history = useHistory();
    console.log('in Error comp ' + type + mes)

    if (type === '401') {
        // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `您没有权限,请登陆,或联系管理员${sachima.message}` } })
        // history.push("/login")
        console.log('mes=>')
        console.log(mes)
        return <h1>{mes} </h1>
    } else if (type === 'basic') {
        console.log('xxxxxxxxxxxxxxxxxxx')
        // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: `${mes}` } })
        return <h1>{mes}</h1>
    }

    return <div>Error</div>
}

export default Error