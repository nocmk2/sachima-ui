import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        width: 300,
        flexGrow: 1,
    },
});

function valuetext(value) {
    return `${value}`;
}

export default function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState([-20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <Switch size="small" checked={true} />
                    </Grid>
                    <Grid item xs={6}>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="on"
                            min={-50}
                            max={50}
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                    </Grid>
                    <Grid item>
                        <Switch size="small" checked={true} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
