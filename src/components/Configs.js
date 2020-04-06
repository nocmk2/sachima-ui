import React, { useRef, useState, createRef } from "react";
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
  gray: { color: 'gray', size: 3, dash: { animation: false }, startPlugColor: 'black', gradient: true }
}

const lines = []

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
const g_userrole = [
  { user: 'wanghaoran', role: 10 },
  { user: 'wanghaoran', role: 20 },
  { user: 'duanyu', role: 20 }
]
const p_roleobjectaction = [
  { role: 10, obj: 'r0098', action: 'write' },
  { role: 20, obj: 'Maps', action: 'read' }
]

function Configs() {
  const [animation, setAnimation] = useState(false)
  const classes = useStyles();

  const userRefsMap = useRef(users.map(user => {
    return createRef()
  }))

  const roleRefsMap = useRef(roles.map(role => {
    return createRef()
  }))

  const objectRefsMap = useRef(objects.map(obj => {
    return createRef()
  }))


  const LineUserRole = (startID, endID, option) => {
    let userindex = users.findIndex((user) => user.id === startID)
    let roleindex = roles.findIndex((role) => role.id === endID)
    let line2 = new LeaderLine(
      userRefsMap.current[userindex].current,
      roleRefsMap.current[roleindex].current,
      linecolors.purple
    )
    return line2
  }

  const LineRoleObject = (startID, endID, option) => {
    let roleindex = roles.findIndex((role) => role.id === startID)
    let objectindex = objects.findIndex((obj) => obj.id === endID)
    let line3 = new LeaderLine(
      roleRefsMap.current[roleindex].current,
      objectRefsMap.current[objectindex].current,
      linecolors.gray
    )
    return line3
  }

  const DrawLine = () => {
    g_userrole.map((o) => {
      return LineUserRole(o.user, o.role, null)
    })

    p_roleobjectaction.map((o) => {
      return LineRoleObject(o.role, o.obj)
    })

    // LineRoleObject(40, 'Maps', null)
  }

  const DisposeLine = () => {
    console.log(userRefsMap.current[0])
  }

  const handleDelete = () => {
    alert('handleDelete')
  }

  // const onMouseEnter = (event) => {
  //   console.log(event.target)
  // }

  // const onMouseLeave = (event) => {
  //   console.log(event.target)
  // }


  return (
    <div className={classes.root}>
      <Button onClick={DrawLine}>draw</Button>
      <Button variant="contained" color="primary" onClick={DisposeLine}>dispose</Button>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {users.map((user, index) =>
              (
                <Chip
                  className={classes.chip}
                  ref={userRefsMap.current[index]}
                  size="small"
                  icon={<FaceIcon />}
                  label={user.name}
                  color="primary"
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                  // onMouseEnter={(event) => { onMouseEnter(event) }}
                  // onMouseLeave={(event) => { onMouseLeave(event) }}
                  key={'user' + user.id}
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
                  ref={roleRefsMap.current[index]}
                  size="small"
                  icon={<BallotRounded />}
                  label={role.name}
                  color="secondary"
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                  // onMouseEnter={(event) => { onMouseEnter(event) }}
                  // onMouseLeave={(event) => { onMouseLeave(event) }}
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
                ref={objectRefsMap.current[index]}
                size="small"
                icon={<CenterFocusWeak />}
                label={obj.name}
                clickable
                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
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
