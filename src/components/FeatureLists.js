import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import { maxWidth } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import DeleteForever from "@material-ui/icons/DeleteForever";
import TabUnselected from "@material-ui/icons/TabUnselected";
import DeleteSweep from "@material-ui/icons/DeleteSweep";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Functions from '@material-ui/icons/Functions';
import Equalizer from "@material-ui/icons/Equalizer";
import OpacityIcon from '@material-ui/icons/Opacity';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import GavelRoundedIcon from '@material-ui/icons/GavelRounded';
import CloudUpload from '@material-ui/icons/CloudUpload';
import FlashAutoIcon from '@material-ui/icons/FlashAuto';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Drawer from '@material-ui/core/Drawer';
import FeatureDetail from "./FeatureDetail";
import { useStateValue } from "../utils/state"
import BinMathSetter from "./BinMathSetter"
import BinTextSetter from "./BinTextSetter"
import GroupSelect from "./GroupSelect"
import { sortMathIntervalBin, getMinMax } from '../utils/mathInterval';
import { useDidUpdateEffect } from "../utils/tools"

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const FeatureLists = ({ features }) => {
    const [value, setValue] = React.useState(3); // default feature list being selected
    const [, dispatch] = useStateValue();
    const [f, setF] = React.useState(features)
    const [oldf, setOldF] = React.useState(features)
    const [isdel, setIsDelete] = React.useState(false)
    const [height, setHeight] = React.useState(800)
    const [featureAddButtonColor, setFeatureAddButtonColor] = React.useState("default")
    const [isedit, setIsEdit] = React.useState(false)
    const [newData, setNewData] = React.useState({})
    const [draweropen, setDrawerOpen] = React.useState(false)
    const [defaultEdit, setDefaultEdit] = React.useState(false)
    const [defaultValue, setDefaultValue] = React.useState("")
    // const [minmax, setMinmax] = React.useState([-1, 1])

    const featureNames = Object.keys(f)

    React.useEffect(() => {
        const initDefaultValue = () => {
            return (
                Object.keys(f).length === 0 ? 0 :
                    f[featureNames[value]]["default"]
            )
        }

        setDefaultValue(initDefaultValue())
    }
        , [value])


    // setDefaultValue(f[featureNames[value]]["default"])

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            height: height,
            width: maxWidth,
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
        },
        binsetter: {
            width: maxWidth
        },
        buttons: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        binpaper: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        delbtn: {
            '& > *': {
                margin: theme.spacing(1),
            },
            // position: "absolute",
            // margin: "auto"
        },
        log: {
            width: 250,
        },

    }));

    // React.useEffect(() => {
    //     console.log(f)
    //     // console.log(minmax)
    //     if (Object.keys(f).length > 0) {
    //         console.log("----------------------------=")
    //         console.log(getMinMax(f[featureNames[value]]["bin"]).bounds)
    //         // setMinmax(getMinMax(f[featureNames[value]]["bin"]).bounds)
    //     }
    // }, [f])

    const classes = useStyles();


    const handleFeatureAdd = () => {
        setIsEdit(!isedit)
    }

    const toggleFeatureAddButtonColor = () => {
        if (isedit) {
            setFeatureAddButtonColor("secondary")
        } else {
            setFeatureAddButtonColor(featureAddButtonColor === "default" ? "secondary" : "default")
        }
    }

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSelectChange = (event) => {
        console.log(event.target.value)
        setValue(featureNames.indexOf(event.target.value));
    };

    const handleNew = () => {
        // binMath New 
        var temp = Object.assign({}, f)
        var bin = temp[featureNames[value]]["bin"]
        var k = "new rule" + Object.keys(bin).length
        if (temp[featureNames[value]]["bintype"] === "math") {
            let m = getMinMax(bin).origin[1] // eg: [1,9)  m = 9  origin[0] = 1
            console.log(m)
            k = `[${(m + 0.1).toFixed(2)},${(m + 0.2).toFixed(2)})`
        }
        bin[k] = 99
        setNewData({
            ...newData,
            ...{
                [featureNames[value]]: { ...newData[featureNames[value]], ...{ [k]: { [k]: 99 } } }
            }
        })
        setF(temp)
        if (Object.keys(bin).length > 8) {
            setHeight(height + 86)
        }

        // binText New





    }

    const toggleDelete = () => {
        setIsDelete(!isdel)
    }

    const handleBinDel = (key) => {
        var temp = Object.assign({}, f)
        var bin = temp[featureNames[value]]["bin"]
        // console.log(Object.keys(bin).length)
        if (Object.keys(bin).length > 1) {
            delete bin[key]
            // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "✅删除成功" } })
        } else {
            dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "⚠️最后一条规则不能删除" } })
        }
        // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "⚠️最后一条规则不能删除" } })
        setF(temp)
        // console.log("=======")
        // console.log(f)
    }

    /* 
       {
           "1PD7_pct": {
               "[-inf,1.6)": { "[-inf,3.25)": 23 },
               "[1.6,4.7)": { "[1.6,3.23)": -10 },
               "[4.7,inf)": { "[3.47,inf)": -66 }
           },
           "company_found_years": {
               "[0,0.5)": { "[0,1.03)": 20 },
               "[0.5,1)": { "[0.5,2.91)": 25 }
           }
       }
    */

    const handleBinChange = (item, inchange) => {
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

    const handleSave = () => {
        for (const fname in newData) {
            console.log(fname)
            for (const n in newData[fname]) {
                var item = n
                console.log(n)
                var newD = newData[fname][n]
                console.log(newD)
                var temp = Object.assign({}, f)
                var bin = temp[fname]["bin"]
                delete bin[item]
                var newbin = { ...bin, ...newD }
                temp[fname]["bin"] = newbin
                setF(temp)
            }
        }
        setNewData({})
        dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "保存成功" } })
    }

    const handleClickDefault = () => {
        setDefaultEdit(true)
    }

    const handleDefaultOnBlur = () => {
        setNewData({
            ...newData,
            ...{
                [featureNames[value]]: { ...newData[featureNames[value]], ...{ default: 9999999 } }
            }
        })
        setDefaultEdit(false)
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value} // 0 1 2 3 4....
                onChange={handleTabChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {featureNames.map((item, index) => (
                    <Tab key={item} index={item} {...a11yProps(index)} label={
                        <Badge color="secondary" badgeContent={newData[item] === undefined ? undefined : Object.keys(newData[item]).length}>{item}</Badge>
                    } />
                ))}
            </Tabs>
            <FeatureDetail value={value} index={value} >
                <Grid container>
                    <Grid item>
                        {/* <Button variant="outlined" className={classes.delbtn}>+</Button> */}
                        <IconButton
                            onMouseEnter={toggleFeatureAddButtonColor}
                            onMouseLeave={toggleFeatureAddButtonColor}
                            onClick={handleFeatureAdd}
                            className={classes.delbtn}
                            size="small"
                            color={featureAddButtonColor}
                            aria-label="upload picture"
                            component="span">
                            {
                                // (isedit ? <CreateOutlinedIcon /> : <Style />)
                                (isedit ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />)
                            }
                        </IconButton>
                    </Grid>
                    <Grid item>
                        {isedit ?
                            <>
                                <TextField label="desc" value={f[featureNames[value]]["name"]} features={features} />
                                <TextField label="feature" value={featureNames[value]} features={features} />
                            </>
                            :
                            <GroupSelect value={featureNames[value]} features={features} onSelect={handleSelectChange} />
                        }
                    </Grid>
                </Grid>

                {/* {value} -> {Object.keys(features)[value]} */}
                {/* {features[Object.keys(features)[value]].bin.map((item, index) => (
                    <BinSetter data={} />
                ))} */}
                {/* {Object.entries(features).length === 0 ? "loading..." : JSON.stringify(features[Object.keys(features)[value]])} */}
                <div className={classes.buttons}>
                    <Button startIcon={<AddCircleOutlineIcon />} variant="contained" color="secondary" onClick={handleNew}>New</Button>

                    {
                        defaultEdit ?
                            <TextField autoFocus label="default" onChange={event => { setDefaultValue(event.target.value) }} value={defaultValue} onBlur={handleDefaultOnBlur}></TextField>
                            :
                            <Button startIcon={<GavelRoundedIcon />} onClick={handleClickDefault} >{"Default:" + defaultValue}</Button>
                    }


                    <Button startIcon={<AttachFileRoundedIcon />}>Pre</Button>
                    {/* <Button>Percent</Button> */}
                    <Button startIcon={<OpacityIcon />}>Catalog</Button>
                    {/* <Button>Weight</Button> */}
                    <Button startIcon={<Functions />}>Bintype</Button>
                    <Button startIcon={<Equalizer />}>Graph</Button>
                    <Button startIcon={<FlashAutoIcon />}>Auto</Button>
                    <Button
                        disabled={Object.keys(newData).length === 0 ? false : true}
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


                {
                    Object.keys(f).length === 0 ? "loading..." :
                        f[featureNames[value]]["bintype"] === "math"
                            ?
                            (Object
                                .keys(f[featureNames[value]]["bin"])
                                .sort(sortMathIntervalBin)
                                .map((item, index) => (
                                    // item => "(-inf,100]" or (0, 20)
                                    <Paper key={"freg-" + index} className={classes.binpaper}>
                                        <Grid container spacing={3}>
                                            <Grid item>
                                                <BinMathSetter
                                                    className={classes.binsetter}
                                                    key={item + "-" + index}
                                                    express={item}
                                                    binscore={f[featureNames[value]]["bin"][item]}
                                                    minmax={getMinMax(f[featureNames[value]]["bin"]).bounds} // 
                                                    onChange={(newData) => handleBinChange(item, newData)} //{"[-inf,1.6)": 23}
                                                />
                                            </Grid>
                                            {isdel ? (
                                                <Button
                                                    key={"delbtn-" + index}
                                                    className={classes.delbtn}
                                                    onClick={() => handleBinDel(item)}
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
                            :
                            (Object
                                .entries(f[featureNames[value]]["bin"])
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
                {/* {value ? "loading" : JSON.stringify(Object.keys(features[Object.keys(features)[value]]["bin"]))} */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUpload />}
                    disabled={Object.keys(newData).length === 0 ? true : false}
                    onClick={
                        handleSave
                    } >Save</Button>

                <Button color="primary"
                    disabled={Object.keys(newData).length === 0 ? true : false}
                    onClick={
                        () => {
                            setDrawerOpen(true)
                        }
                    } >ChangeLog</Button>
            </FeatureDetail >
            <Drawer anchor="right" open={draweropen} onClose={
                event => {
                    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                        return;
                    }
                    setDrawerOpen(false);
                }
            } >
                <div className={classes.log}>{JSON.stringify(newData)}</div>
            </Drawer>
            {/* <div>{JSON.stringify(f)}</div> */}
        </div >
    );
}

export default FeatureLists 
