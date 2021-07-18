import React, { useRef, useState, useEffect } from 'react';
import './Video.css';
import VideoFooter from './VideoFooter';
import VideoSideBar from './VideoSideBar';

function Video(props) {
    const videoRef = useRef(null);
    const [play, setPlay] = useState(false);

    const onVideoPress = () => {
        if (play) {
            videoRef.current.pause();
            setPlay(false);
        } else {
            videoRef.current.play();
            setPlay(true);
        }
    }

    function callBack(entries) {
        entries.forEach((entry) => {
            let child = entry.target.children[0];
            console.log(child.id);
            // onVideoPress();
        })
    }

    useEffect(function () {
        let conditionObject = {
            root: null,
            threshold: "0.9"
        }
        let observer = new IntersectionObserver(callBack, conditionObject);
        let elements = document.querySelectorAll(".video-container");
        elements.forEach((el) => {
            observer.observe(el);
        })

    }, [])


    return (
        <div className='video'>
            <video
                className="video__player"
                loop
                ref={videoRef}
                onClick={onVideoPress}
                id={props.id}>
                <source src={
                    props.src
                }
                    type="video/mp4"
                ></source>
            </video>
            <VideoSideBar currentUser={props.currentUser} puid={props.puid}></VideoSideBar>
            <VideoFooter userName={props.userName}></VideoFooter>
            {props.userName}
        </div>
    )
}


export default Video
