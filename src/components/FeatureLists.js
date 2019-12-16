import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FeatureDetail from "./FeatureDetail";
import axios from "axios";
import { useStateValue } from "../utils/state"
import BinSetter from "./BinSetter"
import { maxWidth } from '@material-ui/system';
import GroupSelect from "./GroupSelect"


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
        height: 500,
        width: maxWidth,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const FeatureLists = ({ features }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(5);
    const [{ sachima }] = useStateValue()
    const [currentFeature, setCurrentFeature] = React.useState("")

    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await axios({
    //                 method: "GET",
    //                 url: `${sachima.url}/sachima/featuredetail/${items[value]}`,
    //                 headers: { Authorization: "Bearer " + localStorage.token }
    //             });
    //             setData(result.data)
    //             console.log(result.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     };

    //     fetchData();
    // }, [value]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSelectChange = (event) => {
        console.log(event.target.value)
        setValue(Object.keys(features).indexOf(event.target.value));
    };

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
                {Object.keys(features).map((item, index) => (
                    <Tab label={item} key={item} index={item} {...a11yProps(index)} />
                ))}
            </Tabs>
            <FeatureDetail value={value} index={value} >
                <GroupSelect value={Object.keys(features)[value]} features={features} onSelect={handleSelectChange} />

                {/* {value} -> {Object.keys(features)[value]} */}
                {/* <BinSetter data={data.bin} /> */}
            </FeatureDetail >
        </div >
    );
}

export default FeatureLists 
