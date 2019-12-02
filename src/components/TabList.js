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

const VerticalTabs = ({ items }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(5);
    const [{ sachima }] = useStateValue()
    const [data, setData] = React.useState(0)


    // React.useEffect(() => {
    //     setFeature(props.items[value])
    // }, [value])

    React.useEffect(() => {
        console.log("items[value] => " + items[value])
        const fetchData = async () => {
            try {
                const result = await axios({
                    method: "GET",
                    url: `${sachima.url}/sachima/featuredetail/${items[value]}`,
                    headers: { Authorization: "Bearer " + localStorage.token }
                });
                setData(result.data)
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                {items.map((item, index) => (
                    <Tab label={item} key={item} {...a11yProps(index)} />
                ))}
            </Tabs>
            {items.map((item, index) => (
                <FeatureDetail key={"tp" + item} value={value} index={index}>
                    {data.name}
                    <BinSetter />
                </FeatureDetail>
            ))}
        </div>
    );
}

export default VerticalTabs
