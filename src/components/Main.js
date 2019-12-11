import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Adb from "@material-ui/icons/Adb"
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import Login from "./Login";
import Fade from "@material-ui/core/Fade";
import { useStateValue } from "../utils/state"
import Message from "./Message"
// import * as API from "../apis/api"

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const actions = [
  { icon: <SupervisedUserCircle />, name: "Login" },
  { icon: <FileCopyIcon />, name: "Reports" },
  { icon: <SaveIcon />, name: "Rules" },
  { icon: <ShareIcon />, name: "Configs" },
  { icon: <FavoriteIcon />, name: "Maps" },
  { icon: <Adb />, name: "DashBoard" }
];

const Main = props => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openBack, setOpenBack] = useState(false);
  const [hidden, setHidden] = useState(false);

  // const [{ count }] = useStateValue();
  const [{ user, message }, dispatch] = useStateValue();

  // useEffect(() => {
  //   if (API.getUserStatus()) {
  //     console.log("valid user")
  //   } else {
  //     API.clearUserStatus()
  //   }
  // }, [])

  useEffect(() => {
    if (user.name) {
      setTimeout(() => {
        setOpenBack(false)
      }
        , 1000)
    }
  }, [user])


  const handleVisibility = () => {
    setHidden(prevHidden => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackClose = () => {
    setOpenBack(false);
  };

  const handleClick = name => {
    history.push("/" + name);
  };

  const handleLogClick = () => {
    if (user.name) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      dispatch({ type: "changeUser", newUser: { name: "", id: "", role: "" } })

    } else {
      setOpenBack(true);
    }
  };

  const handleMessageClose = (event, reason) => {
    console.log(reason)
    if (reason === 'clickaway') {
      dispatch({ type: "sendMessage", newMessage: { ...message, open: false } })
      return;
    }
    console.log("handleClose")
    dispatch({ type: "sendMessage", newMessage: { ...message, open: false } })
  };

  return (
    <div className={classes.root}>
      <Message open={message.open} move={message.move} message={message.info} handleClose={handleMessageClose}></Message>
      <Button onClick={handleVisibility}>Sachima</Button>
      {
        user.name
        && <span>Hello {user.name}</span>
      }
      <Button variant="contained" onClick={handleLogClick}>{user.name ? "LogOut" : "LogIn"}</Button>
      {props.children}
      {/* <Backdrop open={open} /> */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openBack}
        onClose={handleBackClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000
        }}
      >
        <Fade in={openBack}>
          <div className={classes.paper}>
            <Login />
          </div>
        </Fade>
      </Modal>

      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleClick(action.name)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default withRouter(Main);
