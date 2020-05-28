import React from 'react'


const Error = ({ type, mes }) => {

    if (type === '401') {
        return <h1>{mes} </h1>
    } else if (type === 'basic') {
        return <h1>{mes}</h1>
    }

    return <div>Error</div>
}

export default Error