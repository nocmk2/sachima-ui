import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import FeatureDetail from "./FeatureDetail";
import { useStateValue } from "../utils/state"
import BinSetter from "./BinSetter"
import { maxWidth } from '@material-ui/system';
import GroupSelect from "./GroupSelect"
import { sortMathIntervalBin, getMinMax } from '../utils/mathInterval';
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
import Style from '@material-ui/icons/Style';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const FeatureLists = ({ features }) => {
    const [value, setValue] = React.useState(0); // default feature list being selected
    const [, dispatch] = useStateValue();
    const [f, setF] = React.useState(features)
    const [isdel, setIsDelete] = React.useState(false)
    const [height, setHeight] = React.useState(800)
    const [featureAddButtonColor, setFeatureAddButtonColor] = React.useState("default")
    const [isedit, setIsEdit] = React.useState(false)
    const [minmax, setMinmax] = React.useState([])

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
        }

    }));

    React.useEffect(() => {
        console.log(f)
    }, [f])

    const classes = useStyles();
    const featureNames = Object.keys(f)


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
        var temp = Object.assign({}, f)
        var bin = temp[featureNames[value]]["bin"]
        var m = getMinMax(bin).origin[1] // eg: [1,9)  m = 9  origin[0] = 1
        bin[`[${(m + 0.1).toFixed(2)},inf)`] = 99
        setF(temp)
        if (Object.keys(bin).length > 8) {
            setHeight(height + 86)
        }
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
        setF(temp)
    }

    const handleBinChange = newData => {
        var temp = Object.assign({}, f)
        var bin = temp[featureNames[value]]["bin"]
        var newbin = { ...bin, ...newData }
        console.log('bin', bin)
        console.log('newData', newData)
        console.log('newbin', newbin)
        temp[featureNames[value]]["bin"] = newbin
        setF(temp)
        console.log(temp)
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
                    <Tab label={item} key={item} index={item} {...a11yProps(index)} />
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
                    <Button startIcon={<GavelRoundedIcon />}>Default</Button>
                    <Button startIcon={<AttachFileRoundedIcon />}>Pre</Button>
                    {/* <Button>Percent</Button> */}
                    <Button startIcon={<OpacityIcon />}>Catalog</Button>
                    {/* <Button>Weight</Button> */}
                    <Button startIcon={<Functions />}>Bintype</Button>
                    <Button startIcon={<Equalizer />}>Graph</Button>
                    <Button startIcon={<FlashAutoIcon />}>Auto</Button>
                    <Button
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
                    Object.entries(f).length === 0 ? "loading..." :
                        f[featureNames[value]]["bintype"] === "math" ? (
                            Object
                                .keys(f[featureNames[value]]["bin"])
                                .sort(sortMathIntervalBin)
                                .map((item, index) => (
                                    // item => "(-inf,100]" or (0, 20)
                                    <Paper key={"freg-" + index} className={classes.binpaper}>
                                        <Grid container spacing={3}>
                                            <Grid item>
                                                <BinSetter
                                                    className={classes.binsetter}
                                                    key={item + "-" + index}
                                                    express={item}
                                                    binscore={f[featureNames[value]]["bin"][item]}
                                                    minmax={getMinMax(f[featureNames[value]]["bin"]).bounds}
                                                    onChange={handleBinChange} //{"[-inf,1.6)": 23}
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
                        ) : "aaaaaaa"
                }
                {/* {value ? "loading" : JSON.stringify(Object.keys(features[Object.keys(features)[value]]["bin"]))} */}
                <Button variant="contained" color="primary" startIcon={<CloudUpload />}>Save</Button>
            </FeatureDetail >
        </div >
    );
}

export default FeatureLists 
