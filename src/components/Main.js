import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import { useHistory } from 'react-router-dom';

import { useStateValue } from "../utils/state"

import Login from "./Login";
import Message from "./Message"
import Menus from "./Menus"
import BadgeAvatars from './BadgeAvatars'
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    flexGrow: 1
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));


const Main = props => {
  const classes = useStyles();
  const [openBack, setOpenBack] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [{ user, message }, dispatch] = useStateValue();
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (user.name) {
      setTimeout(() => {
        setOpenBack(false)
      }
        , 1000)
    }
  }, [user])


  const handleAvtarMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvtarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleVisibility = () => {
    setHidden(prevHidden => !prevHidden);
  };


  const handleBackClose = () => {
    setOpenBack(false);
  };


  const handleLogClick = () => {
    handleAvtarMenuClose()
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    dispatch({ type: "changeUser", newUser: { name: "", id: "", role: "" } })
    history.push('/Login')
  };

  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      dispatch({ type: "sendMessage", newMessage: { ...message, open: false } })
      return;
    }
    dispatch({ type: "sendMessage", newMessage: { ...message, open: false } })
  };

  return (
    // <div className={classes.root}>
    <>
      <Message open={message.open} move={message.move} message={message.info} handleClose={handleMessageClose}></Message>
      <Grid container>
        <Button onClick={handleVisibility}>Sachima</Button>
        {
          user.name
          && <BadgeAvatars onMouseEnter={handleAvtarMenuOpen} />
        }
        {/* <div>{user.name}</div> */}
        {/* <Button variant="contained" onClick={handleLogClick}>{user.name ? "LogOut" : "LogIn"}</Button> */}
      </Grid>
      <Menu
        id="simple-menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        // keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAvtarMenuClose}
      >
        <MenuItem disabled={true}>{user.name}</MenuItem>
        <Divider />
        <MenuItem onClick={handleAvtarMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleLogClick}>Logout</MenuItem>
      </Menu>
      {props.children}

      {/* login modal window */}
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
      <Menus hidden={hidden} />

    </>
  );
};

export default withRouter(Main);
