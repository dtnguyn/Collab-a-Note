import React, { useState } from "react";
import "../../styles/DashBoard.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";

const AddCommentForm = (props) => {
  const [comment, setComment] = useState({
    id: "",
    noteId: props.noteId,
    creationDate: null,
    content: "",
    author: {
      id: props.currentUser.id,
      name: props.currentUser.username,
      email: props.currentUser.email,
      avatar: props.currentUser.avatar,
    },
  });

  const createNewCommentId = () => {
    const id = uuidv4();
    console.log(id);
    return id;
  };

  const getCurrentTime = () => {
    return new Date();
  };

  const handleCommentChange = (event) => {
    setComment({
      ...comment,
      content: event.target.value,
    });
  };

  return (
    <Dialog
      open={props.formStatus}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>Type your comment to this note.</DialogContentText>
        {/* <TextareaAutosize
                autoFocus
                margin="dense"
                id="name"
                label="Comment"
                type="text"
                fullWidth
                onChange={(e) => {handleCommentChange(e)}}
            /> */}
        <Form.Control
          onChange={(e) => {
            handleCommentChange(e);
          }}
          as="textarea"
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={comment.content.length === 0}
          onClick={() => {
            const id = createNewCommentId();
            const creationDate = getCurrentTime();

            props.addComment({
              ...comment,
              id,
              creationDate,
            });
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCommentForm;
