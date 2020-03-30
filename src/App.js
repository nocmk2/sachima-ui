import React from "react";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TTT from "./components/TTT";
import ThreeDemo from "./components/threedemo/ThreeDemo";
import Rules from "./components/Rules";
import Login from "./components/Login";
import Configs from "./components/Configs";
// import BinSetter from "./components/BinSetter"
import Maps from "./components/Maps";
import DashBoard from "./components/DashBoard";

import { StateProvider } from "./utils/state"

// import userReducer from "./reducers/user"
// import basketReducer from "./reducers/basket"
// import countReducer from "./reducers/count"

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

  // const mainReducer = ({ count }, action) => {
  //   return {
  //     count: countReducer(count, action),
  //     // user: userReducer(user, action),
  //     // basket: basketReducer(basket, action)
  //   }
  // };


  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <Router>
        <Main>
          <Switch>
            <Route exact path="/ThreeDemo" component={ThreeDemo} />
            <Route exact path="/DashBoard" component={DashBoard} />
            <Route exact path="/Rules" component={Rules} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Configs" component={Configs} />
            {/* <Route exact path="/Test" component={BinSetter} /> */}
            <Route exact path="/Reports">
              <TTT visible={false} />
            </Route>
            <Route exact path="/Maps" component={Maps} />
            <Route exact path="/" component={DashBoard} />
          </Switch>
        </Main>
      </Router>
    </StateProvider>
  );
};

export default App;
