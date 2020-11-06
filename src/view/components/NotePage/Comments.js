import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import { Button, Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddCommentForm from './AddCommentForm';
import { addComment, getComments } from '../../../controller/comment';

const Comments = (props) => {

    const [comments, setComments] = useState([])
    const [addCommentForm, setAddCommentForm] = useState(false)


    const addNoteIconStyle = {
        marginRight: "30px",
        width: "50px",
        height: "50px",
        top: "10px",
        right: "10px",
        bottom: 0,
        left: "auto",
        position: "absolute",
    };

    const handleAddComment = (comment) => {
        addComment(comment, (response) => {
            setAddCommentForm(false)
            if(response.status){
                setComments(prevComments => [...prevComments, comment])
            } else {
                alert(response.message)
            }
        })
    }

    useEffect(() => {
        getComments(props.noteId, (response) => {
            if(response.status){
                setComments(response.data)
            } else {
                alert(response.message)
            }
            
        })
    }, [])


    return (
        <div className="comments-container">
            <h3 className="comments-title" >Comments</h3>
            <IconButton 
                onClick={() => {setAddCommentForm(true)}}
                style={addNoteIconStyle}>
                <AddIcon/>
            </IconButton>

            <AddCommentForm 
                noteId={props.noteId}
                formStatus={addCommentForm}
                handleClose={() => setAddCommentForm(false)}
                addComment={(comment) => handleAddComment(comment)}
            />

            {comments.map((comment, index) => (
                <CommentItem key={index} comment={comment}/>
            ))}
            

        </div>
    )
}

export default Comments