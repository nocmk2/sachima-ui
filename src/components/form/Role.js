import React from 'react'
import TextField from '@material-ui/core/TextField';

const Role = () => {
    return (
        <>
            <TextField
                margin="normal"
                id="id"
                label={'角色编号'}
                type="text"
                fullWidth
            // variant="outlined"
            />
            <TextField
                margin="normal"
                id="name"
                label={'角色名称'}
                type="text"
                fullWidth
            // variant="outlined"
            />
        </>
    )
}

export default Role