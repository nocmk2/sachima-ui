
import React, { useMemo, useState, useEffect, createRef, useReducer } from "react";
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SmallChips from './SmallChips'
import RecommendChips from './RecommendChips'
import User from './form/User'
import Role from './form/Role'
import Object from './form/Object'

const handleClose = () => {
}

const handleCancel = () => { }

const handleSubscribe = () => {
}

const Cal = (type, data) => {
    const users = data.users.map(o => ({ ...o, type: 'user' }))
    const roles = data.roles.map(o => ({ ...o, type: 'role' }))
    const objects = data.objects.map(o => ({ ...o, type: 'object' }))

    if (type === 'user') {
        // should render data.role
        return {
            title: '用户', datashouldrender: roles, form: <User />
        }
    } else if (type === 'role') {
        // should render data.user and data.object
        return {
            title: '角色', datashouldrender: [...users, ...objects], form: <Role />
        }
    } else if (type === 'object') {
        // should render data.role
        return { title: '权限', datashouldrender: roles, form: <Object /> }
    }
}

const ConfigsDialog = ({ open, close, type, data, id }) => {
    // const 
    const { title, datashouldrender, form } = useMemo(
        () => Cal(type, data),
        [type, data]
    );

    return (
        <Dialog maxWidth={'lg'} fullWidth open={open} onClose={close}  >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent dividers={true}>
                {/* <DialogContentText>
                    input {type} info
                </DialogContentText> */}
                {form}
                <SmallChips data={datashouldrender} />
                <Divider />
                <span>从其他{title}复制: </span>
                <RecommendChips />
            </DialogContent>
            {/* <DialogTitle id="form-dialog-title">{title}</DialogTitle> */}
            <DialogActions>
                <Button onClick={handleCancel} color="primary"> 取 消 </Button>
                <Button onClick={handleSubscribe} variant="contained" color="primary"> 提 交 </Button>
            </DialogActions>
        </Dialog >
    )
}
export default ConfigsDialog