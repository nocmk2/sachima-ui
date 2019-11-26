import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FeatureDetail from "./FeatureDetail"


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
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const VerticalTabs = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

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
                {props.items.map((item, index) => (
                    <Tab label={item} key={item} {...a11yProps(index)} />
                ))}
            </Tabs>
            {props.items.map((item, index) => (
                <FeatureDetail key={"tp" + item} value={value} index={index}>
                    {item}
                </FeatureDetail>
            ))}
        </div>
    );
}

export default VerticalTabs
