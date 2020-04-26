
import React, { useMemo, useContext } from "react";
// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
// import Chip from '@material-ui/core/Chip'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SmallChips from './SmallChips'
import User from '../forms/User'
import Role from '../forms/Role'
import Object from '../forms/Object'
// import { green, purple } from '@material-ui/core/colors';
import axios from "axios"

import { ctx } from './Configs';

// const ColorChip = withStyles((theme) => ({
//     root: {
//         color: theme.palette.getContrastText(purple[500]),
//         backgroundColor: purple[500],
//         '&:hover': {
//             backgroundColor: purple[700],
//         },
//     },
// }))(Chip);

// const handleClose = () => {
// }

const handleCancel = () => { }

// const handleSubscribe = () => {
// }

const Cal = (type, data) => {
    const users = data.users.map(o => ({ ...o, type: 'user' }))
    const roles = data.roles.map(o => ({ ...o, type: 'role' }))
    const objects = data.objects.map(o => ({ ...o, type: 'object' }))

    if (type === 'user') {
        // should render data.role
        return {
            title: '用户',
            recommend: users,
            datashouldrender: roles,
            form: dt => <User data={dt} />
        }
    } else if (type === 'role') {
        // should render data.user and data.object
        return {
            title: '角色',
            recommend: roles,
            datashouldrender: [...users, ...objects],
            form: dt => <Role data={dt} />
        }
    } else if (type === 'object') {
        // should render data.role
        return {
            title: '权限',
            recommend: objects,
            datashouldrender: roles,
            form: dt => <Object data={dt} />
        }
    }
}

const Now = () => {
    return Math.floor(Date.now() / 1000)
}

const RBACDialog = ({ open, close, type, data, id }) => {
    const { sachima, notifier } = useContext(ctx)
    // const 
    const { title, recommend, datashouldrender, form } = useMemo(
        () => Cal(type, data),
        [type, data]
    );

    // const doit = () => {
    //     dispatch({ type: "DRAWLINE" })
    // }
    const submit = async () => {
        // dispatch({ type: 'ADD_USER', payload: { id: '12345', name: 'Jerry' } })
        await axios({
            method: "POST",
            url: `${sachima.url}/sachima/adduser`,
            headers: { Authorization: "Bearer " + localStorage.token },
            data: sachima.newPayLoad
            // {
            //     "username": "admin980000yy",
            //     "password": "1234561",
            //     "email": "admin@sachima.com",
            //     "firstname": "管理员yyy",
            //     "lastname": "管理员yyy"
            // }
        }).then(response => {
            // console.log(response)
            if (response.status === 200)
                notifier.getUsers(`${sachima.url}/sachima/getusers?time=${Now()}`)
        })
    }

    return (
        <Dialog maxWidth={'lg'} fullWidth open={open} onClose={close}  >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent dividers={true}>
                {/* <Button color='secondary' variant='contained' onClick={doit} >{hei}</Button> */}
                <SmallChips data={recommend} />
                {/* <DialogContentText>
                    input {type} info
                </DialogContentText> */}
                {form({ id: 123, name: '达啦崩吧' })}
                <SmallChips data={datashouldrender} />
                {/* <RecommendChips data={recommend} /> */}
            </DialogContent>
            {/* <DialogTitle id="form-dialog-title">{title}</DialogTitle> */}
            <DialogActions>
                <Button onClick={handleCancel} > 取 消 </Button>
                <Button variant="contained" color="primary" onClick={submit}> 提 交 </Button>
            </DialogActions>
        </Dialog >
    )
}
export default RBACDialog