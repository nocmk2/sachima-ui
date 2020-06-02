import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';

const User = ({ initData, onChange }) => {

    const [user, setUser] = useState(initData)

    const changeID = e => {
        setUser({ ...user, id: e.target.value })
    }

    const changeName = e => {
        setUser({ ...user, name: e.target.value })
    }

    const changePassword = e => {
        setUser({ ...user, password: e.target.value })
    }

    const changePasswordAgain = e => {
        setUser({ ...user, passwordAgain: e.target.value })
    }

    const changeEmail = e => {
        setUser({ ...user, email: e.target.value })
    }

    return (
        <>
            <TextField
                margin="normal"
                id="id"
                label={'用户编号'}
                type="text"
                fullWidth
                value={user.id}
                onChange={changeID}
            />
            <TextField
                margin="normal"
                id="name"
                label={'用户名称'}
                type="text"
                fullWidth
                value={user.name}
                onChange={changeName}
            />
            <TextField
                margin="normal"
                id="password"
                label={'密码'}
                type="password"
                fullWidth
                value={user.password}
                onChange={changePassword}
            />
            <TextField
                margin="normal"
                id="passwordAgain"
                label={'确认密码'}
                type="password"
                value={user.passwordAgain}
                fullWidth
                onChange={changePasswordAgain}
            />
            <TextField
                margin="normal"
                id="email"
                label={'邮箱'}
                type="text"
                value={user.email}
                fullWidth
                onChange={changeEmail}
            />
        </>
    )
}

export default User