import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import Button from '@material-ui/core/Button';
// import { menus } from '../Menus'
// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },
// }));
const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: "100%",
    },
}));

const Authority = ({ initData, onChange }) => {
    const classes = useStyles();

    const [authority, setAuthority] = useState(initData)

    return (
        <>
            {/* {JSON.stringify(data)} */}
            {/* {JSON.stringify(menus)} */}
            <TextField
                margin="normal"
                id="id"
                label={'权限编号'}
                type="text"
                fullWidth
                value={authority.id}
            // variant="outlined"
            />
            <TextField
                margin="normal"
                id="name"
                label={'权限名称'}
                type="text"
                fullWidth
                value={authority.name}
            // variant="outlined"
            />
            <FormControl
                className={classes.formControl}>

                <InputLabel id="router-label" htmlFor="age-native-simple">设置可访问菜单</InputLabel>
                <Select
                    labelId="router-label"
                    id="router"
                    multiple
                    // label={"设置可访问菜单"}
                    value={[]}
                // onChange={handleChange}
                // inputProps={{
                //     name: 'age',
                //     id: 'age-native-simple',
                // }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            {/* <TextField
                margin="normal"
                id="name"
                label={'路由'}
                type="text"
                fullWidth
                value={''}
            // variant="outlined"
            /> */}
        </>
    )
}

export default Authority