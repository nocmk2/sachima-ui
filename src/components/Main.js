import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { MemoryRouter as Router, Link as RouterLink } from "react-router-dom";

const Link = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

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
  { icon: <FileCopyIcon />, name: "Reports" },
  { icon: <SaveIcon />, name: "Rules" },
  { icon: <ShareIcon />, name: "Config" },
  { icon: <FavoriteIcon />, name: "Map" }
];

export default function Main() {
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

    // handleClose();
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleVisibility}>Main</Button>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />} // TODO: more pretty icon
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
}
