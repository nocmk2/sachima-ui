import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FeatureDetail from "./FeatureDetail";
import axios from "axios";
import { useStateValue } from "../utils/state"
import BinSetter from "./BinSetter"
import { maxWidth } from '@material-ui/system';


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
        height: 400,
        width: maxWidth,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const VerticalTabs = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [feature, setFeature] = React.useState(props.items[value]);
    const [{ sachima }] = useStateValue()
    const [data, setData] = React.useState(0)

    // React.useEffect(() => {
    //     setFeature(props.items[value])
    // }, [])

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: "GET",
                url: `${sachima.url}/sachima/featuredetail/${feature}`,
                headers: { Authorization: "Bearer " + localStorage.token }
            });
            setData(result.data)
            console.log(data.bin)
        };

        fetchData();
    }, [feature]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFeature(props.items[newValue])
    };

    const getDetail = (item) => {


    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {props.items.map((item, index) => (
                    <Tab label={item} key={item} {...a11yProps(index)} />
                ))}
            </Tabs>
            {props.items.map((item, index) => (
                <FeatureDetail key={"tp" + item} value={value} index={index}>
                    {data.name}
                    {data.bin.a}
                    {data.bin.b}
                    <BinSetter />
                </FeatureDetail>
            ))}
        </div>
    );
}

export default VerticalTabs
