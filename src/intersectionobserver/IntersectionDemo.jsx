import React,{useEffect} from 'react'
// IntersectionDemo.jsx
import v1 from "./Camera.mp4";
import v2 from "./Coffee.mp4";
import v3 from "./deco.mp4";
import v4 from "./flower.mp4";
import v5 from "./food.mp4";
import './inter.css';

function IntersectionDemo() {
    
    function callBack(entries) {
        entries.forEach((entry) => {
            let child = entry.target.children[0];
            console.log(child.id);
            
        })
    }

    useEffect(function() {
        let conditionObject = {
            root:null,
            threshold:"0.9"
        }
        let observer = new IntersectionObserver(callBack,conditionObject);
        let elements = document.querySelectorAll(".video-container");
        elements.forEach((el) => {
            observer.observe(el);
        })

    }, [])

    return (
        <div>
           <div className="video-container">
                <Video
                    src={v1}
                    id="a"
                ></Video>
           </div> 
           <div className="video-container">
                <Video
                    src={v2}
                    id="b"
                ></Video>
           </div> 
           <div className="video-container">
                <Video
                    src={v3}
                    id="c"
                ></Video>
           </div> 
           <div className="video-container">
                <Video
                    src={v4}
                    id="d"
                ></Video>
           </div> 
           <div className="video-container">
                <Video
                    src={v5}
                    id="e"
                ></Video>
           </div> 
        </div>
    )
}

export default IntersectionDemo

function Video(props) {
    return (
        <video className="video-styles" controls muted="true" id={props.id}>
            <source src={
                props.src
            }  type="video/mp4"
            ></source>
        </video>
    )
}

