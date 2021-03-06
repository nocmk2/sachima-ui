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
import { useStateValue } from 'utils/state'
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
import TabPanel from 'common/TabPanel'
import Others from './Others'

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
    featureDetail: {
        backgroundColor: '#ff88ff'
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
// TODO:  完成save逻辑
const Rule = ({ ruleindex, name, version, comment, feature, datasrc, datatarget, colname, rulers, catalog }) => {
    const theme = useTheme();
    const [curval, setCurVal] = useState(0); // default feature list being selected
    const [height, setHeight] = useState(800)
    const [draweropen, setDrawerOpen] = useState(false)
    const [newData, setNewData] = useState({ x: 111, y: 222, z: 333 })
    const featureNames = useMemo(() => {
        return Object.keys(feature)
    }, [feature])
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

    /**
     * 评分卡列表切换的话tab选择第一个feature
     * TODO:jijfiejf
     */
    useEffect(() => {
        setCurVal(0)
    }, [ruleindex])

    const handleSelectChange = (event) => {
        // console.log(event.target.value)
        setCurVal(featureNames.indexOf(event.target.value));
    };


    const classes = useStyles();

    const handleTabChange = (event, newValue) => {
        setAni(false)
        setCurVal(newValue);
    };

    const dataChangeNumber = () => null

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
                var temp = Object.assign({}, feature)
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
                            image={process.env.PUBLIC_URL + `img/tech${ruleindex}.jpg`}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {`${name} ${version}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`${comment}`}
                            </Typography>
                            {/* <animated.h1 style={multiAnimation}>Hello World</animated.h1> */}
                        </CardContent>
                    </CardActionArea>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudUpload />}
                            // disabled={Object.keys(newData).length === 0 ? true : false}
                            onClick={
                                handleSave
                            } >Save</Button>
                        <Button > Run </Button>
                        <Button > API </Button>

                        <Button color="primary"
                            onClick={
                                () => {
                                    setDrawerOpen(true)
                                }
                            } >ChangeLog</Button>
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
                                (isedit ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />)
                            }
                        </IconButton>
                        {isedit ?
                            <>
                                <TextField label="desc" value={feature[featureNames[curval]]["name"]} features={feature} />
                                <TextField label="feature" value={featureNames[curval]} features={feature} />
                            </>
                            :
                            <GroupSelect value={featureNames[curval]} features={feature} onSelect={handleSelectChange} />
                        }
                    </Grid>
                    <Others data={{ datasrc, datatarget, colname, rulers, catalog }}></Others>
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
                                //TODO: 修改数量显示
                                // badgeContent={newData[item] === undefined ? undefined : Object.keys(newData[item]).length}
                                badgeContent={dataChangeNumber()}
                            >
                                {item}
                            </Badge>
                        } />
                    ))}
                </Tabs>
                <TabPanel value={curval} index={curval} dir={theme.direction} key={curval}>
                    {/* AnimatedFeatureDetail */}
                    <animated.div style={animation}>
                        <FeatureDetail currule={ruleindex} feature={feature[featureNames[curval]]} />
                        {/* <div>{curval}</div> */}
                    </animated.div>
                </TabPanel>
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

export default Rule 
