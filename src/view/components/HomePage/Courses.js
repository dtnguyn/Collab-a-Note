import React from "react";
import { CardDeck } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { db } from "../../../controller/api/firebase";

const Course = (props) => {
  return (
    <Card
      className="courseCard"
      onClick={() => alert("Should route to course")}
    >
      <Card.Img variant="top" src={props.img} className="courseThumbnail" />
      <Card.Body>
        <Card.Title className="card-title">{props.course_name}</Card.Title>
        <Card.Subtitle className="card-subtitle">{props.prof}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

class CourseListHomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      courses: [],
    };
  }

  componentDidMount() {
    db.collection("course")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ courses: data });
      });
  }

  render() {
    return (
      <CardDeck className="courseCardDeck">
        {this.state.courses.map((i) => {
          return <Course {...i}></Course>;
        })}
      </CardDeck>
    );
  }
}

export default CourseListHomePage;
