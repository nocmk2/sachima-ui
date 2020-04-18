
import React, { useMemo, useContext, useState, useEffect, createRef, useReducer } from "react";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
import User from '../forms/User'
import Role from '../forms/Role'
import Object from '../forms/Object'
import { green, purple } from '@material-ui/core/colors';

import { ctx } from './Configs';

const ColorChip = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Chip);

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
            title: '用户', recommend: users, datashouldrender: roles, form: <User />
        }
    } else if (type === 'role') {
        // should render data.user and data.object
        return {
            title: '角色', recommend: roles, datashouldrender: [...users, ...objects], form: <Role />
        }
    } else if (type === 'object') {
        // should render data.role
        return { title: '权限', recommend: objects, datashouldrender: roles, form: <Object /> }
    }
}


const ConfigsDialog = ({ open, close, type, data, id }) => {
    const { hei, dispatch } = useContext(ctx)
    // const 
    const { title, recommend, datashouldrender, form } = useMemo(
        () => Cal(type, data),
        [type, data]
    );

    // const doit = () => {
    //     dispatch({ type: "DRAWLINE" })
    // }
    const submit = () => {
        dispatch({ type: 'ADD_USER', payload: { id: '12345', name: 'Jerry' } })
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
                {form}
                <SmallChips data={datashouldrender} />
                {/* <RecommendChips data={recommend} /> */}
            </DialogContent>
            {/* <DialogTitle id="form-dialog-title">{title}</DialogTitle> */}
            <DialogActions>
                <Button onClick={handleCancel} > 取 消 </Button>
                <Button onClick={handleSubscribe} variant="contained" color="primary" onClick={submit}> 提 交 </Button>
            </DialogActions>
        </Dialog >
    )
}
export default ConfigsDialog