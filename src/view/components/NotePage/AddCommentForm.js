import React, { useState } from 'react';
import "../../styles/DashBoard.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import { TextareaAutosize } from '@material-ui/core';
import { Form } from 'react-bootstrap';


const AddCommentForm = (props) => {

    const [comment, setComment] = useState({
        id: "",
        noteId: props.noteId,
        creationDate: null,
        content: "",
        author: {
            id: "123123",
            email: "test@gmail.com",
            username: "Dung Nguyen"
        }
    })


    const createNewCommentId = () => {
        const id = uuidv4()
        console.log(id)
        return id;
    }

    const getCurrentTime = () => {
        return new Date();
    }


    const handleCommentChange = (event) => {
        setComment({
            ...comment,
            content: event.target.value
        })
    }


    return (
        <Dialog open={props.formStatus} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Type your comment to this note.
            </DialogContentText>
            {/* <TextareaAutosize
                autoFocus
                margin="dense"
                id="name"
                label="Comment"
                type="text"
                fullWidth
                onChange={(e) => {handleCommentChange(e)}}
            /> */}
            <Form.Control onChange={(e) => {handleCommentChange(e)}} as="textarea" rows={3} />
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Cancel
            </Button>
            <Button disabled={comment.content.length === 0} onClick={() => {

                const id = createNewCommentId();
                const creationDate = getCurrentTime();
                
                props.addComment({
                    ...comment,
                    id, 
                    creationDate
                })
                
            }} color="primary">
                Add
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCommentForm