import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import axios from "axios";
import { useStateValue } from "../utils/state"

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
    const [error, setError] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [message, setMessage] = useState("")
    const [{ count }, dispatch] = useStateValue();

    function TransitionRight(props) {
        return <Slide {...props} direction="right" />;
    }

    const sendMessage = (Transition, mes) => {
        setTransition(() => Transition);
        setOpen(true);
        setMessage(mes)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(checkError());
    };

    const checkError = () => {
        if (user.email === "" || user.password === "") {
            setError(true)
            return false
        }
        return true
    }

    const handleChange = event => {
        setError(false)
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const login = async () => {
        try {
            const result = await axios({
                method: "post",
                url: "http://localhost:8000/login",
                data: {
                    username: user.email,
                    password: user.password
                }
            });
            localStorage.setItem("token", result.data.token);
            sendMessage(TransitionRight, "登陆成功，欢迎" + user.email)
            dispatch({ type: "changeUser", newUser: { name: "admin", id: "admin", role: "admin" } })
            // setOpen(false)
        } catch (err) {
            console.log(err)
            sendMessage(TransitionRight, "登陆失败，请重试。或联系管理员")
        }
        setLoading(false)
    };

    useEffect(() => {
        if (loading) {
            login();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);



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
                        <Grid item xs={12}>
                            <TextField
                                error={error}
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
                                error={error}
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
                <Snackbar
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={transition}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                />
            </div>
        </Container>
    );
};

export default Login;
