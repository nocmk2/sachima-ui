import React, { Suspense, lazy } from "react";
import Main from "components/Main";
import ErrorBoundary from 'components/ErrorBoundary'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';

import { StateProvider } from "utils/state"
import { mainReducer } from 'reducers/mainReducers'

// import { RecoilRoot } from 'recoil';


// import Configs from './components/Configs/Configs'
// import DashBoard from './components/DashBoard'
// import Cirp from './components/Cirp'
// import TTT from './components/TTT'
// import ThreeDemo from './components/threedemo/ThreeDemo'
// import Rules from './components/Rules'
// import Login from './components/Login'
// import Maps from './components/Maps'

const Cirp = lazy(() => import("components/Cirp"))
const TTT = lazy(() => import("components/TTT"));
const ThreeDemo = lazy(() => import("components/threedemo/ThreeDemo"));
const Rules = lazy(() => import("components/Rules/Rules"));
const Login = lazy(() => import("components/Login"));
const Configs = lazy(() => import("components/Configs/Configs"));
const Maps = lazy(() => import("components/Maps"));
const DashBoard = lazy(() => import("components/DashBoard"))
const Search = lazy(() => import("components/Search"))
const Test = lazy(() => import("components/Test"))





const App = () => {
  const initialState = {
    count: { one: 1 },
    user: { name: localStorage.getItem("email"), id: "", role: "aaa" },
    message: { open: false, move: "down", position: "top-right", info: "" },
    sachima: { url: "http://localhost:8000", login: "", message: "admin@sachima.ai" }
  };

  // const mainReducer = (state, action) => {
  //   switch (action.type) {
  //     case "changeCount":
  //       return {
  //         ...state,
  //         count: action.newCount
  //       };
  //     case "changeUser":
  //       return {
  //         ...state,
  //         user: action.newUser
  //       };
  //     case "sendMessage":
  //       return {
  //         ...state,
  //         message: action.newMessage
  //       }
  //     default:
  //       return state;
  //   }
  // };

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      {/* <RecoilRoot> */}
      <Router>
        <Main>
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<LinearProgress color="primary" />}>
                <Route exact path="/ThreeDemo" component={ThreeDemo} />
                <Route exact path="/DashBoard" component={DashBoard} />
                <Route exact path="/Rules" component={Rules} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Configs" component={Configs} />
                <Route exact path="/Cirp" component={Cirp} />
                <Route exact path="/Test" component={Test} />
                <Route exact path="/Search" component={Search} />
                <Route exact path="/Reports">
                  <TTT visible={true} />
                </Route>
                <Route exact path="/Maps" component={Maps} />
                <Route exact path="/" component={Search} />
              </Suspense>
            </ErrorBoundary >
          </Switch>
        </Main>
      </Router>
      {/* </RecoilRoot> */}
    </StateProvider>
  );
};

export default App;
