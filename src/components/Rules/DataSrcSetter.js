import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const DataSrcSetter = props => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            {
                Object.keys(props.data).map((item, index) => {
                    return <TextField key={'item' + index} label={item} value={props.data[item]} />
                })
            }
            {/* <TextField id="standard-basic" label="Standard" /> */}
            {/* <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
        </form>
    )
    // return <div>{JSON.stringify(props.data)}</div>
}

export default DataSrcSetter