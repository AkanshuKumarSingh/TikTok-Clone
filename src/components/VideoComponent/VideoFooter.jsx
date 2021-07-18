import React from 'react';
import './VideoFooter.css';

function VideoFooter(props) {
    return (
        <div className="videoFooter">
            <div className="videoFooter_text">
                <h3>@{props.userName}</h3>
                {/* <h3>description</h3> */}
            </div>
        </div>
    )
}

export default VideoFooter
