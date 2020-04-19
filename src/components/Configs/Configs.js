import React, { useState, useEffect, createRef, useReducer, createContext } from "react";
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import LowPriorityOutlined from '@material-ui/icons/LowPriorityOutlined';
import CenterFocusWeak from '@material-ui/icons/CenterFocusWeak';
import BallotRounded from '@material-ui/icons/BallotRounded';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { promise } from '../../apis/config'
import { DrawLineX, DisposeLine, ToggleAnimateRelativeLine } from '../../utils/line'
import ConfigsDialog from './ConfigsDialog';
import { green, purple } from '@material-ui/core/colors';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import { stateProvider } from '../../utils/state'
// import { actionFieldDecorator } from 'mobx/lib/internal';
import { reducer, initialState } from './Reducer'

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


const Configs = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { refs, relation, users } = state // ,realtion     if need
  const classes = useStyles();

  // const [users, setUsers] = useState(null)
  const [roles, setRoles] = useState([])
  const [objects, setObjects] = useState([])

  const [showline, setShowLine] = useState(false)

  const [dialogopen, setDialogOpen] = useState(false)
  const [type, setType] = useState('user')


  useEffect(() => {
    promise.then(data => {
      // setUsers(data.users)
      console.log(data.users)
      dispatch({ type: 'SET_USERS', payload: data.users })
      setRoles(data.roles)
      setObjects(data.objects)
      const toRelation = (userrole, roleobjectaction) => {
        const u = userrole.map(o => {
          return { start: o.user, end: o.role, type: 'userrole' }
        })

        const r = roleobjectaction.map(o => {
          return { start: o.role, end: o.obj, type: 'roleobject' }
        })

        return [...u, ...r]
      }
      dispatch({ type: "SETRELATION", payload: toRelation(data.userrole, data.roleobjectaction) })

      let temp = {}
      data.users.forEach(user => {
        temp[user.id] = createRef()
      })
      data.roles.forEach(role => {
        temp[role.id] = createRef()
      })
      data.objects.forEach(object => {
        temp[object.id] = createRef()
      })
      dispatch({ type: "SETREFS", payload: temp })

    })
  }, [])


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
      console.log("DISSSSSSSSSSSSs")
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
    setDialogOpen(true)
    setType('user')
  }

  const addRole = (event) => {
    setDialogOpen(true)
    setType('role')
  }

  const addObject = (event) => {
    setDialogOpen(true)
    setType('object')
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  // return <div>Loading... {JSON.stringify(refs)}----------------------------------{JSON.stringify(relation)}--------------------{JSON.stringify(users)}</div>
  // if (users === null || roles === null || objects === null) return <div>Loading... {JSON.stringify(refs)}</div>

  return (
    <div className={classes.root}>
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
                  size="small"
                  icon={<FaceIcon />}
                  label={user.name}
                  color="secondary"
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                  onMouseEnter={(event) => { onMouseEnter(user.id) }}
                  onMouseLeave={(event) => { onMouseLeave(user.id) }}
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
                  onMouseEnter={(event) => { onMouseEnter(role.id) }}
                  onMouseLeave={(event) => { onMouseLeave(role.id) }}
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
                onMouseEnter={(event) => { onMouseEnter(obj.id) }}
                onMouseLeave={(event) => { onMouseLeave(obj.id) }}
                key={'obj' + obj.id}
                id={obj.id}
              />)
            )
            }
          </Paper >
        </Grid>
      </Grid>
      <ctx.Provider value={{ hei: 'Tom', dispatch: dispatch }}>
        <ConfigsDialog
          open={dialogopen}
          type={type}
          data={{ users, roles, objects }}
          close={handleDialogClose}
        ></ConfigsDialog>
      </ctx.Provider>
    </div>
  );
};

export const ctx = createContext({})


export default Configs;


