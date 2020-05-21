import axios from "axios"
import { RuleSummary, RuleWithSummary, RuleRaw, User, Role, Object, UserRole, RoleObjectAction } from 'types/types'

const OPTIONS = {
    headers: { Authorization: "Bearer " + localStorage.token }
}

export const getRuleLists = async (): Promise<RuleSummary[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/rules`
    const ruleListsResponse = await axios.get<RuleSummary[]>(url, OPTIONS);
    return ruleListsResponse.data
}

export const getRule = async (name: string, version: string): Promise<RuleWithSummary> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/rule/${name}/${version}`
    const rule = await axios.get<RuleRaw>(url, OPTIONS);
    const ruleJSON = JSON.parse(rule.data.rule)
    return {
        name: rule.data.name,
        version: rule.data.version,
        comment: rule.data.comment,
        rule: ruleJSON
    }
}

export const getUsers = async (): Promise<User[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getusers`
    const result = await axios.get(url, OPTIONS);
    return result.data
}

export const getRoles = async (): Promise<Role[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getroles`
    const result = await axios.get(url, OPTIONS);
    return result.data
}

/**
 * 权限对象 
 */
export const getObjects = async (): Promise<Object[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getobjects`
    const result = await axios.get(url, OPTIONS);
    return result.data
}

export const getUserRole = async (): Promise<UserRole[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getuserrole`
    const result = await axios.get(url, OPTIONS);
    return result.data
}

/**
 * roleobject关系中分为write和read两种action，读写权限分离
 */
export const getRoleObjectAction = async (): Promise<RoleObjectAction[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/getroleobject`
    const result = await axios.get(url, OPTIONS);
    return result.data
}
