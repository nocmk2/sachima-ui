import axios from "axios"

export interface RuleSummary {
    name: string,
    version: string
}

const getRuleLists = async (): Promise<RuleSummary[]> => {
    const url = `${process.env.BASE_URL}/sachima/rules`
    const options = {
        headers: { Authorization: "Bearer " + localStorage.token }
    }
    const ruleListsResponse = await axios.get<RuleSummary[]>(url, options);
    return ruleListsResponse.data
}