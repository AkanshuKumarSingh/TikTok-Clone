import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { storage, firestore, database } from '../../firebase';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    commentBox: {
        position: 'absolue',
        top: '4vh',
        height: '70vh',
        width: '90vw',
    }
});

function Comment({ puid, photoUrl, comments }) {
    const classes = useStyles();
    const [loadComment, setLoadComment] = useState(false);
    const [commentArray, setCommentArray] = useState(comments);
    const [myComment, setMyComment] = useState("");

    const loadCommentsFxn = () => {
        setLoadComment(true);
    }

    const myCommentFxn = async (e) => {
        if (e.key == 'Enter') {
            let postRef = await database.posts.doc(puid).get();
            let post = postRef.data();
            let comment = post.comments;
            comment.push({
                photoUrl : photoUrl,
                comment : myComment,
            });
            database.posts.doc(puid).update({
                "comments": comment
            })
            console.log(myComment);
            setMyComment("");
        }
    }

    // const commentArray = [
    //     {
    //         img: 'https://static2.cbrimages.com/wordpress/wp-content/uploads/2018/11/Goku-Dragon-Ball-Super-Header-Blue.jpg',
    //         comment: 'Hi Im goku san'
    //     },
    //     {
    //         img: 'https://media.comicbook.com/2021/01/dragon-ball-super-manga-68-spoilers-vegeta-godly-destruction-pow-1253952-1280x0.jpeg',
    //         comment: 'This is Vegeta Sama'
    //     }
    // ]

    useEffect(() => {

    }, [])

    return (
        <div>
            {
                loadComment === false && <input placeholder="Comment..." type="text" className="comment" onClick={loadCommentsFxn} ></input>
            }
            {loadComment === true && <div className="comments" >
                <input value={myComment} placeholder="Comment..." type="text" className="comment" onClick={loadCommentsFxn}
                    onChange={(e) => { setMyComment(e.target.value) }} onKeyDown={myCommentFxn}>
                </input>
                {
                    commentArray.map((obj) => {
                        return (
                            <div>
                                <img className="image" src={obj.img}></img>
                                <p>{obj.comment}</p>
                            </div>
                        )
                    })
                }
            </div>
            }
        </div>

    )
}

export default Comment;