import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { storage, firestore, database } from '../firebase';
import { Container, Grid, makeStyles, Paper, TextField, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function Signup(props) {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [file, setFile] = useState(null);
    let { signup } = useContext(AuthContext);


    function handleFileSubmit(e) {
        let file = e?.target?.files[0];
        if (file != null) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();

        try {
            setLoader(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            //fn1 = progress
            //fn2 = error
            //fn3 = success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }

            function fn2() {
                setError(error);
                setLoader(false);
            }

            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username,
                    createdAt: database.getUserTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
                setLoader(false);
                props.history.push("/");
            }

        } catch (err) {
            setError("");
            setLoader(false);
        }

    }

    useEffect(() => {
        console.log("Signup is rendered");
    })

    let useStyles = makeStyles({
        centerDivs: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
        textstyle: {
            color: "#5c5555"
        },
        input: {
            display: 'none',
        },
    })

    let classes = useStyles();


    return (
        <div className={classes.centerDivs}>
            <Container>
                <Grid container className={classes.alignCenter} spacing={2} >

                    <Grid item sm={4}>
                        <Card variant="outlined">
                        <img 
                        src="https://media-assets-04.thedrum.com/cache/images/thedrum-prod/s3-news-tmp-116020-tiktok--default--1280.png"
                        alt='tiktok'
                        width="500" height="150"
                    />
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
                                <TextField
                                    id="outlined-basic"
                                    label="Full Name"
                                    type="text"
                                    variant="outlined"
                                    value={username}
                                    display="block"
                                    className={classes.mb}
                                    size="small"
                                    onChange={(e) => { setUserName(e.target.value) }} />

                                <input className={classes.input} type="file" accept="image/*" id="icon-button-file"
                                    onChange={(e) => { handleFileSubmit(e) }} />
                                <label htmlFor="icon-button-file">
                                    <Button variant='outlined' color='secondary' style={{ marginRight: '8px' }} startIcon={<CloudUploadIcon></CloudUploadIcon>} className={classes.fullWidth} component='span'> Upload Profile Image
                                    </Button>
                                </label>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={handleSignup} disabled={loader} className={classes.fullWidth}>SignUp</Button>
                            </CardActions>
                        </Card>
                        <Card variant="outlined" className={classes.textstyle} >
                            <Typography style={{ textAlign: "center" }}>
                                By signing up,you agree to our terms,data policy and cookies policy
                            </Typography>
                        </Card>
                        <Card variant="outlined" >
                            <Typography style={{ textAlign: "center" }}>
                                Have an account?
                                <LinkButton
                                    content="Login"
                                    route="/login"
                                ></LinkButton>
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}

export default Signup;

function LinkButton(prop) {
    return (
        <Button variant="text" style={{ color: "blue" }}>
            <Link to={prop.route}>
                {prop.content}
            </Link>
        </Button>
    )
}
