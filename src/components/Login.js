import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: ""
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
  };

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  useEffect(() => {
    console.log("logging in ");
    console.log(loading);
    if (loading) {
      login();
    }
  }, [loading]);

  const login = async () => {
    console.log(user.email);
    console.log(user.password);
    const result = await axios({
      method: "post",
      url: "http://localhost:8000/login",
      data: {
        username: user.email,
        password: user.password
      }
    });
    localStorage.setItem("token", result.data.token);
    console.log("set localStorage");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUser />
        </Avatar>
        {/* <Typography component="h1" variant="h5">
          登陆
        </Typography> */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                // variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="email"
                label="用户名"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            提交
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
