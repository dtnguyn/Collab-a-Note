import React from "react";
import { ListGroup } from "react-bootstrap";

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
        <h1>Recent Notes</h1>
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

export default RecentNotesHomePage;
