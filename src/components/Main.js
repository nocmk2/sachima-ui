import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1)
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
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleVisibility = () => {
    setHidden(prevHidden => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = name => {
    console.log(name);
    history.push("/" + name);
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleVisibility}>Sachima</Button>
      {props.children}
      <Backdrop open={open} />
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
