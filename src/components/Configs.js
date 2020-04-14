import React, { useState, useEffect, createRef } from "react";
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
  const classes = useStyles();

  const [users, setUsers] = useState(null)
  const [roles, setRoles] = useState(null)
  const [objects, setObjects] = useState(null)

  /*
  refs -> {[userid]: ref}
  relation -> [{start:userid,end:roleid}]
  */
  const [refs, setRefs] = useState({})
  const [relation, setRelation] = useState([])

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
      setRelation(toRelation(data.userrole, data.roleobjectaction))

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
      setRefs(temp)

    })
  }, [])


  useEffect(() => {
    return () => {
      DisposeLine()
    }
  }, []);

  useEffect(() => {
    console.log('showlineeffect')
    if (showline) {
      DrawLineX(refs, relation)
    }
    return () => {
      DisposeLine()
    }
    // TODO:  useReducer improve
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

export default Configs;
