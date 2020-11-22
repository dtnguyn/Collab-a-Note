import React from "react";
import { ListGroup } from "react-bootstrap";
import { Row } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { db } from "../../../controller/api/firebase";

class RecentNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      course_name: "",
    };
  }

  componentDidMount() {
    db.collection("courses")
      .where("__name__", "==", this.props.courseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          return this.setState({ course_name: doc.data().name });
        });
      });
  }

  render() {
    const date = this.props.lastUpdate.toDate().toDateString();
    return (
      <div className="recent-notes-list" onClick={() => alert("route to note")}>
        <h2>{this.props.title}</h2>
        <h4 onClick={() => alert("route to course")}>
          {this.state.course_name}
        </h4>
        <h6>{date}</h6>
      </div>
    );
  }
}

class RecentNotesHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    db.collection("notes")
      .orderBy("lastUpdate", "desc")
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ notes: data });
      });
  }

  render() {
    return (
      <section className="recent-notes">
        <Row className="recent-notes-title">
          <h1>Recent Notes</h1>
          <IconButton aria-label="add">
            <AddIcon onClick={this.props.openDialog} />
          </IconButton>
        </Row>
        <ListGroup variant="flush">
          {this.state.notes.map((i) => {
            return (
              <ListGroup.Item>
                <RecentNote {...i}></RecentNote>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </section>
    );
  }
}

export default function NewNoteDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <RecentNotesHomePage openDialog={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="due-date-form-dialog-title"
      >
        <DialogTitle id="due-date-form-dialog-title">New Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="email"
            fullWidth
          />
          <TextField
            id="course_select"
            label="Course"
            value="20"
            fullWidth
            select
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
