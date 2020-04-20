import React, { useEffect } from 'react'

import * as API from "./api"
import { useStateValue } from "../utils/state"

const useConfigPageSource = () => {

    const [{ sachima }, dispatch] = useStateValue();
    const [{ users, usersIsLoading }, fetchUsers] = API.useDataApi(`${sachima.url}/sachima/getusers`, [])
    const [{ roles, rolesIsLoading }, fetchRoles] = API.useDataApi(`${sachima.url}/sachima/getroles`, [])
    const [{ objects, objectsIsLoading }, fetchObjects] = API.useDataApi(`${sachima.url}/sachima/getobjects`, [])
    const [{ userrole, userRoleIsLoading }, fetchUserRole] = API.useDataApi(`${sachima.url}/sachima/getuserrole`, [])
    const [{ roleobject, roleObjectIsLoading }, fetchRoleObject] = API.useDataApi(`${sachima.url}/sachima/getroleobject`, [])

    useEffect(() => { }, [])

    return {
        users, roles, objects, userrole, roleobject,
        usersIsLoading, rolesIsLoading, objectsIsLoading, userRoleIsLoading,
        fetchUsers, fetchRoles, fetchObjects, fetchUserRole, fetchRoleObject
    }

}
export default useConfigPageSource