import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
// import { connect } from "react-redux";

const PaperLists = ({ datas }) => {
  const useStyles = makeStyles(theme => ({
    paper: {
      margin: theme.spacing(1),
      height: 200,
      width: 180
    },
    svg: {
      width: 100,
      height: 100
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1
    }
  }));

  const classes = useStyles();
  // const [checked, setChecked] = React.useState(true);
  // const [elevation, setElevation] = React.useState(4);
  return datas.map((el, index) => {
    console.log(el);
    return (
      <Grow
        key={el.title}
        in={true} //{el.checked}
        style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: index * 1500 } : {})}
      >
        <Paper
          // elevation={el.elevation}
          className={classes.paper}
          // onMouseEnter={enterElevation}
          // onMouseLeave={leaveElevation}
        >
          <Button>{el.title}</Button>
        </Paper>
      </Grow>
    );
  });
};

export default PaperLists;
