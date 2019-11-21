import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { amber, green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const Message = ({ open, move, message, handleClose }) => {
    const classes = useStyles1();
    const [transition, setTransition] = useState(undefined)

    const Transition = (props) => {
        // console.log(move)
        return <Slide {...props} direction={move} />;
    }

    useEffect(() => {
        setTransition(() => Transition)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [move])


    return (
        <Snackbar
            open={open}
            key={123422}
            anchorOrigin={{
                vertical: "top", horizontal: "center"
            }}
            autoHideDuration={2000}
            onClose={handleClose}
            // className={classes.warning}
            TransitionComponent={transition}
            ContentProps={{
                'aria-describedby': 'message-id'
            }}
            message={< span id="message-id" className={classes.message} >
                <InfoIcon className={clsx(classes.icon, classes.iconVariant)} />
                {message}</span >}
        />
    )
}

Message.propTypes = {
    open: PropTypes.bool,
    move: PropTypes.oneOf(["left", "right", "up", "down"]).isRequired,
    message: PropTypes.string.isRequired
}

export default Message