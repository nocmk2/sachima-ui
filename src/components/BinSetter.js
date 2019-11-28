import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import AllInclusive from "@material-ui/icons/AllInclusive";
import Remove from "@material-ui/icons/Remove";

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
    const [inf, setinf] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMinInfChange = () => {
        if (inf !== -1) {
            setinf(-1)
        } else {
            setinf(0)
        }
    }

    const handleMaxInfChange = () => {
        if (inf !== 1) {
            setinf(1)
        } else {
            setinf(0)
        }
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={1}>
                        <Remove color={inf === -1 ? "primary" : "disabled"} />
                    </Grid>
                    <Grid item xs={1}>
                        <AllInclusive color={inf === -1 ? "primary" : "disabled"} />
                    </Grid>
                    <Grid item xs={2}>
                        <Switch size="small" checked={(inf === -1) ? true : false} onChange={handleMinInfChange} />
                    </Grid>
                    <Grid item xs={5}>
                        <Slider
                            track="inverted" //normal
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="on"
                            min={-100}
                            max={100}
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <AllInclusive color={inf === 1 ? "primary" : "disabled"} />
                    </Grid>
                    <Grid item xs={2}>
                        <Switch size="small" checked={(inf === 1) ? true : false} onChange={handleMaxInfChange} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
