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

const GroupSelect = ({ value, features }) => {
    const classes = useStyles();

    const pre = features.reduce((pre, current, index) => {
        pre[current.catalog] = pre[current.catalog] || []
        pre[current.catalog].push(current.name)
        return pre
    }, {})

    return (
        <div>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="grouped-native-select">value</InputLabel> */}
                <Select native defaultValue={1} input={<Input id="grouped-native-select" />}>
                    {Object.keys(pre).map((catalog, index) => (
                        <optgroup key={index} label={catalog}>
                            {pre[catalog].map((item, index) => (
                                <option value={index} key={index}>{item}</option>
                            ))}
                        </optgroup>
                    ))}
                </Select>
            </FormControl>
        </div >
    );
}

export default GroupSelect
