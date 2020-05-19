import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RuleSummary, Rule, getRule, getRuleLists } from 'api/rulesAPI'
import { AppThunk } from 'app/store'

interface RulesState {
    // selectedName: string
    // selectedVersion: string
    selectedIndex: number
    currentRule: any
    isLoading: boolean
    error: string | null
}

const rulesInitialState: RulesState = {
    selectedIndex: 0,
    currentRule: {},
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
        getRulesStart: startLoading,

    }
})

// export const fetchRules = (): AppThunk => async dispatch => {
//     try {
//         dispatch()
//     }
// }

