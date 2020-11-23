import React from "react";
import { Row, Col } from "react-bootstrap";

import "../styles/HomePage.css";
import CourseListHomePage from "../components/HomePage/Courses";
import DueDatesHomePage from "../components/HomePage/DueDates";
import RecentNotesHomePage from "../components/HomePage/RecentNotes";
import { CourseProvider } from "../context/CourseContext";
import { DueDateProvider } from "../context/DueDateContext";

const HomePage = () => {
  return (
    <CourseProvider>
      <DueDateProvider>
        <div className="main-page">
          <CourseListHomePage className="courseList"></CourseListHomePage>
          <Row>
            <Col>
              <RecentNotesHomePage />
            </Col>
            <Col>
              <DueDatesHomePage />
            </Col>
          </Row>
        </div>
      </DueDateProvider>
    </CourseProvider>
  );
};

export default HomePage;
