import React, { useState, useMemo, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
// import { useStateValue } from '../../utils/state'
import { useStateValue } from '../../utils/state'
import TabPanel from '../TabPanel'
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import Slide from '@material-ui/core/Slide';
// import bgpic from '/public/contemplative-reptile.jpg';
// import { Motion, spring } from 'react-motion';
import { useSpring, animated } from 'react-spring';

// const AnimatedFeatureDetail = animated(FeatureDetail)

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
    dynamicbtn: {
        '& > *': {
            margin: theme.spacing(1),
        },
        // position: "absolute",
        // margin: "auto"
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    sidecard: {
        maxWidth: 345,
    }
}));
// TODO: 换成Rule 修复bug 完成save逻辑
const FeatureLists = ({ features }) => {
    console.log(features)
    const theme = useTheme();
    const [curval, setCurVal] = useState(0); // default feature list being selected
    // const [f, setF] = useState(features)
    const [height, setHeight] = useState(800)
    const [draweropen, setDrawerOpen] = useState(false)
    const [newData, setNewData] = useState({ x: 111, y: 222, z: 333 })
    const featureNames = useMemo(() => {
        return Object.keys(features)
    }, [features])
    const [isedit, setIsEdit] = useState(false)
    const [featureAddButtonColor, setFeatureAddButtonColor] = useState("default")
    const [, dispatch] = useStateValue();

    const [ani, setAni] = useState(true)
    const animation = useSpring({
        opacity: ani ? 1 : 0,
        marginLeft: ani ? 0 : 500
        // from: { marginTop: 0 },
        // to: { marginTop: -500 }
    });
    useEffect(() => {
        setTimeout(() => {
            setAni(true)
        }, 500)
    }, [ani])
    // const animation = useSpring({
    //     from: { opacity: 0, color: 'red' },
    //     to: [
    //         { opacity: 1, color: '#ffaaee' },
    //         { opacity: 1, color: 'red' },
    //         { opacity: .5, color: '#008000' },
    //         { opacity: .8, color: 'black' }
    //     ]
    // });
    // const [minmax, setMinmax] = React.useState([-1, 1])
    // setDefaultValue(f[featureNames[value]]["default"])
    const handleSelectChange = (event) => {
        console.log(event.target.value)
        setCurVal(featureNames.indexOf(event.target.value));
    };


    const classes = useStyles();

    const handleTabChange = (event, newValue) => {
        setAni(false)
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
                var temp = Object.assign({}, features)
                var bin = temp[fname]["bin"]
                delete bin[item]
                var newbin = { ...bin, ...newD }
                temp[fname]["bin"] = newbin
                // setF(temp)
            }
        }
        setNewData({})
        dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "保存成功" } })
    }


    const handleFeatureAdd = () => {
        setIsEdit(!isedit)
    }
    const handleChangeIndex = (index) => {
        setCurVal(index);
    };
    return (
        <div className={classes.root}>
            <Grid container>
                <Card className={classes.sidecard}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={process.env.PUBLIC_URL + 'img/tech3.jpg'}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Acard stable v0.13
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                用于申请审批评分
                            </Typography>
                            {/* <animated.h1 style={multiAnimation}>Hello World</animated.h1> */}
                        </CardContent>
                    </CardActionArea>
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
                        {isedit ?
                            <>
                                <TextField label="desc" value={features[featureNames[curval]]["name"]} features={features} />
                                <TextField label="feature" value={featureNames[curval]} features={features} />
                            </>
                            :
                            <GroupSelect value={featureNames[curval]} features={features} onSelect={handleSelectChange} />
                        }
                    </Grid>
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
                    {/* <Grid item>
                        {JSON.stringify(f)}
                    </Grid> */}
                </Card>
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
                {/* <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={curval}
                    onChangeIndex={handleChangeIndex}
                > */}
                {/* {featureNames.map((item, index) =>
                    ( */}
                {/* <Motion defaultStyle={{ x: 0 }} style={{ x: spring(10) }}>
                    {value => <div>{value.x}</div>}
                </Motion> */}
                <TabPanel value={curval} index={curval} dir={theme.direction} key={curval}>
                    {/* AnimatedFeatureDetail */}
                    <animated.div style={animation}>
                        <FeatureDetail feature={features[featureNames[curval]]} />
                        {/* <div>{curval}</div> */}
                    </animated.div>
                    {/* <FeatureDetail feature={f[featureNames[curval]]} /> */}
                </TabPanel>
                {/* )
                )} */}
                {/* <TabPanel value={curval || 0} index={curval || 0} dir={theme.direction}>
                    <FeatureDetail feature={f[featureNames[curval]]} />
                </TabPanel> */}
                {/* </SwipeableViews> */}
            </Grid>
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
