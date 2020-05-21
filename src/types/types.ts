
export interface RuleSummary {
    name: string,
    version: string
    comment: string
}

export interface RuleRaw extends RuleSummary {
    rule: string
}

export interface RuleWithSummary extends RuleSummary {
    rule: Rule | null
}

export interface Rule {
    datasrc: {
        type: string,
        name: string,
        pk: string,
        where: string
    },
    datatarget: {
        type: string,
        table: string
    },
    colname: string
    rulers: {
        [key: string]: string
    },
    catalog: {
        [key: string]: {
            weight: number,
            init_score: number
        }
    },
    feature: {
        [key: string]: {
            name: string,
            pre: string,
            default: number,
            bintype: string,
            bin: {
                [key: string]: number
            },
            percent: number,
            weight: number,
            catalog: string
        }
    }
}

export interface RulesState {
    ruleSummarys: RuleSummary[]
    selectedIndex: number
    currentRule: RuleWithSummary
    isLoading: boolean
    error: string | null
}

export interface User {
    id: string
    name: string
}

export interface Role {
    id: string
    name: string
}

export interface Object {
    id: string
    name: string
}

export interface UserRole {
    user: string
    role: string
}

export interface RoleObjectAction {
    role: string
    obj: string
    action: string
}

