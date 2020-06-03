import React, { useMemo, useContext, useState } from "react";
// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
// import Chip from '@material-ui/core/Chip'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SmallChips from './SmallChips'
import User from 'components/forms/User'
import Role from 'components/forms/Role'
import Authority from 'components/forms/Authority'
// import { green, purple } from '@material-ui/core/colors';
// import axios from "axios"

import { addRandom, addUser } from 'api/api'

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


// const handleSubscribe = () => {
// }

const MOCK_NEW_USER = {
    id: 12345,
    name: "new User",
    password: "12345566",
    passwordAgain: "12345566",
    email: "eif@gmail.com"
}

const MOCK_NEW_ROLE = {
    id: 34545,
    name: '角色13xxxys'
}

const MOCK_NEW_AUTHORITY = {
    id: 8745775,
    name: '权限897897487577'
}


const Cal = (type, data) => {
    const users = data.users.map(o => ({ ...o, type: 'user' }))
    const roles = data.roles.map(o => ({ ...o, type: 'role' }))
    const objects = data.objects.map(o => ({ ...o, type: 'object' }))

    let formData = {}

    const changeUserForm = data => {
        alert('user changed' + data)
    }

    const changeRoleForm = data => {
        alert('role changed' + data)
    }

    const changeAuthorityForm = data => {
        alert('Authority changed' + data)
    }

    if (type === 'user') {
        // should render data.role
        return {
            title: '用户',
            currentList: users,
            relationList: roles,
            form: <User initData={MOCK_NEW_USER} onChange={changeUserForm} />
        }
    } else if (type === 'role') {
        // should render data.user and data.object
        return {
            title: '角色',
            currentList: roles,
            relationList: [...users, ...objects],
            form: <Role initData={MOCK_NEW_ROLE} onChange={changeRoleForm} />
        }
    } else if (type === 'object') {
        // should render data.role
        return {
            title: '权限',
            currentList: objects,
            relationList: roles,
            form: <Authority initData={MOCK_NEW_AUTHORITY} onChange={changeAuthorityForm} />
        }
    }
}

// const Now = () => {
//     return Math.floor(Date.now() / 1000)
// }

const RBACDialog = ({ open, close, type, data, id }) => {
    const { sachima, notifier } = useContext(ctx)
    // const 
    const { title, currentList, relationList, url, form } = useMemo(() => Cal(type, data),
        [type, data]
    );

    const [titleid, setTitleID] = useState(id)

    const handleCancel = () => {
        setTitleID(null)
        close()
    }
    const submit = async () =>
        addUser().then(res => {
            if (res.status === 200) {
                notifier.refresher()
            }
        })
    // addRandom('xman')
    //     .then(response => {
    //         if (response.status === 200)
    //             notifier.refresher()
    //     })


    return (
        <Dialog maxWidth={'lg'} fullWidth open={open} onClose={close}  >
            <DialogTitle id="form-dialog-title">{title} {id}</DialogTitle>
            <DialogContent dividers={true}>
                <SmallChips data={currentList} />
                {form}
                <SmallChips data={relationList} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} > 取 消 </Button>
                <Button variant="contained" color="primary" onClick={submit}> 提 交 </Button>
            </DialogActions>
        </Dialog >
    )
}
export default RBACDialog