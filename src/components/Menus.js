import { makeStyles } from "@material-ui/core/styles";

import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Adb from "@material-ui/icons/Adb"
import MusicNote from "@material-ui/icons/MusicNote";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    speedDial: {
        position: "absolute",
        bottom: theme.spacing(1),
        right: theme.spacing(1)
    },
}));

const menus = [
    { icon: <SupervisedUserCircle />, name: "Login" },
    { icon: <FileCopyIcon />, name: "Reports" },
    { icon: <SaveIcon />, name: "Rules" },
    { icon: <ShareIcon />, name: "Configs" },
    { icon: <FavoriteIcon />, name: "Maps" },
    { icon: <Adb />, name: "DashBoard" },
    { icon: <MusicNote />, name: "Test" },
    { icon: <ArrowRightOutlined />, name: "ThreeDemo" }
];

const Menus = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = name => {
        history.push("/" + name);
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial tooltip"
            className={classes.speedDial}
            hidden={props.hidden}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {menus.map(menu => (
                <SpeedDialAction
                    key={menu.name}
                    icon={menu.icon}
                    tooltipTitle={menu.name}
                    tooltipOpen
                    onClick={() => handleClick(menu.name)}
                />
            ))}
        </SpeedDial>
    )
}

export default Menus