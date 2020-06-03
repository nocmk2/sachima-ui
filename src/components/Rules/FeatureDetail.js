import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteForever from "@material-ui/icons/DeleteForever";
import TabUnselected from "@material-ui/icons/TabUnselected";
import DeleteSweep from "@material-ui/icons/DeleteSweep";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Functions from '@material-ui/icons/Functions';
import Equalizer from "@material-ui/icons/Equalizer";
import OpacityIcon from '@material-ui/icons/Opacity';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import GavelRoundedIcon from '@material-ui/icons/GavelRounded';
import FlashAutoIcon from '@material-ui/icons/FlashAuto';
import BinMathSetter from "./BinMathSetter"
import BinTextSetter from "./BinTextSetter"
import { sortMathIntervalBin, getMinMax } from 'utils/mathInterval';

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, [])
    return update;
}

const useStyles = makeStyles(theme => ({
    // binsetter: {
    //     width: 1000
    // },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    binpaper: {
        '& > *': {
            margin: theme.spacing(1),
        },
        // width: 1200
    },
    log: {
        width: 250,
    },

}));
/**
 * 
 *  {{
    "bin": {
        "missing": -1,
        "全国多于五家": 5,
        "全国少于五家": -1,
        "无连锁": -2
    },
    "bintype": "text",
    "catalog": "MODEL",
    "default": -1,
    "name": "医院连锁数量",
    "percent": 0.1,
    "pre": "",
    "weight": 1
}} 
 */
