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
import { database } from 'firebase';


const AddDueDateForm = (props) => {

    const [newDueDate, setNewDueDate] = useState({
        id: "",
        title: "",
        courseId: props.course.id,
        deadline: Date(),
    })

    const getCurrentTime = () =>{
        return new Date();
    }

    const createNewDueDateId = () => {
        const id = uuidv4()
        console.log(id)
        return id;
    }

    const handleTitleChange = (event) => {
        setNewDueDate({
            ...newDueDate,
            title: event.target.value
        })
    }

    const handleDeadlineChange = (event) => {
        setNewDueDate({
            ...newDueDate,
            deadline: event.target.value
        })
    }

    if(!newDueDate) return null;

    return (
        <div>
        <Dialog open={props.formStatus} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Note</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Add note to your {props.course.name} course.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                onChange={(e) => handleTitleChange(e)}
            />

            <form  noValidate>
            <TextField
                id="datetime-local"
                label="Deadline"
                type="datetime-local"
                onChange={(event) => handleDeadlineChange(event)}
                defaultValue={newDueDate.deadline}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </form>

            
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={() => {

                const id = createNewDueDateId();

                props.addDueDate({
                    ...newDueDate,
                    id,
                })
            }} color="primary">
                Add
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}


export default AddDueDateForm