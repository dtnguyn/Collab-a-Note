import React from 'react';
import UserImage from '../shared/UserImage'
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons/';


const CommentItem = (props) => {

    const deleteButtonStyle = {
        width: "30px",
        height: "30px",
        margin: "5px"
    }


    return(
        <div className="row">
            <div className="col-1">
                <UserImage  imgUrl="https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"/>
            </div>
            
            <div className="col-11">
                <div  className="comment-content-container">
                    <p className="comment-username">{props.comment.author.username}</p>
                    <p className="comment-creation-date">{props.comment.creationDate.toLocaleDateString("en-US")}</p>
                    <p className="comment-content">{props.comment.content}</p>
                    <div className="comment-buttons">
                        
                        <IconButton 
                            onClick={() => {props.onClickDelete(props.comment.id)}}
                            style={deleteButtonStyle}>
                            <Delete/>
                        </IconButton>

                    </div>
                </div>
            </div>
            
        </div>
    )
}


export default CommentItem;