function FeatureDetail({ currule, feature }) {
    const [defaultEdit, setDefaultEdit] = useState(false) // Default 的设置默认是处于Button状态
    const [defaultValue, setDefaultValue] = useState(0)
    const [isdel, setIsDelete] = useState(false)
    // const [bin, setBin] = useState(feature && feature.bin)

    useMemo(() => {
        const initDefaultValue = () => {
            return (
                feature && feature.default
            )
        }
        setDefaultValue(initDefaultValue())
    }, [feature])
    const classes = useStyles();


    // 点击New按钮的时候 应该在feature中新增一个数据
    const handleNew = () => {
        // binMath New 
        // var temp = Object.assign({}, f)
        // var bin = temp[featureNames[curval]]["bin"]
        // var k = "new rule" + Object.keys(bin).length
        // if (temp[featureNames[curval]]["bintype"] === "math") {
        //     let m = getMinMax(bin).origin[1] // eg: [1,9)  m = 9  origin[0] = 1
        //     console.log(m)
        //     k = `[${(m + 0.1).toFixed(2)},${(m + 0.2).toFixed(2)})`
        // }
        // bin[k] = 99
        // setNewData({
        //     ...newData,
        //     ...{
        //         [featureNames[curval]]: { ...newData[featureNames[curval]], ...{ [k]: { [k]: 99 } } }
        //     }
        // })
        // setF(temp)
        // if (Object.keys(bin).length > 8) {
        //     setHeight(height + 86)
        // }

        // binText New
    }
    const toggleDelete = () => {
        setIsDelete(!isdel)
    }

    const handleBinDel = (key) => {
        // var temp = Object.assign({}, f)
        // var bin = temp[featureNames[curval]]["bin"]
        // // console.log(Object.keys(bin).length)
        // if (Object.keys(bin).length > 1) {
        //     delete bin[key]
        //     // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "✅删除成功" } })
        // } else {
        //     dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "⚠️最后一条规则不能删除" } })
        // }
        // // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "⚠️最后一条规则不能删除" } })
        // setF(temp)
        // // console.log("=======")
        // // console.log(f)
    }
    const handleBinChange = (item, inchange) => {
        // alert('handleBinChange')
        //  item change to inchange

        // if (newData.hasOwnProperty("bin")) {
        //     alert("aaa")
        // }

        // setNewData({
        //     ...newData,
        //     ...{
        //         [featureNames[value]]: {
        //             bin: { ...inchange }
        //         }
        //     }
        // })
    }
    const handleClickDefault = () => {
        setDefaultEdit(true)
    }

    const handleDefaultOnBlur = () => {
        // setNewData({
        //     ...newData,
        //     ...{
        //         [featureNames[curval]]: { ...newData[featureNames[curval]], ...{ default: 9999999 } }
        //     }
        // })
        setDefaultEdit(false)
    }

    return (
        <>

            {/* {value} -> {Object.keys(features)[value]} */}
            {/* {features[Object.keys(features)[value]].bin.map((item, index) => (
                        <BinSetter data={} />
                    ))} */}
            {/* {Object.entries(features).length === 0 ? "loading..." : JSON.stringify(features[Object.keys(features)[value]])} */}
            {/* <div>{currule}</div> */}
            <div className={classes.buttons}>
                <Button startIcon={<AddCircleOutlineIcon />} variant="contained" color="secondary" onClick={handleNew}>New</Button>

                {
                    defaultEdit ?
                        <TextField autoFocus label="default" onChange={event => { setDefaultValue(event.target.value) }} value={defaultValue} onBlur={handleDefaultOnBlur}></TextField>
                        :
                        <Button startIcon={<GavelRoundedIcon />} onClick={handleClickDefault} >{"Default: " + defaultValue}</Button>
                }


                <Button startIcon={<AttachFileRoundedIcon />}>Pre</Button>
                {/* <Button>Percent</Button> */}
                <Button startIcon={<OpacityIcon />}>Catalog</Button>
                {/* <Button>Weight</Button> */}
                <Button startIcon={<Functions />}>Bintype</Button>
                <Button startIcon={<Equalizer />}>Graph</Button>
                <Button startIcon={<FlashAutoIcon />}>Auto</Button>
                <Button
                    // disabled={Object.keys(newData).length === 0 ? false : true}
                    onClick={toggleDelete}
                    startIcon={isdel ? <TabUnselected /> : <DeleteSweep />}
                    variant={isdel ? "outlined" : "text"}
                    color={isdel ? "secondary" : "default"}
                >
                    Delete
                        </Button>
                {/* <DeleteForever></DeleteForever> */}
                {/* <Switch size="small" checked={isdel} checkedIcon={<DeleteForever></DeleteForever>} edge="start" onChange={toggleDelete} /> */}

            </div>

            {/* <div>{JSON.stringify(feature)}</div> */}
            {/* <div>{JSON.stringify(bin)}</div> */}
            {
                feature === undefined ? "Loading..." :
                    feature.bintype === "math"
                        ?
                        (Object
                            .keys(feature.bin)
                            .sort(sortMathIntervalBin)
                            .map((item, index) => (
                                // item => "(-inf,100]" or (0, 20)
                                <Paper key={"freg-" + index} className={classes.binpaper}>
                                    {/* <div>{JSON.stringify(getMinMax(bin))}</div> */}
                                    {/* <div>{JSON.stringify(item)}</div> */}

                                    {/* <div>{JSON.stringify(bin[item])}</div> */}
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <BinMathSetter
                                                className={classes.binsetter}
                                                key={currule + "-" + item + "-" + index}
                                                express={item}   // [-inf,1.6)
                                                binscore={feature.bin[item]} // 23
                                                minmax={getMinMax(feature.bin).bounds} // 通过所有的bin计算出minmax
                                                onChange={(newData) => handleBinChange(item, newData)} //{"[-inf,1.6)": 23}
                                            />
                                        </Grid>
                                        {isdel ? (
                                            <Button
                                                key={"delbtn-" + index}
                                                className={classes.delbtn}
                                                onClick={() => handleBinDel(item)}
                                            >
                                                {/* icon */}
                                                <DeleteForever color="secondary" />
                                            </Button>
                                        )
                                            : ""
                                        }
                                    </Grid>
                                </Paper>
                            ))
                        )
                        :
                        (Object
                            .entries(feature["bin"])
                            .map((kv, index) => (
                                // item => "(-inf,100]" or (0, 20)
                                <Paper key={"freg-" + index} className={classes.binpaper}>
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            {/* {JSON.stringify(kv)} */}
                                            <BinTextSetter
                                                className={classes.binsetter}
                                                key={kv[0] + "-" + index}
                                                kv={kv}
                                                binscore={kv[1]}
                                                onChange={(newData) => handleBinChange(kv[0], newData)} //{"[-inf,1.6)": 23}
                                            />
                                        </Grid>
                                        {isdel ? (
                                            <Button
                                                key={"delbtn-" + index}
                                                className={classes.delbtn}
                                                onClick={() => handleBinDel(kv[0])}
                                            >
                                                <DeleteForever color="secondary" />
                                            </Button>
                                        )
                                            : ""
                                        }
                                    </Grid>
                                </Paper>
                            ))
                        )
            }
        </>
    );
}

// FeatureDetail.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

export default FeatureDetail