import * as cons from '../constants/ActionTypes'

export const addFeature = feature => ({ type: cons.ADD_FEATURE, feature })
export const delFeature = key => ({ type: cons.DEL_FEATURE, key })
export const editFeature = (key, change) => ({ type: cons.EDIT_FEATURE, key, change })
export const addMathBin = (key, rule) => ({ type: cons.ADD_MATH_BIN, rule })
export const delMathBin = (key, express) => ({ type: cons.DEL_MATH_BIN, key, express })
export const editMathBin = (key, change) => ({ type: cons.EDIT_MATH_BIN, change })
export const addTextBin = (key, rule) => ({ type: cons.ADD_TEXT_BIN, key, rule })
export const delTextBin = (key, express) => ({ type: cons.DEL_TEXT_BIN, key, express })
export const editTextBin = (key, change) => ({ type: cons.EDIT_TEXT_BIN, change })