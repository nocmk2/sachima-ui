import { atom, selector, selectorFamily } from 'recoil'
import { getRule, getRuleLists } from 'api/api'

export const formulaState = atom({
    key: 'formulaState',
    default: '15/(1+Math.exp(0.22-9.88*x)'
})

export const curSelectedRuleIndexState = atom({
    key: 'curSelectedRuleIndexState',
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

// export const ruleSummaryQuery = selectorFamily({
//     key: 'ruleSummaryQuery',
//     get: id => async ({ get }) => {
//         const response = await getRuleLists()
//         return response[id]
//     }
// })

// export const ruleSummaryQuery = selector({
//     key: 'RuleSummaryQuery',
//     get: ID => async ({ get }) => {
//         const response = await getRuleLists();
//         const name = response.name
//         const version = response.version
//         return {
//             name: name,
//             version: version
//         };
//     },
// });


export const ruleQuery = selector({
    key: 'rule',
    get: (id) => async ({ get }) => {
        const response = await getRule()
        return response
    }
})