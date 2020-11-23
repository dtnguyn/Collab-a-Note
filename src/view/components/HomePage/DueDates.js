import React, { useContext, useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Row } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormHelperText from "@material-ui/core/FormHelperText";

import DialogTitle from "@material-ui/core/DialogTitle";

import { db } from "../../../controller/api/firebase";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { getSingleUser } from "../../../controller/auth";
import { addDueDate, deleteDueDate } from "../../../controller/dueDate";
import { DueDateContext } from "../../context/DueDateContext";
import AddDueDateForm from "./AddDueDateForm";

// class DueDate extends React.Component {
//   constructor(props) {
//     super(props.code);
//     this.state = {
//       title: props.title,
//       deadline: props.deadline,
//       course_name: "",
//     };
//   }

//   componentDidMount() {
//     db.collection("courses")
//       .where("__name__", "==", this.props.courseId)
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.docs.map((doc) => {
//           return this.setState({ course_name: doc.data().course_name });
//         });
//       });
//   }

//   render() {
//     const date = this.state.deadline.toDate().toDateString();
//     return (
//       <div className="dueDate" onClick={() => alert("Route to assignment")}>
//         <h2>{this.state.title}</h2>
//         <h4 onClick={() => alert("route to course")}>
//           {this.state.course_name}
//         </h4>
//         <h6>{date}</h6>
//       </div>
//     );
//   }
// }

// class DueDatesHomePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       due_dates: [],
//     };
//   }

//   componentDidMount() {
//     db.collection("due_date")
//       .orderBy("deadline", "asc")
//       .limit(5)
//       .get()
//       .then((querySnapshot) => {
//         const data = querySnapshot.docs.map((doc) => doc.data());
//         this.setState({ due_dates: data });
//       });
//   }

//   render() {
//     return (
//       <section className="dueDateList">
//         <Row className="recent-notes-title">
//           <h1>Upcoming Assignments</h1>
//           <IconButton aria-label="add">
//             <AddIcon onClick={this.props.openDialog} />
//           </IconButton>
//         </Row>
//         <ListGroup variant="flush">
//           {this.state.due_dates.map((i) => {
//             return (
//               <ListGroup.Item>
//                 <DueDate {...i}></DueDate>
//               </ListGroup.Item>
//             );
//           })}
//         </ListGroup>
//       </section>
//     );
//   }
// }

// export default function NewDueDateDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <DueDatesHomePage openDialog={handleClickOpen} />
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="due-date-form-dialog-title"
//       >
//         <DialogTitle id="due-date-form-dialog-title">
//           New Assignment
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Title"
//             type="email"
//             fullWidth
//           />
//           <TextField
//             id="course_select"
//             label="Course"
//             fullWidth
//             m={10}
//             p={10}
//             select
//             textFieldProps={{
//               label: "Label",
//               InputLabelProps: {
//                 shrink: true,
//               },
//             }}
//           >
//             <Selection collection={"courses"} />
//           </TextField>
//           <TextField
//             id="deadline-input"
//             type="datetime-local"
//             label=" "
//             className="deadline-entry"
//             m={10}
//             p={10}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <FormHelperText id="standard-Deadline-helper-text">
//             Deadline
//           </FormHelperText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

const DueDatesHomePage = (props) => {
  const { currentUser } = useAuth();
  const [dueDates, setDueDates] = useContext(DueDateContext);
  const [addDueDateForm, setAddDueDateForm] = useState(false);
  const [customUser, setCustomUser] = useState();

  const history = useHistory();

  // const moveToAssignmentPage = (dueDate) => {
  //   history.push(`/${dueDate.id}`, dueDate);
  // };

  const moveToCoursePage = (dueDate) => {
    history.push(`/dashboard/course/${dueDate.courseId}`, dueDate);
  };

  const handleDeleteDueDate = (dueDateId) => {
    deleteDueDate(dueDateId, (response) => {
      if (response.status) {
        setDueDates(dueDates.filter((duedate) => duedate.id != dueDateId));
      } else {
        alert(response.message);
      }
    });
  };

  const handleAddDueDate = (newDueDate) => {
    addDueDate(newDueDate, (response) => {
      if (response.status) {
        setDueDates((prevDueDate) => [...prevDueDate, newDueDate]);
      } else {
        //Handle Error
      }
      setAddDueDateForm(false);
    });
  };

  useEffect(() => {
    getSingleUser(currentUser.uid, (response) => {
      if (response.status) {
        setCustomUser(response.data);
      } else {
        alert(response.message);
      }
    });
  }, []);

  return (
    <section className="dueDateList">
      <Row className="recent-notes-title">
        <h1>Upcoming Assignments</h1>
        <IconButton aria-label="add">
          <AddIcon onClick={() => setAddDueDateForm(true)} />
          {console.log(addDueDateForm)}
        </IconButton>
        <AddDueDateForm
          currentUser={customUser}
          formStatus={addDueDateForm}
          handleClose={() => setAddDueDateForm(false)}
          addDueDate={(newDueDate) => handleAddDueDate(newDueDate)}
        ></AddDueDateForm>
      </Row>
      <ListGroup variant="flush">
        {dueDates.map((dueDate, index) => {
          return (
            <ListGroupItem
              key={index}
              dueDate={dueDate}
              onClick={() => {
                // moveToNotePage(dueDate);
              }}
            >
              <div className="dueDate">
                <h2>{dueDate.title}</h2>
                <h4 onClick={() => moveToCoursePage(dueDate)}>
                  {dueDate.course_name}
                </h4>
                <h6>{dueDate.deadline.toDate().toDateString()}</h6>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </section>
  );
};

export default DueDatesHomePage;
