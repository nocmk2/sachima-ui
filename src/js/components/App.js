import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import Switch from "@material-ui/core/Switch";
// import Paper from "@material-ui/core/Paper";
// import Grow from "@material-ui/core/Grow";
// import Chip from "@material-ui/core/Chip";
// import Button from "@material-ui/core/Button";
import Form from "./Form";
import PaperLists from "./PaperLists";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";

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

  return (
    <div className={classes.root}>
      {/* <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      /> */}
      <div className={classes.container}>
        <PaperLists datas={articles} />
      </div>
      <Form />
    </div>
  );
}

const Papers = connect(mapStateToProps)(ConnectedPapers);

export default Papers;
