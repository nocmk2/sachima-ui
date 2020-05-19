import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useStateValue } from "utils/state"
import { useHistory } from "react-router-dom";

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
        background: 'linear-gradient(45deg, #0f4c81 30%, #21CBF3 90%)',//'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', //,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'

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
    const [{ sachima }, dispatch] = useStateValue();
    const history = useHistory()


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
                url: `${sachima.url}/login`,
                data: {
                    username: user.email,
                    password: user.password
                }
            });
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("email", user.email)
            dispatch({ type: "sendMessage", newMessage: { open: true, move: "down", info: "登陆成功，欢迎" + user.email } })
            dispatch({ type: "changeUser", newUser: { name: user.email, id: user.email, role: user.email } })
            history.push("/")
        } catch (err) {
            alert(err)
            dispatch({ type: "sendMessage", newMessage: { open: true, move: "down", info: "登陆失败，请重试。或联系管理员" } })
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
                    {/* <VerifiedUser /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    {sachima.login}
                </Typography>
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
                        disabled={loading ? true : false}
                    >
                        {loading ? "正在验证" : "登 陆"}
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
