import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import FavouriteIcon from '@material-ui/icons/Favorite';
import './VideoSideBar.css';
import { storage, firestore, database } from '../../firebase';
import Comment from './Comment';

function VideoSideBar(props) {

    const [isLiked, setLiked] = useState(false);
    const { currentUser } = props;

    const useStyles = makeStyles((theme) => ({
        icon: {
            // backgroundColor: "red"
            position: "absolute",
            bottom: "4vh",
            fontSize: "2rem",
            marginBottom: '1rem'
        },
        heart: {
            fontSize: "2rem",
            // padding:"4rem"
            marginBottm: '2rem',
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
        },
        
    }));

    const classes = useStyles();

    const handleLiked = async (puid) => {
        // console.log(props.currentUser)
        // console.log(puid + " " + isLiked);
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

    useEffect(async () => {
        let postRef = await database.posts.doc(props.puid).get();
        let post = postRef.data();
        let likes = post.likes;
        console.log(likes);
        if (likes.indexOf(`${currentUser.uid}`) != -1) {
            setLiked(true);
        }
    }, [])

    return (
        <>
            <div className="videoSidebar">
                <FavouriteIcon className={[classes.heart, isLiked == false ? classes.notSelected : classes.selected]}
                    onClick={() => { handleLiked(props.puid) }}
                ></FavouriteIcon>
            </div>
        </>
    )
}

export default VideoSideBar
