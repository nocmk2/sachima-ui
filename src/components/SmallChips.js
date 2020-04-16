import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const getColor = (type) => {
    if (type === 'user') return 'secondary'
    if (type === 'role') return ''
    if (type === 'object') return 'primary'
}

const SmallChips = ({ data }) => {
    const classes = useStyles();

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <div className={classes.root}>
            {data.map((o, idx) =>
                <Chip size="small" label={o.name} key={o.id} color={getColor(o.type)} avatar={<Avatar>{o.name[0]}</Avatar>} onClick={handleClick} onDelete={handleDelete} />
            )}
        </div>
    );
}

export default SmallChips