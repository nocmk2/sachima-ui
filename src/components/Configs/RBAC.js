import React, { useState, useEffect, createRef, useReducer } from "react";
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
// import LowPriorityOutlined from '@material-ui/icons/LowPriorityOutlined';
import CenterFocusWeak from '@material-ui/icons/CenterFocusWeak';
import BallotRounded from '@material-ui/icons/BallotRounded';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
// import useData from '../../apis/config'
// import useConfigPageSource from '../../apis/useConfigPageSource'
import { ToggleAnimateRelativeLine } from 'utils/line'
import RBACDialog from './RBACDialog';
// import { green, purple } from '@material-ui/core/colors';
// import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
// import { stateProvider } from '../../utils/state'
// import { actionFieldDecorator } from 'mobx/lib/internal';
import { reducer } from './Reducer'
import { CircularProgress } from '@material-ui/core';

// import * as API from "../../apis/api"
// import { useStateValue } from "../../utils/state"

// import ErrorBoundary from '../ErrorBoundary'
// import Error from '../Error'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chip: {
    margin: '28px'
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// const ColorChip = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: purple[500],
//     '&:hover': {
//       backgroundColor: purple[700],
//     },
//   },
// }))(Chip);
// const resource = fetchProfileData();

const RBAC = ({ users, roles, objects, userrole, roleobject }) => {

  const [state, dispatch] = useReducer(reducer, {
    // refs -> {[userid]: ref}
    refs: {},
    // relation -> [{ start: userid, end: roleid }]
    // relation: toRelation(userrole, roleobject),
    relation: [],
  })
  const { refs, relation } = state // ,realtion     if need
  const classes = useStyles();

  const [showline, setShowLine] = useState(false)

  const [dialogopen, setDialogOpen] = useState(false)
  const [type, setType] = useState('user')

  // fetch data
  // useEffect(() => {
  //   console.log('rrrrrrrrrrrrrrrrrrrrrr')
  //   dispatch({ type: "SET_USERS", payload: resource.users.read() })
  //   dispatch({ type: "SET_ROLES", payload: resource.roles.read() })
  //   dispatch({ type: "SET_OBJECTS", payload: resource.objects.read() })
  //   dispatch({ type: "SET_USERROLE", payload: resource.userrole.read() })
  //   dispatch({ type: "SET_ROLEOBJECT", payload: resource.roleobject.read() })
  // }, [])

  useEffect(() => {
    dispatch({ type: "SETRELATION", userrole: userrole, roleobject: roleobject })

    let temp = {}
    users.forEach(user => {
      temp[user.id] = createRef()
    })
    roles.forEach(role => {
      temp[role.id] = createRef()
    })
    objects.forEach(object => {
      temp[object.id] = createRef()
    })
    dispatch({ type: "SETREFS", payload: temp })

  }, [roles, objects, users, userrole, roleobject])


  useEffect(() => {
    return () => {
      dispatch({ type: "DISPOSELINE" })
    }
  }, []);

  useEffect(() => {
    if (showline) {
      dispatch({ type: "DRAWLINE" })
    }
    return () => {
      dispatch({ type: "DISPOSELINE" })
    }
  }, [showline])


  const handleDelete = () => {
    alert('handleDelete')
  }

  const onMouseEnter = (idx) => {
    ToggleAnimateRelativeLine(idx)
  }

  const onMouseLeave = (idx) => {
    ToggleAnimateRelativeLine(idx)
  }

  const toggleLine = (event) => {
    setShowLine(!showline)
  }

  const addUser = (event) => {
    // setUsers([...users, { id: 'newuser', name: '新用户' }])
    setShowLine(false)
    setDialogOpen(true)
    setType('user')
  }

  const addRole = (event) => {
    setShowLine(false)
    setDialogOpen(true)
    setType('role')
  }

  const addObject = (event) => {
    setShowLine(false)
    setDialogOpen(true)
    setType('object')
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const onClick = id => {
    alert(id)
  }

  // if (users === undefined) {
  //   return <CircularProgress></CircularProgress>
  // }

  return (
    <div className={classes.root}>
      {/* {JSON.stringify(initData.users)} */}
      {/* <div>{JSON.stringify(relation)}</div>
      <span>--------------------------</span>
      <div>{JSON.stringify(refs)}</div> */}
      <Grid container spacing={3}>
        <Grid item>
          {/* <Button variant="contained" color="primary" onClick={() => { setShowLine(true) }}>show</Button> */}
          <div className={classes.buttons}>
            <FormControlLabel
              control={
                <Switch color='secondary' checked={showline} onChange={toggleLine} />
              }
              labelPlacement="start"
              label={
                <span>展示关系</span>
                // <LowPriorityOutlined />
              }
            />
            <Button size="small" variant="contained" color="secondary" onClick={addUser} startIcon={<FaceIcon />}>新增用户</Button>
            <Button size="small" variant="contained" onClick={addRole} startIcon={<BallotRounded />}>新增角色</Button>
            <Button size="small" variant="contained" color="primary" onClick={addObject} startIcon={<CenterFocusWeak />}>新增权限</Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {users.map((user, index) =>
              (
                <Chip
                  className={classes.chip}
                  ref={refs[user.id]}
                  clickable
                  size="small"
                  icon={<FaceIcon />}
                  label={user.name}
                  color="secondary"
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                  onMouseEnter={() => { onMouseEnter(user.id) }}
                  onMouseLeave={() => { onMouseLeave(user.id) }}
                  onClick={() => onClick(user.id)}
                  key={'user' + user.id}
                  id={user.id}
                />
              )

            )}
          </Paper >
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {
              roles.map((role, index) =>
                <Chip
                  size="small"
                  // color="primary"
                  className={classes.chip}
                  ref={refs[role.id]}
                  clickable
                  icon={<BallotRounded />}
                  label={role.name}
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                  onMouseEnter={() => { onMouseEnter(role.id) }}
                  onMouseLeave={() => { onMouseLeave(role.id) }}
                  onClick={() => onClick(role.id)}
                  key={'role' + role.id}
                  id={role.id}
                />

              )
            }
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {objects.map((obj, index) => (
              <Chip
                className={classes.chip}
                ref={refs[obj.id]}
                color="primary"
                size="small"
                edge='end'
                icon={<CenterFocusWeak />}
                label={obj.name}
                clickable
                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
                onMouseEnter={() => { onMouseEnter(obj.id) }}
                onMouseLeave={() => { onMouseLeave(obj.id) }}
                onClick={() => onClick(obj.id)}
                key={'obj' + obj.id}
                id={obj.id}
              />)
            )
            }
          </Paper >
        </Grid>
      </Grid>
      {/* <Card>
        <div>{JSON.stringify(relation)}</div>
      </Card> */}
      <RBACDialog
        open={dialogopen}
        type={type}
        data={{ users, roles, objects }}
        close={handleDialogClose}
      ></RBACDialog>
      {/* </ctx.Provider> */}
    </div>
  );
};



export default RBAC;


