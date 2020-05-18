import axios from "axios"

export interface RuleSummary {
    name: string,
    version: string
}

export interface Rule extends RuleSummary {
    rule: string
}

const OPTIONS = {
    headers: { Authorization: "Bearer " + localStorage.token }
}

export const getRuleLists = async (): Promise<RuleSummary[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/rules`
    const ruleListsResponse = await axios.get<RuleSummary[]>(url, OPTIONS);
    return ruleListsResponse.data
}

export const getRule = async (name: string, version: string): Promise<Rule> => {
    const url = `${process.env.REACT_APP_BASE_URL}/sachima/rule/${name}/${version}`
    const rule = await axios.get<Rule>(url, OPTIONS);
    return {
        name: rule.data.name,
        version: rule.data.version,
        rule: JSON.parse(rule.data.rule)
    }
}