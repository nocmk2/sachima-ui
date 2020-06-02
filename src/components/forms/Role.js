import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';

const Role = ({ initData, onChange }) => {

    const [role, setRole] = useState(initData)

    return (
        <>
            <TextField
                margin="normal"
                id="id"
                label={'角色编号'}
                type="text"
                value={role.id}
                fullWidth
            />
            <TextField
                margin="normal"
                id="name"
                label={'角色名称'}
                type="text"
                value={role.name}
                fullWidth
            />
        </>
    )
}

export default Role