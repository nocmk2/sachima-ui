import React, { createContext } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "../../utils/state"
// import SendMessage from "../utils/message"
import { useDataApi } from "../../apis/api"
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import RBAC from './RBAC'


const Now = () => {
    return Math.floor(Date.now() / 1000)
}

const Configs = () => {
    const [{ sachima }, dispatch] = useStateValue();
    const [{ data: users, isLoading: usersIsLoading }, getUsers] = useDataApi(`${sachima.url}/sachima/getusers`, []);
    const [{ data: roles, isLoading: rolesIsLoading }, getRoles] = useDataApi(`${sachima.url}/sachima/getroles`, []);
    const [{ data: objects, isLoading: objectsIsLoading }, getObjects] = useDataApi(`${sachima.url}/sachima/getobjects`, []);
    const [{ data: userrole, isLoading: userroleIsLoading }, getUserRole] = useDataApi(`${sachima.url}/sachima/getuserrole`, []);
    const [{ data: roleobject, isLoading: roleobjectIsLoading }, getRoleObject] = useDataApi(`${sachima.url}/sachima/getroleobject`, []);

    const isLoading = usersIsLoading && rolesIsLoading && objectsIsLoading && userroleIsLoading && roleobjectIsLoading
    return (
        <>
            <Button
                // variant="contained"
                onClick={() => {
                    dispatch({ type: "sendMessage", newMessage: { open: true, move: "left", info: "hahah" } })
                }}>message</Button>
            <Button
                // variant="contained"
                startIcon={<RefreshRoundedIcon />}
                onClick={() => {
                    getUsers(`${sachima.url}/sachima/getusers?time=${Now()}`);
                    // console.log(users)
                }}
            >getUsers
                {usersIsLoading && "loading..."}
            </Button>
            <Button
                // variant="contained"
                startIcon={<RefreshRoundedIcon />}
                onClick={() => {
                    getRoles(`${sachima.url}/sachima/getroles?time=${Now()}`);
                    // console.log(users)
                }}
            >getRoles
                {usersIsLoading && "loading..."}
            </Button>
            {isLoading ? (<div>loading...</div>) : (
                <Card>
                    <ctx.Provider value={{ hei: 'Tom', globalDispatch: dispatch, notifier: { getUsers, getRoles, getObjects, getUserRole, getRoleObject } }}>
                        <RBAC {...{ users, roles, objects, userrole, roleobject }} />
                    </ctx.Provider>
                </Card>
            )
            }
        </>)
}

export const ctx = createContext({})
export default Configs