import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import FeatureDetail from "./FeatureDetail";
import axios from "axios";
import { useStateValue } from "../utils/state"
import BinSetter from "./BinSetter"
import { maxWidth } from '@material-ui/system';
import GroupSelect from "./GroupSelect"
import { sortMathIntervalBin, getMinMax } from '../utils/mathInterval';
import Grid from '@material-ui/core/Grid';
import DeleteForever from "@material-ui/icons/DeleteForever"


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 800,
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

const FeatureLists = ({ features }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0); // default feature list being selected
    const [{ sachima, user, message }, dispatch] = useStateValue();
    const [f, setF] = React.useState(features)
    const [isdel, setIsDelete] = React.useState(true)

    const featureNames = Object.keys(f)

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSelectChange = (event) => {
        console.log(event.target.value)
        setValue(featureNames.indexOf(event.target.value));
    };

    const handleNew = () => {
        var bin = f[featureNames[value]]["bin"]
        var m = getMinMax(bin).origin[1]
        bin[`[${(m + 0.1).toFixed(2)},inf)`] = 99
        dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "⚠️注意修改后请保存, 刷新页面会丢失修改" } })
    }

    const handleDelete = () => {
        setIsDelete(!isdel)
        // dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "⚠️注意修改后请保存, 刷新页面会丢失修改" } })
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
                <GroupSelect value={featureNames[value]} features={features} onSelect={handleSelectChange} />

                {/* {value} -> {Object.keys(features)[value]} */}
                {/* {features[Object.keys(features)[value]].bin.map((item, index) => (
                    <BinSetter data={} />
                ))} */}
                {/* {Object.entries(features).length === 0 ? "loading..." : JSON.stringify(features[Object.keys(features)[value]])} */}
                <div className={classes.buttons}>
                    <Button variant="contained" color="secondary" onClick={handleNew}>New</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button>Graph</Button>
                    <Button>Percent</Button>
                    <Button>Catalog</Button>
                    <Button>Weight</Button>
                    <Button>Bintype</Button>
                    <Button>Default</Button>
                    <Button>Pre</Button>
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
                                                    minmax={getMinMax(f[featureNames[value]]["bin"]).bounds} />
                                            </Grid>
                                            {isdel ? (
                                                <Button key={"delbtn-" + index} hidden={true} className={classes.delbtn}><DeleteForever color="secondary" /></Button>
                                            )
                                                : ""
                                            }
                                        </Grid>
                                    </Paper>
                                ))
                        ) : "aaaaaaa"
                }
                {/* {value ? "loading" : JSON.stringify(Object.keys(features[Object.keys(features)[value]]["bin"]))} */}
                {/* <Button variant="contained" color="primary">Save</Button> */}
            </FeatureDetail >
        </div >
    );
}

export default FeatureLists 
