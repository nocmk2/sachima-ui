import { combineReducers } from '@reduxjs/toolkit'
import rulesReducer from 'components/Rules/rulesSlice'

const rootReducer = combineReducers({
    rules: rulesReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer