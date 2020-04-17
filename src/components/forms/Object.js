import React from 'react'
import TextField from '@material-ui/core/TextField';

const Object = () => {
    return (
        <>
            <TextField
                margin="normal"
                id="id"
                label={'权限编号'}
                type="text"
                fullWidth
            // variant="outlined"
            />
            <TextField
                margin="normal"
                id="name"
                label={'权限名称'}
                type="text"
                fullWidth
            // variant="outlined"
            />
        </>
    )
}

export default Object