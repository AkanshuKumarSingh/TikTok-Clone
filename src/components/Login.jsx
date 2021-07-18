import React, { useState, useContext } from 'react';
import { AuthContext } from "../contexts/AuthProvider";
import { Container, Grid, makeStyles, Paper, TextField, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    let { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("in login");
        try {
            setLoader(true);
            let res = await login(email, password);
            setLoader(false);
            console.log("Hi......");
            props.history.push("/");

        } catch (err) {
            setError(true);
            setLoader(false);

            setEmail("");
            setPassword("");
        }

    }

    let useStyles = makeStyles({
        centerDivs: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // background: 'white',
        },
        crousel: {
            height: "10rem",
            backgroundColor: "lightgray"
        },
        alignCenter: {
            justifyContent: "center"
        },
        centerElements: {
            display: "flex",
            flexDirection: "column",
        },
        image: {
            height: "6rem",
            backgroundSize: "contain"
        },
        fullWidth: {
            width: "100%"
        },
        mb: {
            marginBottom: "0.5rem"
        },
    })
    let classes = useStyles();


    return (
        <div className={classes.centerDivs}>
            <Container>
                <Grid container className={classes.alignCenter} spacing={2} >
                    <img
                        src="https://www.edigitalagency.com.au/wp-content/uploads/new-TikTok-logo-png-vertical-full-colour.png"
                        alt="tiktok" width="400" height="450" />


                    <Grid item sm={4}>
                        <Card variant="outlined">
                            <img
                                src="https://media-assets-04.thedrum.com/cache/images/thedrum-prod/s3-news-tmp-116020-tiktok--default--1280.png"
                                alt="tiktok" width="500" height="200" />


                            {/* className={classes.centerElements} */}
                            <CardContent className={classes.centerElements}>
                                <TextField
                                    id="outlined-basic"
                                    label="email" type="email"
                                    variant="outlined"
                                    value={email}
                                    display="block"
                                    className={classes.mb}
                                    size="small"
                                    onChange={(e) => { setEmail(e.target.value) }} />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    className={classes.mb}
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <LinkButton
                                    content="Forget Password?"
                                    route="/signup"
                                ></LinkButton>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loader} className={classes.fullWidth}>Login</Button>
                            </CardActions>
                        </Card>
                        <Card variant="outlined" >
                            <Typography style={{ textAlign: "center" }}>
                                Don't have an account?
                                <LinkButton
                                    content="Signup"
                                    route="/signup"
                                ></LinkButton>

                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}

function LinkButton(prop) {
    return (
        <Button variant="text" style={{ color: "blue" }}>
            <Link to={prop.route}>
                {prop.content}
            </Link>
        </Button>
    )
}

export default Login