import React, { useContext, useState } from "react";
import CardItem from "./CardItem";
import "../../styles/DashBoard.css";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { CourseContext } from "../../context/CourseContext";
import AddCourseForm from "./AddCourseForm";
import { addCourse } from "../../../controller/course";
import { useHistory } from "react-router-dom";

const DashBoardCourses = (props) => {
  const [courses, setCourses] = useContext(CourseContext);

  const history = useHistory();

  const [addCourseForm, setAddCourseForm] = useState(false);

  const addCourseIconStyle = {
    margin: 0,
    width: "80px",
    height: "80px",
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const moveToNotePage = (course) => {
    history.push(`/dashboard/course/${course.id}`, course);
  };

  const handleAddCourse = (newCourse) => {
    addCourse(newCourse, (response) => {
      if (response.status) {
        setCourses((prevCourse) => [...prevCourse, newCourse]);
      } else {
        //Handle Error
      }
      setAddCourseForm(false);
    });
  };

  return (
    <div>
      <h1 className="dashboard-body-title">Courses</h1>
      <Fab
        color="primary"
        aria-label="add"
        style={addCourseIconStyle}
        onClick={() => setAddCourseForm(true)}
      >
        <AddIcon />
      </Fab>
      <AddCourseForm
        formStatus={addCourseForm}
        handleClose={() => setAddCourseForm(false)}
        addCourse={(newCourse) => handleAddCourse(newCourse)}
      />
      <div className="row dashboard-course-container">
        {courses.map((course) => (
          <CardItem
            key={course.id}
            course="col-lg-3 col-md-6, col-sm-12"
            imgUrl={course.coverImg}
            title={course.name}
            subtitle={`created by ${course.owner.name}`}
            onClick={() => {
              moveToNotePage(course);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DashBoardCourses;
