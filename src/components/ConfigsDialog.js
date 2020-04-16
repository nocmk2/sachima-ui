
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
import TransferList from './TransferList'
import SmallChips from './SmallChips'
import RecommendChips from './RecommendChips'

const handleClose = () => {

}

const handleCancel = () => { }

const handleSubscribe = () => {

}
// const typeData = (type) => {
//     if (type === 'user') { //用户可以配置角色
//         return [{ type: 'role', data: roles }]
//     } else if (type === 'role') {
//         return [{ type: 'user', data: users }, { type: 'object', data: objects }]
//     }
//     else if (type === 'object') {
//         return [{ type: 'role', data: [roles] }]
//     } else {
//         throw new Error('Wrong data type')
//     }
// }
const Cal = (type, data) => {
    if (type === 'user') {
        // should render data.role
        return { title: '用户', datashouldrender: [data.roles] }
    } else if (type === 'role') {
        // should render data.user and data.object
        return { title: '角色', datashouldrender: [data.users, data.objects] }
    } else if (type === 'object') {
        // should render data.role
        return { title: '权限', datashouldrender: [data.roles] }
    }
}

const ConfigsDialog = ({ open, close, type, data, id }) => {
    // const 
    const { title, datashouldrender } = useMemo(
        () => Cal(type, data),
        [type, data] // ✅ 除非 `color` 改变，不会重新计算
    );

    return (


        <Dialog maxWidth={'lg'} fullWidth open={open} onClose={close}  >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent dividers={true}>
                {/* <DialogContentText>
                    input {type} info
                </DialogContentText> */}
                <RecommendChips />
                <TextField
                    // autoFocus
                    margin="normal"
                    id="id"
                    label={title + '编号'}
                    type="text"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    // autoFocus
                    margin="normal"
                    id="name"
                    label={title + '名称'}
                    type="text"
                    fullWidth
                    variant="outlined"
                />
                {/* <TransferList />
                <TransferList />
                <TransferList />
                <TransferList />
                <TransferList /> */}
                <SmallChips />
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