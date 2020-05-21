import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRule, getRuleLists } from 'api/api'
import { RuleSummary, RuleWithSummary, RulesState, Rule } from 'types/types'
import { AppThunk } from 'app/store'


const rulesInitialState: RulesState = {
    ruleSummarys: [],
    selectedIndex: 0,
    currentRule: { rule: null, name: '', version: '', comment: '' },
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
        getRuleSucess(state, { payload }: PayloadAction<RuleWithSummary>) {
            state.currentRule = payload
            state.isLoading = false
            state.error = null
        },
        getRuleFailed: loadingFailed,
        getRuleSummarysFailed: loadingFailed,
        setBin(state: RulesState, { payload }: PayloadAction<any>) {
            // state.currentRule.rule.feature[0].bin[0] = 123
            // if (state.currentRule.rule) {
            //     state.currentRule.rule.feature['approved_3M_amt'].bin['[-inf,1.0)'] = payload.value
            // }
            // alert('setBin slow!!!!!!!')
        }
    }
})

export const {
    getRuleStart,
    getRuleSummarysStart,
    getRuleSummarysSucess,
    getRuleSucess,
    getRuleFailed,
    getRuleSummarysFailed,
    setBin
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

