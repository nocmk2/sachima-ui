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
import { getMathInterval } from "utils/mathInterval"
import { useDidUpdateEffect } from "utils/tools"

import { useDispatch } from 'react-redux'
import { setBin } from 'components/Rules/rulesSlice'

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
        display: 'flex',
        width: 1000
        // width: 1000,
        // flexGrow: 1,
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


const BinMathSetter = ({ express, binscore, minmax, onChange }) => {
    const dispatch = useDispatch()
    const initValue = React.useMemo(
        () => getMathInterval(express),  // [-inf,1.0)
        [express] // ✅ Don’t recalculate until `express` changes
    );
    const classes = useStyles();
    const [value, setValue] = React.useState(initValue.interval); // inf=-1 value=38 means (-inf,38)
    const [inf, setinf] = React.useState(initValue.inf) // -1 -Inf    0     1   Inf
    const [leftbound, setLeftbound] = React.useState(initValue.left)
    const [rightbound, setRightbound] = React.useState(initValue.right)
    const [score, setScore] = React.useState(binscore)
    // const [min, setMin] = React.useState(minmax[0])
    // const [max, setMax] = React.useState(minmax[1])
    const [his, setHis] = React.useState(initValue.his)
    const [inputerror, setInputError] = React.useState(false)
    // const [isedited, setIsEdited] = React.useState(false)
    // const [marks, setMarks] = React.useState([])

    // 当porps.binscore变化的时候更新score，否则在切换rule的时候score不会更新
    React.useEffect(() => {
        setScore(binscore)
    }, [binscore])

    React.useEffect(() => {
        if (value[0] > value[1]) {
            setInputError(true)
        } else {
            setInputError(false)
        }
    }, [value])


    useDidUpdateEffect(() => {
        var ex = constructExpress()

        // 通过回调onChange把新的表达式传递到上层组建
        onChange({
            [ex]: Number(score)  // {"[-inf,1.6]": 23}
        })
        // setIsEdited(true)
    }, [value, score, leftbound, rightbound])


    // const Resilient = (v, direction) => {
    //     if (direction === "left") {
    //         if (leftValue() <= v) {
    //             return v - 20
    //         }
    //     }

    //     if (direction === "right") {
    //         if (rightValue() >= v) {
    //             return v + 20
    //         }
    //     }

    // }

    // const leftValue = () => {
    //     if (typeof value === "object") {
    //         return value[0]
    //     } else if (typeof value === "number") {
    //         return value
    //     }
    // }

    // const rightValue = () => {
    //     if (typeof value === "object") {
    //         return value[1]
    //     } else if (typeof value === "number") {
    //         return value
    //     }
    // }

    // KEEP!!
    React.useEffect(() => {
        // const getMarks = () => {
        //     if (typeof value === "object") {
        //         setMarks([
        //             { key: 1, value: value[0], label: `${value[0]}` },
        //             { key: 2, value: value[1], label: `${value[1]}` },
        //         ])
        //     } else if (typeof value === "number") {
        //         setMarks([
        //             { key: 1, value: value, label: `${value}` },
        //         ])
        //     }
        // }

        const leftValue = () => {
            if (typeof value === "object") {
                return Number(value[0])
            } else {
                return Number(value)
            }
        }

        const rightValue = () => {
            if (typeof value === "object") {
                return Number(value[1])
            } else {
                return Number(value)
            }
        }
        // const scaleSlider = () => {
        //     // getMarks()
        //     if (leftValue() <= min) {
        //         setMin(leftValue() - 2)
        //     }

        //     if (rightValue() >= max) {
        //         setMax(rightValue() + 2)
        //     }
        // }

        // scaleSlider()


    }, [value, score])


    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMinInfChange = () => {
        switch (inf) {
            default:
            case 0: //从范围状态打开负无穷开关
                setinf(-1) // 设置成负无穷
                setHis(value) // 记录value状态历史，为了关闭负无穷开关的时候恢复value
                setValue(value[1]) // 设置成 负无穷到右值
                break;
            case 1: // 从正无穷状态打开负无穷开关
                setinf(-1)
                setValue(his[1])
                break;
            case -1: // 关闭负无穷开关
                setinf(0) // 关闭
                setValue(his) // 恢复原来的value状态
                break
        }
        // console.log(value)
    }

    const handleMaxInfChange = () => {
        switch (inf) {
            default:
            case 0:
                setinf(1)
                setHis(value)
                setValue(value[0])
                break;
            case 1:
                setinf(0)
                setValue(his)
                break;
            case -1:
                setinf(1)
                setValue(his[0])
                break
        }
    }

    /**
     * 从现有的状态构建表达式 
     * input:   leftbound value[0]  , value[1]  rightbound
     * example: [-inf,100) 
     */
    const constructExpress = () => {
        var res = ""
        res += leftbound
        if (inf === -1) {
            res += "-inf"
            res += ","
            res += value
        } else if (inf === 1) {
            res += value
            res += ","
            res += "inf"
        } else {
            res += (value[0] + "," + value[1])
        }
        res += rightbound
        return res
    }

    const handleScoreChange = event => {
        // if (event.target.value === "99") {
        //     console.log("1111")
        //     event.target.type = "text"
        //     event.target.setSelectionRange(0, 0)
        //     // event.target.type = "number"
        //     return
        // }
        setScore(event.target.value)
    }

    const handleRightboundChange = event => {
        setRightbound(event.target.value)
    }

    const handleLeftboundChange = event => {
        setLeftbound(event.target.value)
    }

    const handleLeftInputChange = event => {
        setInputError(false)

        if (inf !== 0) {
            setValue(event.target.value)
            return
        }
        setValue([event.target.value, value[1]])
    }

    const handleRightInputChange = event => {
        setInputError(false)
        if (inf !== 0) {
            setValue(event.target.value)
            return
        }
        setValue([value[0], event.target.value])
    }


    // const onMouseLeave = () => {
    //     var ex = constructExpress()
    //     onChange({
    //         [ex]: score
    //     })
    // }

    // const handleLeftInputBlur = event => {
    //     if (value[0] >= value[1]) {
    //         setValue([value[1] - 1, value[1]])
    //     }
    // }

    // const handleRightInputBlur = event => {
    //     if (value[1] <= value[0]) {
    //         setValue([value[0], value[0] + 1])
    //     }
    // }


    return (
        <Grid container className={classes.root} spacing={2}>
            {/* <div>{binscore}</div>
            <div>{express}</div> */}
            {/* <div>{JSON.stringify(minmax)}</div>
            <div>{JSON.stringify(value)}</div> */}
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
                            track={(inf === 1) ? "inverted" : "normal"} // 控制slider的方向 , 当正无穷的时候右边的数到最右边是有颜色的
                            // marks={marks}                               // slider 下方的标注 这里实现成动态的
                            value={typeof value === "object" ? [Number(value[0]), Number(value[1])] : Number(value)}                               // value有两种 number 和 [number,number], 分别表示无穷和区间
                            onChange={handleSliderChange}
                            step={0.01}
                            valueLabelDisplay="auto"
                            min={minmax[0]}
                            max={minmax[1]}
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
                            id="left-p-select"
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
                            value={typeof value === "object" ? value[0] : (inf === -1 ? "" : value)}
                            label={inf === -1 ? "-inf" : (leftbound === "[" ? "≥" : ">")}
                            disabled={inf === -1 ? true : false}
                            error={inputerror}
                            // margin="dense"
                            // multiline={true}
                            onChange={handleLeftInputChange}
                            // onBlur={handleLeftInputBlur}
                            inputProps={{
                                step: 1,
                                min: -9999999,
                                max: 9999999,
                                type: 'number',
                                // 'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        ,
                        </Grid>
                    <Grid item >
                        <TextField
                            // className={classes.input}
                            label={inf === 1 ? "+inf" : (rightbound === "]" ? "≤" : "<")}
                            value={typeof value === "object" ? value[1] : (inf === 1 ? "" : value)}
                            error={inputerror}
                            // margin="dense"
                            // multiline={true}
                            disabled={inf === 1 ? true : false}
                            onChange={handleRightInputChange}
                            // onBlur={handleRightInputBlur}
                            inputProps={{
                                step: 1,
                                min: -9999999,
                                max: 9999999,
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
                            id="right-p-select"
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
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    );
}

export default BinMathSetter