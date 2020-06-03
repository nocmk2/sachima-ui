import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';

const Role = ({ initData, onChange }) => {

    const [role, setRole] = useState(initData)

    const changeID = e => {
        setRole({ ...role, id: e.target.value })
    }

    const changeName = e => {
        setRole({ ...role, name: e.target.value })
    }

    return (
        <>
            <TextField
                margin="normal"
                id="id"
                label={'角色编号'}
                type="text"
                value={role.id}
                fullWidth
                onChange={changeID}
            />
            <TextField
                margin="normal"
                id="name"
                label={'角色名称'}
                type="text"
                value={role.name}
                fullWidth
                onChange={changeName}
            />
        </>
    )
}

export default Role