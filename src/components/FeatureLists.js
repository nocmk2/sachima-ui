import React, { useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { maxWidth } from '@material-ui/system';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import FeatureDetail from "./FeatureDetail";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import GroupSelect from "./GroupSelect"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { useStateValue } from '../utils/state'
import TabPanel from './TabPanel'

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
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
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 800,
        // width: maxWidth,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const FeatureLists = ({ features }) => {
    const [curval, setCurVal] = useState(3); // default feature list being selected
    const [f, setF] = useState(features)
    const [height, setHeight] = useState(800)
    const [draweropen, setDrawerOpen] = useState(false)
    const [newData, setNewData] = useState({ x: 111, y: 222, z: 333 })
    const featureNames = useMemo(() => {
        return Object.keys(f)
    }, [f])
    const [isedit, setIsEdit] = useState(false)
    const [featureAddButtonColor, setFeatureAddButtonColor] = useState("default")
    const [, dispatch] = useStateValue();
    // const [minmax, setMinmax] = React.useState([-1, 1])
    // setDefaultValue(f[featureNames[value]]["default"])
    const handleSelectChange = (event) => {
        console.log(event.target.value)
        setCurVal(featureNames.indexOf(event.target.value));
    };


    const classes = useStyles();

    const handleTabChange = (event, newValue) => {
        setCurVal(newValue);
    };

    const dataChangeNumber = () => 3

    const toggleFeatureAddButtonColor = () => {
        if (isedit) {
            setFeatureAddButtonColor("secondary")
        } else {
            setFeatureAddButtonColor(featureAddButtonColor === "default" ? "secondary" : "default")
        }
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


    const handleFeatureAdd = () => {
        setIsEdit(!isedit)
    }
    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={curval} // 0 1 2 3 4....
                onChange={handleTabChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {featureNames.map((item, index) => (
                    <Tab key={item} {...a11yProps(index)} index={item} label={
                        <Badge
                            color="secondary"
                            // badgeContent={newData[item] === undefined ? undefined : Object.keys(newData[item]).length}
                            badgeContent={dataChangeNumber()}
                        >
                            {item}
                        </Badge>
                    } />
                ))}
            </Tabs>
            <TabPanel value={curval || 0} index={curval || 0}>
                <Grid container>
                    <Grid item>
                        <IconButton
                            onMouseEnter={toggleFeatureAddButtonColor}
                            onMouseLeave={toggleFeatureAddButtonColor}
                            onClick={handleFeatureAdd}
                            className={classes.dynamicbtn}
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
                                <TextField label="desc" value={f[featureNames[curval]]["name"]} features={features} />
                                <TextField label="feature" value={featureNames[curval]} features={features} />
                            </>
                            :
                            <GroupSelect value={featureNames[curval]} features={features} onSelect={handleSelectChange} />
                        }
                    </Grid>
                </Grid>
                <FeatureDetail feature={f[featureNames[curval]]} />
                <Grid container>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUpload />}
                            // disabled={Object.keys(newData).length === 0 ? true : false}
                            onClick={
                                handleSave
                            } >Save</Button>

                        <Button color="primary"
                            // disabled={Object.keys(newData).length === 0 ? true : false}
                            onClick={
                                () => {
                                    setDrawerOpen(true)
                                }
                            } >ChangeLog</Button>
                    </Grid>
                </Grid>
            </TabPanel>
            {/* <Button variant="outlined" className={classes.delbtn}>+</Button> */}
            {/* <FeatureDetail feature={f[featureNames[curval]]} /> */}
            {/* <div>{JSON.stringify(f[featureNames[curval]])}</div> */}
            < Drawer anchor="right" open={draweropen} onClose={
                event => {
                    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                        return;
                    }
                    setDrawerOpen(false);
                }
            } >
                <div className={classes.log}>{JSON.stringify(newData)}</div>
            </Drawer >
            {/* <div>{JSON.stringify(f)}</div> */}
        </div >
    );
}

export default FeatureLists 
