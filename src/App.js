import React from "react";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TTT from "./components/TTT";
import Rules from "./components/Rules";
import Configs from "./components/Configs";
import Maps from "./components/Maps";
import DashBoard from "./components/DashBoard";

// const Reports = () => <TTT visible={true}></TTT>;
const App = () => {
  return (
    <Router>
      <Main>
        <Switch>
          <Route exact path="/Rules" component={Rules} />
          <Route exact path="/Configs" component={Configs} />
          <Route exact path="/Reports">
            <TTT visible={false} />
          </Route>
          <Route exact path="/Maps" component={Maps} />
          <Route exact path="/" component={DashBoard} />
        </Switch>
      </Main>
    </Router>
  );
};

export default App;
