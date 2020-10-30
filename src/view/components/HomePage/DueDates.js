import React from "react";
import { ListGroup } from "react-bootstrap";

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
    db.collection("course")
      .where("__name__", "==", this.props.course_id)
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
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ due_dates: data });
      });
  }

  render() {
    return (
      <section className="dueDateList">
        <h1>Upcoming Assignments: </h1>
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

export default DueDatesHomePage;
