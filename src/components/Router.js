import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/detail" component={Detail} />
    </Switch>
  </HashRouter>
);

export default Router;
