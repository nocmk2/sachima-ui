import { atom, selector } from 'recoil'
import { getRule, getRuleLists } from 'api/rulesAPI'

export const formulaState = atom({
    key: 'formulaState',
    default: '15/(1+Math.exp(0.22-9.88*x)'
})

export const curSelectedRuleIndexState = atom({
    key: 'curSelectedRuleInexState',
    default: 0
})

export const charCountState = selector({
    key: 'charCountState',
    get: ({ get }) => {
        const text = get(formulaState)
        return text.length
    }
})

export const ruleListsQuery = selector({
    key: 'ruleLists',
    get: async ({ get }) => {
        const response = await getRuleLists()
        return response
    }
})

export const ruleQuery = selector({
    key: 'rule',
    get: async ({ get }) => {
        const response = await getRule({ name: '商户评分卡', version: 'v0.1' })
        return response
    }
})