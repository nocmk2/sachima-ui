import { ADD_ARTICLE } from "../constants/action-types";
const initialState = {
  articles: [
    { title: "aaa", checked: true, elevation: 4 },
    { title: "bbb", checked: true, elevation: 4 },
    { title: "ccc", checked: true, elevation: 4 },
    { title: "ddd", checked: true, elevation: 4 },
    { title: "xxx", checked: true, elevation: 4 },
    { title: "yyy", checked: true, elevation: 4 },
    { title: "ccc1j", checked: true, elevation: 4 },
    { title: "cccefef", checked: true, elevation: 4 }
  ]
  // articles: []
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}
export default rootReducer;
