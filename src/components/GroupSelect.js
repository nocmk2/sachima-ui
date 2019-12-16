import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const GroupSelect = ({ value, features, onSelect }) => {
    const classes = useStyles();

    const pre = Object.keys(features).reduce((pre, k, index) => {
        pre[features[k].catalog] = pre[features[k].catalog] || []
        pre[features[k].catalog].push({ index: index, name: features[k].name, key: k })
        return pre
    }, {})

    return (
        <div>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="grouped-native-select">value</InputLabel> */}
                <Select native value={value} onChange={onSelect} input={<Input id="grouped-native-select" />}>
                    {Object.keys(pre).map((catalog, index) => (
                        <optgroup key={index} label={catalog}>
                            {pre[catalog].map((item, x) => (
                                <option value={item.key} key={item.key}>{item.name + " " + item.key}</option>
                            ))}
                        </optgroup>
                    ))}
                </Select>
            </FormControl>
        </div >
    );
}

export default GroupSelect
