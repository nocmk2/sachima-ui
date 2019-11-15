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
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import Login from "./Login";
import Fade from "@material-ui/core/Fade";

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
  { icon: <FavoriteIcon />, name: "Maps" }
];

const Main = props => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openBack, setOpenBack] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);


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
    console.log(name);
    history.push("/" + name);
  };

  const handleLogClick = () => {
    if (isAuthed) {
      localStorage.setItem("token", "");
      setIsAuthed(false);
    } else {
      setOpenBack(true);
    }
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleVisibility}>Sachima</Button>
      <Button onClick={handleLogClick}>{isAuthed ? "LogOut" : "LogIn"}</Button>
      {/* <div style={{ color: "gray" }}>{token}</div> */}
      {props.children}
      <Backdrop open={open} />

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
