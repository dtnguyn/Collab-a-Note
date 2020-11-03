import React from "react";
import { CardDeck } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { db } from "../../../controller/api/firebase";

const Course = (props) => {
  return (
    <Card
      className="courseCard"
      onClick={() => alert("Should route to course")}
    >
      <Card.Img
        variant="top"
        src={props.coverImg}
        className="courseThumbnail"
      />
      <Card.Body>
        <Card.Title className="card-title">{props.name}</Card.Title>
        <Card.Subtitle className="card-subtitle">{props.teacher}</Card.Subtitle>
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
    db.collection("courses")
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
        <Card>
          {" "}
          <IconButton aria-label="add">
            <AddIcon onClick={this.props.openDialog} />
          </IconButton>
        </Card>
      </CardDeck>
    );
  }
}

export default CourseListHomePage;
