import React, { useContext, useEffect } from "react";
import DashBoardPageBody from "./DashBoardPageBody";
import DashBoardPageHeader from "./DashBoardPageHeader";
import "../../styles/DashBoard.css";
import { CourseContext } from "../../context/CourseContext";
import { getCourses } from "../../../controller/course";

const DashBoardPageContent = () => {
  const [courses, setCourses] = useContext(CourseContext);

  useEffect(() => {
    getCourses("123123", (response) => {
      if (response.status) {
        setCourses(response.data);
      } else {
        //Handle Error
      }
    });
  }, []);

  return (
    <div className="dashboard-page-container">
      <DashBoardPageHeader />
      {courses}
      <DashBoardPageBody />
    </div>
  );
};

export default DashBoardPageContent;
