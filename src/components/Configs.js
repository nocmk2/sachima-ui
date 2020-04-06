import React, { useRef, useState, useEffect, createRef } from "react";
import LeaderLine from 'leader-line'
import Button from '@material-ui/core/Button'

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import CenterFocusWeak from '@material-ui/icons/CenterFocusWeak';
import BallotRounded from '@material-ui/icons/BallotRounded';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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

const linecolors = {
  purple: { color: 'purple', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true },
  hotpink: { color: 'hotpink', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true },
  gray: { color: 'gray', size: 3, dash: { animation: false }, startPlugColor: 'black', gradient: true },
  red: { color: 'red', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true },
  blue: { color: 'blue', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true }
}

let relatives = {}

let users = [
  { id: 'wanghaoran', name: "王浩然" },
  { id: 'duanyu', name: "段誉" },
  { id: 'wangyuyan', name: "王语嫣" },
  { id: 'xuzhu', name: "虚竹" },
  { id: 'wanglihong', name: "王力宏" },
]
const roles = [
  { id: 10, name: "财务部员工" },
  { id: 20, name: "商务部员工" },
  { id: 30, name: "风险部员工" },
  { id: 40, name: "风险部经理" },
]
const objects = [
  { id: 'Maps', name: "地图模块" },
  { id: 'r0098', name: "报表r0098" },
  { id: 'ThreeDemo', name: "ThreeDemo模块" }
]
// users.forEach((user) => user.type = 'user')
// roles.forEach((role) => role.type = 'role')
// objects.forEach((o) => o.type = 'object')
const g_userrole = [
  { user: 'wanghaoran', role: 10 },
  { user: 'wanghaoran', role: 20 },
  { user: 'duanyu', role: 20 },
  { user: 'xuzhu', role: 30 }
]
const p_roleobjectaction = [
  { role: 10, obj: 'r0098', action: 'write' },
  { role: 20, obj: 'Maps', action: 'read' },
  { role: 30, obj: 'r0098', action: 'write' },
  { role: 30, obj: 'ThreeDemo', action: 'write' }
]

function Configs() {
  const classes = useStyles();
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const dis = DrawLine()
    return () => {
      dis()
    }
  }, [])

  const userRefs = useRef(users.map(user => {
    return createRef()
  }))

  const roleRefs = useRef(roles.map(role => {
    return createRef()
  }))

  const objectRefs = useRef(objects.map(obj => {
    return createRef()
  }))

  const LineUserRole = (startID, endID) => {
    let userindex = users.findIndex((user) => user.id === startID)
    let roleindex = roles.findIndex((role) => role.id === endID)
    let line = new LeaderLine(
      userRefs.current[userindex].current,
      roleRefs.current[roleindex].current,
      linecolors.red
    )
    if (relatives['u' + userindex] === undefined) {
      relatives['u' + userindex] = new Set()
    }
    relatives['u' + userindex].add(line)

    if (relatives['r' + roleindex] === undefined) {
      relatives['r' + roleindex] = new Set()
    }
    relatives['r' + roleindex].add(line)
    return line
  }

  const LineRoleObject = (startID, endID) => {
    let roleindex = roles.findIndex((role) => role.id === startID)
    let objectindex = objects.findIndex((obj) => obj.id === endID)
    let line = new LeaderLine(
      roleRefs.current[roleindex].current,
      objectRefs.current[objectindex].current,
      linecolors.gray
    )
    if (relatives['r' + roleindex] === undefined) {
      relatives['r' + roleindex] = new Set()
    }
    relatives['r' + roleindex].add(line)

    if (relatives['o' + objectindex] === undefined) {
      relatives['o' + objectindex] = new Set()
    }
    relatives['o' + objectindex].add(line)
    return line
  }

  const DrawLine = () => {
    let userRoleLines = g_userrole.map((o) => {
      return LineUserRole(o.user, o.role)
    })

    let roleObjectLines = p_roleobjectaction.map((o) => {
      return LineRoleObject(o.role, o.obj)
    })

    const Dispose = () => {
      userRoleLines.forEach(line => {
        line.remove()
      })

      roleObjectLines.forEach(line => {
        line.remove()
      })
    }
    return Dispose
  }

  const ToggleAnimateRelativeLine = (curidx) => {
    if (relatives[curidx] === undefined) return
    relatives[curidx].forEach((line) => {
      line.setOptions({ dash: { animation: !animation } })
    })
    setAnimation(!animation)
  }


  const handleDelete = () => {
    alert('handleDelete')
  }

  const onMouseEnter = (idx) => {
    ToggleAnimateRelativeLine(idx)
  }

  const onMouseLeave = (idx) => {
    ToggleAnimateRelativeLine(idx)
  }


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {users.map((user, index) =>
              (
                <Chip
                  className={classes.chip}
                  ref={userRefs.current[index]}
                  size="small"
                  icon={<FaceIcon />}
                  label={user.name}
                  color="secondary"
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                  onMouseEnter={(event) => { onMouseEnter('u' + index) }}
                  onMouseLeave={(event) => { onMouseLeave('u' + index) }}
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
                  ref={roleRefs.current[index]}
                  size="small"
                  icon={<BallotRounded />}
                  label={role.name}
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                  onMouseEnter={(event) => { onMouseEnter('r' + index) }}
                  onMouseLeave={(event) => { onMouseLeave('r' + index) }}
                  key={'role' + role.id}
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
                ref={objectRefs.current[index]}
                size="small"
                color="primary"
                icon={<CenterFocusWeak />}
                label={obj.name}
                clickable
                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
                onMouseEnter={(event) => { onMouseEnter('o' + index) }}
                onMouseLeave={(event) => { onMouseLeave('o' + index) }}
                key={'obj' + obj.id}
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
