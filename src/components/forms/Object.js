import React from 'react'
import TextField from '@material-ui/core/TextField';

const Object = ({ data }) => {
    return (
        <>
            {JSON.stringify(data)}
            <TextField
                margin="normal"
                id="id"
                label={'权限编号'}
                type="text"
                fullWidth
                value={data.id}
            // variant="outlined"
            />
            <TextField
                margin="normal"
                id="name"
                label={'权限名称'}
                type="text"
                fullWidth
                value={data.name}
            // variant="outlined"
            />
        </>
    )
}

export default Object