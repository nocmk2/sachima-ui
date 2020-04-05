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
}));

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
  { id: 20, name: "商务部员工" }
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

  // const roleRefsMap = useRef(roles.map(() => {
  //   return { [roles.name]: createRef() }
  // }))

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const DrawLine = () => {
    console.log(userRefsMap.current[2].current)
    console.log(ref3.current)
    // var line = new LeaderLine(ref1.current, ref2.current, { color: 'hotpink', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true });
    var line2 = new LeaderLine(userRefsMap.current[2].current, ref3.current, { color: 'purple', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true });
    // var line3 = new LeaderLine(ref4.current, ref5.current, { color: 'hotpink', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true });
    // var line4 = new LeaderLine(ref5.current, ref6.current, { color: 'purple', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true });
    // if (line !== null && line !== undefined) {
    //   line.setOptions({ dash: { animation: true } })
    // }
    // console.log("mouse enter")
  }

  const DisposeLine = () => {
    console.log(userRefsMap.current[0])
  }

  const handleDelete = () => {
    alert('王浩然！')
  }

  const onMouseEnter = (event) => {
    console.log(event.target)
    var line = new LeaderLine(event.target, ref2.current, { color: 'hotpink', size: 3, dash: { animation: false }, startPlugColor: 'hotpink', gradient: true });
  }

  const onMouseLeave = (event) => {
    console.log(event.target)
  }


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
                  ref={userRefsMap.current[index]}
                  size="small"
                  icon={<FaceIcon />}
                  label={user.name}
                  color="primary"
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                  key={'user' + user.id}
                />
              )
            )}
            {/* <Chip
              ref={ref1}
              size="small"
              icon={<FaceIcon />}
              label="王浩然"
              clickable
              color="primary"
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip
              ref={ref4}
              size="small"
              icon={<FaceIcon />}
              label={"段誉" + String(animation)}
              onMouseEnter={(event) => { onMouseEnter(event) }}
              onMouseLeave={(event) => { onMouseLeave(event) }}
              clickable
              color="primary"
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip
              size="small"
              icon={<FaceIcon />}
              label="蒋怡"
              clickable
              color="primary"
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip
              size="small"
              icon={<FaceIcon />}
              label="蒋怡"
              clickable
              color="primary"
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip
              size="small"
              icon={<FaceIcon />}
              label="蒋怡"
              clickable
              color="primary"
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip
              size="small"
              icon={<FaceIcon />}
              label="蒋怡"
              clickable
              color="primary"
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            /> */}
          </Paper >
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Chip
              ref={ref2}
              size="small"
              icon={<BallotRounded />}
              label="财务部普通员工"
              clickable
              color="secondary"
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip
              ref={ref5}
              size="small"
              icon={<BallotRounded />}
              label="商务部普通员工"
              clickable
              color="secondary"
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            /></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Chip
              ref={ref3}
              size="small"
              icon={<CenterFocusWeak />}
              label="改评分卡规则"
              clickable
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
            <Chip
              ref={ref6}
              size="small"
              icon={<CenterFocusWeak />}
              label="查看报表"
              clickable
              onDelete={handleDelete}
              deleteIcon={<DoneIcon />}
            />
          </Paper >
        </Grid>
      </Grid>
    </div>
  );
};
export default Configs;
