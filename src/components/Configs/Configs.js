import React, { createContext } from "react";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useStateValue } from "utils/state"
// import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import RBAC from './RBAC'
import { useFetchProfileData } from 'api/api'

// const source = fetchProfileData()

const Configs = () => {
    const source = useFetchProfileData()
    // useInterceptor()
    // const [{ sachima }, dispatch] = useStateValue();
    // const [{ data: users, isLoading: usersIsLoading }, getUsers] = useReadApi(`${sachima.url}/sachima/getusers`, []);
    // const [{ data: roles, isLoading: rolesIsLoading }, getRoles] = useReadApi(`${sachima.url}/sachima/getroles`, []);
    // const [{ data: objects, isLoading: objectsIsLoading }, getObjects] = useReadApi(`${sachima.url}/sachima/getobjects`, []);
    // const [{ data: userrole, isLoading: userroleIsLoading }, getUserRole] = useReadApi(`${sachima.url}/sachima/getuserrole`, []);
    // const [{ data: roleobject, isLoading: roleobjectIsLoading }, getRoleObject] = useReadApi(`${sachima.url}/sachima/getroleobject`, []);
    // const [{ setter: setUser, isLoading: isSetUserWaiting }] = useWriteApi(`${sachima.url}/sachima/adduser`, {}, {})

    // const isLoading = usersIsLoading && rolesIsLoading && objectsIsLoading && userroleIsLoading && roleobjectIsLoading
    return (
        <>
            <Card>
                <ctx.Provider value={{
                    // sachima: sachima,
                    // globalDispatch: dispatch,
                    // notifier: { refresher }
                }}>
                    {/* {JSON.stringify(data[0].read())} */}
                    {/* {JSON.stringify(data)} */}
                    {source ?
                        (
                            <RBAC
                                users={source.users.read()}
                                roles={source.roles.read()}
                                objects={source.objects.read()}
                                userrole={source.userRole.read()}
                                roleobject={source.roleObject.read()}
                            />
                            // <h1>12dwd</h1>
                        )
                        : 'loading...'}
                    {/* {typeof source} */}
                </ctx.Provider>
            </Card>
        </>
    )
}

export const ctx = createContext({})
export default Configs