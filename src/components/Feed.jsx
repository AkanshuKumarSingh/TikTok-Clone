import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React, { useEffect, useState, useContext } from 'react'
import Navbar from './Navbar';
import { AuthContext } from '../contexts/AuthProvider';
import { storage, firestore, database } from '../firebase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Video from './VideoComponent/Video';

// import uuid from 'react-uuid';

// intersectionobserver
export default function Feed() {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [pageLoading, setpageLoading] = useState(true);
    const { currentUser } = useContext(AuthContext)
    const [videos, setVideos] = useState([]);
    // const [isLiked, setLiked] = useState(false);

    const useStyles = makeStyles((theme) => ({
        grow: {
            flexGrow: 1,
            color: "white"
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        backDesign: {
            color: "black",
            backgroundColor: "white"
        },
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
        icon: {
            // backgroundColor: "red"
            position: "absolute",
            bottom: "4vh",
            fontSize: "2rem"
        },
        heart: {
            position: "absolute",
            bottom: "4vh",
            left: "4vh",
            fontSize: "2rem"
        },
        chat: {
            left: "32vw"
        },
        notSelected: {
            color: "lightgray"
        }
        ,
        selected: {
            color: "red"
        }
    }));

    const classes = useStyles();

    useEffect(async () => {
        console.log(currentUser.uid);
        // profile page -> change
        // resource intensive  
        // database.users.doc(currentUser.uid).onSnapshot((snapshot) => {
        //     console.log(snapshot.data());
        //     setUser(snapshot.data());
        //     setpageLoading(false);
        // })
        // how get a document from a collection in firebase 
        // auth user doen't contains any other data besides email ,password , uid
        //  you need to get the complete document from  the firstore using either of email or uid 

        let dataObject = await database.users.doc(currentUser.uid).get();
        console.log(dataObject.data());
        setUser(dataObject.data());
        setpageLoading(false);

    }, []);

    const handleInputFile = (e) => {
        e.preventDefault();
        let file = e?.target?.files[0];
        if (file != null) {
            console.log(e.target.files[0])

        }
        // 
        if (file.size / (1024 * 1024) > 40) {
            alert("The selected file is very big");
            return;
        }
        // 1. upload 
        const uploadTask = storage.ref(`/posts/${uuidv4()}`).put(file);
        setLoading(true)
        //   progress
        const f1 = snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            console.log(progress)
            //this callback is for providing the progress
        }
        // err
        const f2 = () => {
            alert("There was an error in uploading the file");
            return;
        }
        // success
        const f3 = () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async url => {
                // 2.  
                // post collection -> post document put 
                let obj = {
                    comments: [],
                    likes: [],
                    url,
                    auid: currentUser.uid,
                    createdAt: database.getUserTimeStamp(),
                }
                //   put the post object into post collection 
                let postObj = await database.posts.add(obj);
                // 3. user postsId -> new post id put 
                await database.users.doc(currentUser.uid).update({
                    postIds: [...user.postIds, postObj.id]
                })
                console.log(postObj);
                setLoading(false);
            })
        }
        uploadTask.on('state_changed', f1, f2, f3)
    }

    useEffect(async () => {
        let unsub = await database.posts.orderBy("createdAt", "desc")
            .onSnapshot(async snapshot => {
                // console.log(snapshot);
                let videos = snapshot.docs.map(doc => doc.data());
                console.log(videos);
                // let videoUrls = videos.map(video =>);
                // let auidArr = videos.map(video => video.auid);
                // let usersArr = [];
                // for (let i = 0; i < auidArr.length; i++) {
                //     let userObject = await database.user.doc(auidArr[i]).get();
                //     usersArr.push(userObject)
                // }

                let videosArr = [];
                for (let i = 0; i < videos.length; i++) {
                    let videoUrl = videos[i].url;
                    let auid = videos[i].auid;
                    let id = snapshot.docs[i].id;
                    let userObject = await database.users.doc(auid).get();
                    let userProfileUrl = userObject.data().profileUrl;
                    let userName = userObject.data().username;
                    videosArr.push({
                        videoUrl,
                        userProfileUrl,
                        userName,
                        puid: id,
                        isOverlayActive: false
                    });
                }

                setVideos(videosArr);
            })
    }, [])

    return (
        pageLoading == true ? <div>Loading...</div> : <div>
            {/* Feed
            <button onClick={handleLogout} disabled={loading}>Logout</button> */}
            <Navbar user={user}></Navbar>
            <div className="uploadImage">
                <div className={classes.root}>
                    <input accept="file" className={classes.input} id="icon-button-file" type="file"
                        onChange={handleInputFile}
                    />
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" color="primary" component="span" disabled={loading} endIcon={<PhotoCamera />}>
                            Upload
                        </Button>
                    </label>
                </div>
            </div>
            <div className="feed">
                {videos.map((videoObj, idx) => {
                    {/* console.log(videoObj); */ }
                    return (<div className="video-container">
                        <Video
                            src={videoObj.videoUrl}
                            id={idx}
                            userName={videoObj.userName}
                            currentUser={currentUser}
                            puid={videoObj.puid}
                        >
                            
                        </Video>
                    </div>)
                })}
            </div>

        </div>
    )
}

