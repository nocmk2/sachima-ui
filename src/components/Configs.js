import React, { useState, useEffect, createRef, useReducer } from "react";
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
import { promise } from '../apis/config'
import { DrawLineX, DisposeLine, ToggleAnimateRelativeLine } from '../utils/line'

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
  }
}));


const Configs = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { refs } = state // ,realtion     if need
  const classes = useStyles();

  const [users, setUsers] = useState(null)
  const [roles, setRoles] = useState(null)
  const [objects, setObjects] = useState(null)

  const [showline, setShowLine] = useState(false)


  useEffect(() => {
    promise.then(data => {
      setUsers(data.users)
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


  if (users == null || roles == null || objects == null) return <div>Loading...</div>

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => { setShowLine(true) }}>show</Button>
          <FormControlLabel
            control={
              <Switch color='secondary' checked={showline} onChange={toggleLine} />
            }
            labelPlacement="start"
            label={
              <LowPriorityOutlined />
            }
          />
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
                  className={classes.chip}
                  ref={refs[role.id]}
                  size="small"
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
                size="small"
                color="primary"
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
    </div>
  );
};

const initialState = {
  // refs -> {[userid]: ref}
  refs: {},
  // relation -> [{ start: userid, end: roleid }]
  relation: []
}

function reducer(state, action) {
  const { refs, relation } = state
  if (action.type === "SETREFS") {
    return { refs: action.payload, relation }
  } else if (action.type === "SETRELATION") {
    return { refs, relation: action.payload }
  } else if (action.type === "DRAWLINE") {
    DrawLineX(refs, relation)
    return { refs, relation }
  } else if (action.type === "DISPOSELINE") {
    DisposeLine()
    return { refs, relation }
  } else {
    throw new Error();
  }
}

export default Configs;
