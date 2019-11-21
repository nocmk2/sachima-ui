import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

const Message = ({ open, move, message }) => {
    const [transition, setTransition] = useState(undefined)

    const Transition = (props) => {
        return <Slide {...props} direction={move} />;
    }

    useEffect(() => {
        setTransition(() => Transition)
    }, [])

    return (
        <Snackbar
            open={open}
            // onClose={handleClose}
            TransitionComponent={transition}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
        />
    )
}

export default Message