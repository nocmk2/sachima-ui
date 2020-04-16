import React from 'react'
import TextField from '@material-ui/core/TextField';

const User = () => {
    return (
        <>
            <TextField
                margin="normal"
                id="id"
                label={'用户编号'}
                type="text"
                fullWidth
            // variant="outlined"
            />
            <TextField
                margin="normal"
                id="name"
                label={'用户名称'}
                type="text"
                fullWidth
            // variant="outlined"
            />
            <TextField
                margin="normal"
                id="name"
                label={'密码'}
                type="password"
                fullWidth
            // variant="outlined"
            />
            <TextField
                margin="normal"
                id="name"
                label={'确认密码'}
                type="password"
                fullWidth
            // variant="outlined"
            />
        </>
    )
}

export default User