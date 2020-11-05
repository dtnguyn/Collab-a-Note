import React from "react";
import { ListGroup } from "react-bootstrap";
import { Row } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import moment from "moment";

import DialogTitle from "@material-ui/core/DialogTitle";
import Selection from "../../components/InputSelector";

import { db } from "../../../controller/api/firebase";

class DueDate extends React.Component {
  constructor(props) {
    super(props.code);
    this.state = {
      title: props.title,
      deadline: props.deadline,
      course_name: "",
    };
  }

  componentDidMount() {
    db.collection("courses")
      .where("__name__", "==", this.props.courseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          this.setState({ course_name: doc.data().course_name });
        });
      });
  }

  render() {
    const date = this.state.deadline.toDate().toDateString();
    return (
      <div className="dueDate" onClick={() => alert("Route to assignment")}>
        <h2>{this.state.title}</h2>
        <h4 onClick={() => alert("route to course")}>
          {this.state.course_name}
        </h4>
        <h6>{date}</h6>
      </div>
    );
  }
}

class DueDatesHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      due_dates: [],
    };
  }

  componentDidMount() {
    db.collection("due_date")
      .orderBy("deadline", "asc")
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ due_dates: data });
      });
  }

  render() {
    return (
      <section className="dueDateList">
        <Row className="recent-notes-title">
          <h1>Upcoming Assignments</h1>
          <IconButton aria-label="add">
            <AddIcon onClick={this.props.openDialog} />
          </IconButton>
        </Row>
        <ListGroup variant="flush">
          {this.state.due_dates.map((i) => {
            return (
              <ListGroup.Item>
                <DueDate {...i}></DueDate>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </section>
    );
  }
}

export default function NewDueDateDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DueDatesHomePage openDialog={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="due-date-form-dialog-title"
      >
        <DialogTitle id="due-date-form-dialog-title">
          New Assignment
        </DialogTitle>
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
            fullWidth
            m={10}
            p={10}
            select
            textFieldProps={{
              label: "Label",
              InputLabelProps: {
                shrink: true,
              },
            }}
          >
            <Selection collection={"courses"} />
          </TextField>
          <TextField
            id="deadline-input"
            type="datetime-local"
            label=" "
            className="deadline-entry"
            m={10}
            p={10}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormHelperText id="standard-Deadline-helper-text">
            Deadline
          </FormHelperText>
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
