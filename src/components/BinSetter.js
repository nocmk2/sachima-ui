import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import AllInclusive from "@material-ui/icons/AllInclusive";
import Remove from "@material-ui/icons/Remove";
import MenuItem from '@material-ui/core/MenuItem';
import Add from "@material-ui/icons/Add";
// import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
// import { maxWidth } from '@material-ui/system';
// import FilledInput from '@material-ui/core/FilledInput';

const PrettoSlider = withStyles({
    root: props => ({
        // color: '#52af77',
        // height: 8,
        '& span[data-index="0"]': {
            backgroundColor: props.left === "(" ? "transparent" : "currentColor",
            border: '2px solid currentColor',
        },
        '& span[data-index="1"]': {
            backgroundColor: props.right === ")" ? "transparent" : "currentColor",
            border: '2px solid currentColor',
        },
    }),
    thumb: props => ({
        // height: 8,
        // width: 4,
        // backgroundColor: props.bb,//'#fff',
        border: '2px solid currentColor',
        // marginTop: -8,
        // marginLeft: -12,
        // '&:focus,&:hover,&$active': {
        //     boxShadow: 'inherit',
        // },
    }),
    mark: {
        // backgroundColor: '#bfbfbf',
        // height: 8,
        // width: 1,
        // marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
    // active: {},
    // valueLabel: {
    //     left: 'calc(-50% + 4px)',
    // },
    // track: {
    //     height: 8,
    //     borderRadius: 4,
    // },
    // rail: {
    //     height: 8,
    //     borderRadius: 4,
    // },
})(Slider);

const useStyles = makeStyles({
    root: {
        width: 800,
        flexGrow: 1,
    },
    select: {
        margin: "dense",
        color: "primary",
        // position: 'relative',
        // padding: "3px 0px 18px"

    },
    icon: {
        fill: "red",
        // width: "0px",
    },

});

function valuetext(value) {
    return `${value}`;
}

export default function BinSetter() {
    const classes = useStyles();
    const [value, setValue] = React.useState([-20, 37]);
    const [inf, setinf] = React.useState(0)
    const [score, setScore] = React.useState(0)
    const [leftbound, setLeftbound] = React.useState("[")
    const [rightbound, setRightbound] = React.useState("]")


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMinInfChange = () => {
        if (inf !== -1) {
            setinf(-1)
            setValue(-20)
        } else {
            setinf(0)
            setValue([-20, 37])
        }
    }

    const handleMaxInfChange = () => {
        if (inf !== 1) {
            setinf(1)
            setValue(37)
        } else {
            setinf(0)
            setValue([-20, 37])
        }
    }

    const handleScoreChange = event => {
        setScore(event.target.value)
    }

    const handleRightboundChange = event => {
        setRightbound(event.target.value)
    }

    const handleLeftboundChange = event => {
        setLeftbound(event.target.value)
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container direction="row" justify="center" alignItems="flex-end" spacing={1}>
                    <Grid item >
                        <Switch size="small" checked={(inf === -1) ? true : false} onChange={handleMinInfChange} />
                        <Remove color={inf === -1 ? "primary" : "disabled"} />
                        <AllInclusive color={inf === -1 ? "primary" : "disabled"} />
                    </Grid>
                    <Grid item xs={3}>
                        <PrettoSlider
                            // className={classes.slider}
                            left={leftbound}
                            right={rightbound}
                            track={(inf === 1) ? "inverted" : "normal"} //normal
                            marks={[
                                { key: 1, value: value[0], label: `${value[0]}` },
                                { key: 2, value: value[1], label: `${value[1]}` },
                            ]}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={-100}
                            max={100}
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                    </Grid>
                    <Grid item>
                        <Add color={inf === 1 ? "primary" : "disabled"} />
                        <AllInclusive color={inf === 1 ? "primary" : "disabled"} />
                        <Switch size="small" checked={(inf === 1) ? true : false} onChange={handleMaxInfChange} />
                    </Grid>
                    <Grid item xs={1}>
                        <Select
                            disableUnderline={true}
                            className={classes.select}
                            // labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            IconComponent={() => (<></>)}
                            value={leftbound}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                            // variant="outlined"
                            onChange={handleLeftboundChange}
                        >
                            <MenuItem value={"["}>[</MenuItem>
                            <MenuItem value={"("}>(</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item >
                        <TextField
                            // className={classes.input}
                            value={-20}
                            label={leftbound === "[" ? "≥" : ">"}
                            // margin="dense"
                            // multiline={true}
                            // onChange={handleInputChange}
                            // onBlur={handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        ,
                        </Grid>
                    <Grid item >
                        <TextField
                            // className={classes.input}
                            label={rightbound === "]" ? "≤" : "<"}
                            value={70}
                            // margin="dense"
                            // multiline={true}
                            // onChange={handleInputChange}
                            // onBlur={handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Select
                            disableUnderline={true}
                            className={classes.select}
                            // labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // margin="dense"
                            value={rightbound}
                            IconComponent={() => (<></>)}
                            // variant="outlined"
                            onChange={handleRightboundChange}
                        >
                            <MenuItem value={"]"}>]</MenuItem>
                            <MenuItem value={")"}>)</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item>
                        <TextField
                            // className={classes.input}
                            label="得分"
                            value={score}
                            // margin="dense"
                            // multiline={true}
                            onChange={handleScoreChange}
                            // onBlur={handleBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    );
}
