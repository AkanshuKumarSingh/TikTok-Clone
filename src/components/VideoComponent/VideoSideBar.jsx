import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import FavouriteIcon from '@material-ui/icons/Favorite';
import './VideoSideBar.css';
import { storage, firestore, database } from '../../firebase';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

function VideoSideBar(props) {

    const [isLiked, setLiked] = useState(false);
    const { currentUser } = props;

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
            fontSize: "2rem",
            // padding:"4rem"
            marginBottm:'2rem',
        },
        // chat: {
        //     left: "32vw"
        // },
        notSelected: {
            color: "lightgray"
        }
        ,
        selected: {
            color: "red"
        }
    }));

    const classes = useStyles();

    const handleLiked = async (puid) => {
        console.log(props.currentUser)
        console.log(puid + " " + isLiked);
        let postRef = await database.posts.doc(puid).get();
        let post = postRef.data();
        let likes = post.likes;
        if (isLiked == false) {
            database.posts.doc(puid).update({
                "likes": [...likes, currentUser.uid]
            })
        } else {
            let likes = post.likes.filter(lkuid => {
                return lkuid != currentUser.uid;
            })
            database.posts.doc(puid).update({
                "likes": likes
            })
        }
        setLiked(!isLiked);
    }

    const handleCommentClicked = async (puid) => {
        // let copyofVideos = [...videos];
        // let idx = copyofVideos.findIndex((video) => {
        //     return video.puid == puid;
        // });
        // let videoObj = copyofVideos[idx];
        // videoObj.isOverlayActive = true;
        // setVideos(copyofVideos);
    }

    return (
        <div className="videoSidebar">
            <FavouriteIcon className={[classes.heart, isLiked == false ? classes.notSelected : classes.selected]}
                onClick={() => { handleLiked(props.puid) }}
            ></FavouriteIcon>

            <ChatBubbleIcon className={[classes.icon, classes.chat, classes.notSelected]}
                onClick={() => { handleCommentClicked(props.puid) }}>
            </ChatBubbleIcon>
        </div>
    )
}

export default VideoSideBar
