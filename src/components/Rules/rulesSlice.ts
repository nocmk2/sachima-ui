import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RuleSummary, Rule, getRule, getRuleLists } from 'api/rulesAPI'
import { AppThunk } from 'app/store'

interface RulesState {
    ruleSummarys: RuleSummary[]
    selectedIndex: number
    currentRule: any
    isLoading: boolean
    error: string | null
}

const rulesInitialState: RulesState = {
    ruleSummarys: [],
    selectedIndex: 0,
    currentRule: { rule: '', name: '', version: '' },
    isLoading: false,
    error: null
}

const startLoading = (state: RulesState) => {
    state.isLoading = true
}

const loadingFailed = (state: RulesState, action: PayloadAction<string>) => {
    state.isLoading = false
    state.error = action.payload
}

const rules = createSlice({
    name: 'rules',
    initialState: rulesInitialState,
    reducers: {
        getRuleStart: startLoading,
        getRuleSummarysStart: startLoading,
        getRuleSummarysSucess(state, { payload }: PayloadAction<RuleSummary[]>) {
            state.ruleSummarys = payload
            state.isLoading = false
            state.error = null
        },
        getRuleSucess(state, { payload }: PayloadAction<Rule>) {
            state.currentRule = payload
            state.isLoading = false
            state.error = null
        },
        getRuleFailed: loadingFailed,
        getRuleSummarysFailed: loadingFailed,
    }
})

export const {
    getRuleStart,
    getRuleSummarysStart,
    getRuleSummarysSucess,
    getRuleSucess,
    getRuleFailed,
    getRuleSummarysFailed
} = rules.actions

export default rules.reducer

export const fetchRuleSummarys = (): AppThunk => async dispatch => {
    try {
        dispatch(getRuleSummarysStart())
        const ruleSummaryLists = await getRuleLists()
        dispatch(getRuleSummarysSucess(ruleSummaryLists))
    } catch (err) {
        dispatch(getRuleSummarysFailed(err.toString()))
    }
}

export const fetchRule = (
    name: string,
    version: string
): AppThunk => async dispatch => {
    try {
        dispatch(getRuleStart())
        const rule = await getRule(name, version)
        dispatch(getRuleSucess(rule))
    } catch (err) {
        dispatch(getRuleFailed(err.toString()))
    }
}

