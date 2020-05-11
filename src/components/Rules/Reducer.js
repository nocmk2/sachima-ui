// const DoparseRuler = (s) => {
//   // console.log(s)
//   if (!s) return {}
//   // const features = a.feature
//   console.log(Object.keys(JSON.parse(s)))
//   return JSON.parse(s).rulers
// }
// const Do = (s) => {
//   // console.log(s)
//   if (!s) return {
//     features: null
//   }
//   // const features = a.feature
//   // console.log(Object.keys(JSON.parse(s)))
//   console.log('1111111')
//   let d = JSON.parse(s)
//   return {
//     features: d.feature,
//     rulers: d.rulers,
//     catalogs: d.catalog,
//     colname: d.colname,
//     datasrc: d.datasrc,
//     datatarget: d.datatarget
//   }
// }

export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_RULE":
            const imglength = state.rules.length
            return { ...state, rules: [...state.rules, { title: '评分卡模型x v0.1', img: `tech${imglength}.jpg` }] }
        // case "GET_RULES":
        //     return { ...state, rules: action.payload }
        // case "GET_FEATURES":
        //     return { ...state, features: DoparseFeature(action.payload) }
        default:
            return state
    }

}