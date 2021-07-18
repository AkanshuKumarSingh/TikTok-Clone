import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { storage, firestore, database } from '../firebase';

function Profile(props) {
    // createdAt: t
    // nanoseconds: 479000000
    // seconds: 1625588073
    // email: "aks@gmail.com"
    // postIds: Array(2)
    // 0: "8Q66M13ig95ICnjOyGdj"
    // 1: "0580GdqRZspyNT929JTQ"
    // length: 2
    // __proto__: Array(0)
    // profileUrl: "https://firebasestorage.googleapis.com/v0/b/fir-auth-6c630.appspot.com/o/users%2F8gaSbHLVq8hLorDn2bKVWWzNHLt1%2FprofileImage?alt=media&token=adb5b1dd-d0d2-4856-af33-84b23d2aeff8"
    // userId: "8gaSbHLVq8hLorDn2bKVWWzNHLt1"
    // username: "aks"
    const [videos, setVideos] = useState([]);

    useEffect(async () => {
        console.log("Profile is rendered");
        console.log(props.location.state.data);
        let allDocIds = props.location.state.data.postIds;

        let allVideosUrl = [];
        for (let i = 0; i < allDocIds.length; i++) {
            let docId = allDocIds[i];
            let obj = await database.posts.doc(docId).get();
            allVideosUrl.push({
                url: obj.data().url,
                id: docId
            })
        }

        // let dataObject = await database.users.doc(currentUser.uid).get();
        // console.log(dataObject.data());
        // setUser(dataObject.data());
        console.log(allVideosUrl);
        setVideos(allVideosUrl);
    }, [])

    const useStyles = makeStyles((theme) => ({
        main: {
            backgroundImage: 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
            height: '150vh',
            padding:'2rem',
        },
        root: {
            display: 'flex',
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0),
            },

        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(25),
            height: theme.spacing(25),
        },
        videos: {
            height: "40vh",
            width: "25vh",
        },
        textStyle: {
            fontFamily: 'cursive',
        }
    }));



    const classes = useStyles();

    return (
        <div className={classes.main}>
            <div className={classes.root}>
                <Card style={{
                    display: 'flex',
                    padding: '1rem',
                    backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)'
                }}>
                    <Avatar alt="Remy Sharp" src={props.location.state.data.profileUrl} className={classes.large} />
                    <div className={classes.root} style={{marginLeft:'1rem'}}>
                        <div className={classes.textStyle}>
                            <div>
                                Username : {props.location.state.data.username}
                            </div>
                            <div>
                                No of Posts : {props.location.state.data.postIds.length}
                            </div>
                            <div>
                                Email : {props.location.state.data.email}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className={classes.root}>
                {videos.map(({ url, id }) => {
                    {/* console.log(videoObj); */ }
                    return (<div className={classes.videos}>
                        <Video
                            src={url}
                            id={id}
                        >
                        </Video>
                    </div>)
                })}
            </div>

        </div >
    )
}

export default Profile;

function Video(props) {
    // console.log(props.userName);

    return (
        <>
            <video className="video-styles" controls muted={true} id={props.id}>
                <source src={
                    props.src
                } type="video/mp4"
                ></source>
            </video>
            {/* {props.userName} */}
        </>
    )
}