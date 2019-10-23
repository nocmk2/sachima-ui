import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  root: {
    height: 180
  },
  container: {
    display: "flex"
  },
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

export default function SimpleGrow() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [elevation, setElevation] = React.useState(4);

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  const enterElevation = () => {
    setElevation(8);
    // this.props.elevation = 8;
  };
  const leaveElevation = () => {
    setElevation(4);
    // this.props.elevation = 4;
  };

  // const all_papers = [1, 2, 3].map(el => (

  // ))

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <div className={classes.container}>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <Paper
            elevation={elevation}
            className={classes.paper}
            onMouseEnter={enterElevation}
            onMouseLeave={leaveElevation}
          >
            <svg className={classes.svg}>
              <polygon
                points="0,100 50,00, 100,100"
                className={classes.polygon}
              />
            </svg>
          </Paper>
        </Grow>
      </div>
    </div>
  );
}
