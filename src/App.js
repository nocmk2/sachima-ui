import React, { Suspense, lazy } from "react";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { StateProvider } from "./utils/state"

const Cirp = lazy(() => import("./components/Cirp"))
const TTT = lazy(() => import("./components/TTT"));
const ThreeDemo = lazy(() => import("./components/threedemo/ThreeDemo"));
const Rules = lazy(() => import("./components/Rules"));
const Login = lazy(() => import("./components/Login"));
const Configs = lazy(() => import("./components/Configs"));
const Maps = lazy(() => import("./components/Maps"));
const DashBoard = lazy(() => import("./components/DashBoard"))



const App = () => {
  const initialState = {
    count: { one: 1 },
    user: { name: localStorage.getItem("email"), id: "", role: "aaa" },
    message: { open: false, move: "down", position: "top-right", info: "" },
    sachima: { url: "http://localhost:8000", login: "", message: "admin@sachima.ai" }
  };

  const mainReducer = (state, action) => {
    switch (action.type) {
      case "changeCount":
        return {
          ...state,
          count: action.newCount
        };
      case "changeUser":
        return {
          ...state,
          user: action.newUser
        };
      case "sendMessage":
        return {
          ...state,
          message: action.newMessage
        }
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <Router>
        <Main>
          <Suspense fallback={<div >Loading...</div>}>
            <Switch>
              <Route exact path="/ThreeDemo" component={ThreeDemo} />
              <Route exact path="/DashBoard" component={DashBoard} />
              <Route exact path="/Rules" component={Rules} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Configs" component={Configs} />
              <Route exact path="/Cirp" component={Cirp} />
              <Route exact path="/Reports">
                <TTT visible={false} />
              </Route>
              <Route exact path="/Maps" component={Maps} />
              <Route exact path="/" component={DashBoard} />
            </Switch>
          </Suspense>
        </Main>
      </Router>
    </StateProvider>
  );
};

export default App;
