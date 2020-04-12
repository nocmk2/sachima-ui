import React, { useState, useEffect, createRef } from "react";
import LeaderLine from 'leader-line'
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

let mock_users = [
  { id: 'wanghaoran', name: "王浩然" },
  { id: 'duanyu', name: "段誉" },
  { id: 'wangyuyan', name: "王语嫣" },
  { id: 'xuzhu', name: "虚竹" },
  { id: 'wanglihong', name: "王力宏" },
  { id: 'admin', name: '管理员' }
]
const mock_roles = [
  { id: 'admin', name: '管理员' },
  { id: 'caiwu', name: "财务部员工" },
  { id: 'shangwu', name: "商务部员工" },
  { id: 'fengxian', name: "风险部员工" },
  { id: 'fengxianadmin', name: "风险部经理" },

]
const mock_objects = [
  { id: 'Maps', name: "地图模块" },
  { id: 'r0098', name: "报表r0098" },
  { id: 'ThreeDemo', name: "ThreeDemo模块" }
]
// users.forEach((user) => user.type = 'user')
// roles.forEach((role) => role.type = 'role')
// objects.forEach((o) => o.type = 'object')
const mock_g_userrole = [
  { user: 'wanghaoran', role: 'caiwu' },
  { user: 'wanghaoran', role: 'fengxian' },
  { user: 'duanyu', role: 'fengxian' },
  { user: 'xuzhu', role: 'shangwu' },
  { user: 'admin', role: 'admin' }

]
const mock_p_roleobjectaction = [
  { role: 'caiwu', obj: 'r0098', action: 'write' },
  { role: 'shangwu', obj: 'Maps', action: 'read' },
  { role: 'fengxian', obj: 'r0098', action: 'write' },
  { role: 'fengxian', obj: 'ThreeDemo', action: 'write' },
  { role: 'admin', obj: 'r0098', action: 'write' },
  { role: 'admin', obj: 'Maps', action: 'write' },
  { role: 'admin', obj: 'r0098', action: 'write' },
  { role: 'admin', obj: 'ThreeDemo', action: 'write' }
]

const fetchUsers = () => {
  return mock_users
}
const fetchRoles = () => {
  return mock_roles
}
const fetchObjects = () => {
  return mock_objects
}
const fetchUserRole = () => {
  return mock_g_userrole
}
const fetchRoleObjectAction = () => {
  return mock_p_roleobjectaction
}

function fetchData() {
  return Promise.all([fetchUsers(), fetchRoles(), fetchObjects(), fetchUserRole(), fetchRoleObjectAction()])
    .then(([users, roles, objects, userrole, roleobjectaction]) => ({ users, roles, objects, userrole, roleobjectaction }))
}

const promise = fetchData()


const Configs = () => {
  const classes = useStyles();
  const [animation, setAnimation] = useState(false);

  const [users, setUsers] = useState(null)
  const [roles, setRoles] = useState(null)
  const [objects, setObjects] = useState(null)
  const [userrole, setUserRole] = useState(null)
  const [roleobjectaction, setRoleObjectAction] = useState(null)

  const [userRefs, setUserRefs] = useState([])
  const [roleRefs, setRoleRefs] = useState([])
  const [objectRefs, setObjectRefs] = useState([])

  const [showline, setShowLine] = useState(false)

  const [userRoleLines, setUserRoleLines] = useState([])
  const [roleObjectLines, setRoleObjectLines] = useState([])


  const LineUserRole = (startID, endID) => {
    let userindex = users.findIndex((user) => user.id === startID)
    let roleindex = roles.findIndex((role) => role.id === endID)
    let line = new LeaderLine(
      userRefs[userindex].current,
      roleRefs[roleindex].current,
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
      roleRefs[roleindex].current,
      objectRefs[objectindex].current,
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
    setUserRoleLines(userrole.map((o) => {
      return LineUserRole(o.user, o.role)
    })
    )

    setRoleObjectLines(roleobjectaction.map((o) => {
      return LineRoleObject(o.role, o.obj)
    })
    )
  }

  const DisposeLine = () => {
    userRoleLines.forEach(line => {
      line.remove()
    })

    roleObjectLines.forEach(line => {
      line.remove()
    })

    relatives = []
  }

  useEffect(() => {
    promise.then(data => {
      setUsers(data.users)
      setRoles(data.roles)
      setObjects(data.objects)
      setUserRole(data.userrole)
      setRoleObjectAction(data.roleobjectaction)

      setUserRefs(data.users.map(user => { return createRef() }))
      setRoleRefs(data.roles.map(role => { return createRef() }))
      setObjectRefs(data.objects.map(object => { return createRef() }))
    })
    return () => {
      console.log('clean')
    };
  }, []
  )




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

  const toggleLine = (event) => {
    if (event.target.checked) {
      DrawLine()
    } else {
      DisposeLine()
    }
    setShowLine(!showline)
  }

  if (users == null || roles == null || objects == null || userrole == null || roleobjectaction == null) return <div>Loading...</div>

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item>
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
                  ref={userRefs[index]}
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
                  ref={roleRefs[index]}
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
                ref={objectRefs[index]}
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
