import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import Switch from "@material-ui/core/Switch";
// import Paper from "@material-ui/core/Paper";
// import Grow from "@material-ui/core/Grow";
// import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Form from "./Form";
import Test from "./Test";
import PaperLists from "./PaperLists";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: 180
  },
  container: {
    display: "flex"
  }
}));

const mapStateToProps = state => {
  return { articles: state.articles };
};

function ConnectedPapers({ articles }) {
  const classes = useStyles();
  const [a, setA] = useState(false);

  return (
    <Router>
      <div className={classes.root}>
        <nav>
          <ul>
            <li>
              <Link to="/PaperLists">PaperLists</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <NavLink to="/Button" activeClassName="hurray">
                Button
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/PaperLists">
            <div className={classes.container}>
              <PaperLists datas={articles} />
            </div>
          </Route>
          <Route exact path="/">
            <Form />
          </Route>
          <Route path="/Button">
            <Button
              onClick={() => {
                setA(true);
              }}
            >
              ++++++++++
            </Button>
            {a && <Redirect to="/PaperLists" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Papers = connect(mapStateToProps)(ConnectedPapers);

export default Papers;
