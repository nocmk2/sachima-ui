import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import AllInclusive from "@material-ui/icons/AllInclusive";
import Remove from "@material-ui/icons/Remove";
import MenuItem from '@material-ui/core/MenuItem';
import Add from "@material-ui/icons/Add";
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { getMathInterval } from "../utils/mathInterval"
import { useDidUpdateEffect } from "../utils/tools"

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


const BinTextSetter = ({ kv, binscore, onChange }) => {
    // const initValue = React.useMemo(
    //     () => getMathInterval(express),  // [-inf,1.0)
    //     [express] // ✅ Don’t recalculate until `express` changes
    // );
    const classes = useStyles();
    const [score, setScore] = React.useState(binscore)
    const [his, setHis] = React.useState(kv)
    const [inputerror, setInputError] = React.useState(false)
    const [isedited, setIsEdited] = React.useState(false)
    const [k, setK] = React.useState(kv[0])
    const [v, setV] = React.useState(kv[1])

    const handleScoreChange = event => {
        setScore(event.target.value)
    }

    const handleKInputChange = event => {
        setK(event.target.value)
    }

    const handleVInputChange = event => {
        setV(event.target.value)
    }


    return (
        <Grid container className={classes.root} spacing={1}>
            {/* <Grid container direction="row" justify="center" alignItems="flex-end" spacing={9}> */}
            <Grid item xs={9} >
                <TextField
                    fullWidth={true}
                    // className={classes.input}
                    value={k}
                    label={"value"}
                    // disabled={inf === -1 ? true : false}
                    // error={inputerror}
                    onChange={handleKInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    // className={classes.input}
                    label="Score"
                    value={score}
                    // margin="dense"
                    // multiline={true}
                    onChange={handleScoreChange}
                    // onBlur={handleBlur}
                    inputProps={{
                        step: 1,
                        min: -9999999,
                        max: 9999999,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
                {/* </Grid> */}
            </Grid>
        </Grid >
    );
}

export default BinTextSetter