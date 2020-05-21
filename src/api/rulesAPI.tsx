import axios from "axios"
import { RuleSummary, RuleWithSummary, RuleRaw } from 'types/types'

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