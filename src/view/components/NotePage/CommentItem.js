import React from 'react';
import UserImage from '../shared/UserImage'

const CommentItem = (props) => {
    return(
        <div className="row">
            <div className="col-1">
                <UserImage  imgUrl="https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"/>
            </div>
            
            <div className="col-11">
                <div  className="comment-content-container">
                    <p className="comment-username">{props.comment.author.username}</p>
                    <p className="comment-content">{props.comment.content}</p>
                </div>
            </div>
            
        </div>
    )
}


export default CommentItem;