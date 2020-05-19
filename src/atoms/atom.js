import { atom, selector } from 'recoil'

export const formulaState = atom({
    key: 'formulaState',
    default: '15/(1+Math.exp(0.22-9.88*x)'
})

export const charCountState = selector({
    key: 'charCountState',
    get: ({ get }) => {
        const text = get(formulaState)
        return text.length
    }
})
