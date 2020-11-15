import React, {useContext, useState} from 'react';
import CardItem from './CardItem';
import "../../styles/DashBoard.css"
import { Link } from "react-router-dom"
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Height } from '@material-ui/icons';
import { CourseContext } from "../../context/CourseContext"
import AddCourseForm from './AddCourseForm';
import { addCourse, deleteCourse, updateCourse } from "../../../controller/course"
import { useHistory } from 'react-router-dom'
import moment from 'moment';
import EditCourseForm from "./EditCourseForm"


const DashBoardCourses = (props) => {

    const [courses, setCourses] = useContext(CourseContext);

    const [focusCourse, setFocusCourse] = useState(null);

    const history = useHistory();
    
    const [addCourseForm, setAddCourseForm] = useState(false)

    

    const addCourseIconStyle = {
        margin: 0,
        width: '80px',
        height: '80px',
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    const moveToNotePage = (course) => {
        history.push(`/dashboard/course/${course.id}`, course) 
    }

    const handleAddCourse = (newCourse) => {
        addCourse(newCourse, (response) => {
            if(response.status){
                setCourses(prevCourse => [...prevCourse, newCourse])
            } else {
                //Handle Error
            }
            setAddCourseForm(false)
        })
    }

    const handleDeleteCourse = (courseId) => {
        deleteCourse(courseId, (response) => {
            if(response.status){
                 setCourses(courses.filter(course => course.id != courseId))
            } else {
                alert(response.message)
            }
        })
    }

    const handleUpdateCourse = (updatedCourse) => {
        updateCourse(updatedCourse, (response) => {
            setFocusCourse(null)
            if(response.status){
                setCourses(courses.map(course => {
                    if(course.id === updatedCourse.id){
                        return updatedCourse
                    }
                    return course
                }))
            } else {
                alert(response.message)
            }
        })

    }

    
    return (

        <div>
            <h1 className="dashboard-body-title">Courses</h1>
            <Fab color="primary" aria-label="add" style={addCourseIconStyle} onClick={() => setAddCourseForm(true)}>
                <AddIcon/>
            </Fab>
            <AddCourseForm 
                formStatus={addCourseForm} 
                handleClose={() => setAddCourseForm(false)} 
                addCourse={(newCourse) => handleAddCourse(newCourse)}

            />

            {focusCourse != null
            ? <EditCourseForm
                course={focusCourse}
                handleClose={() => setFocusCourse(null)}
                updateCourse={(updatedCourse) => handleUpdateCourse(updatedCourse)}
            />
            : null}

            
            <div className="row dashboard-course-container">

                {courses.map(course => (
                    <CardItem 
                        key={course.id}
                        className="col-lg-3 col-md-6, col-sm-12"
                        course={course}
                        onClick={() => {moveToNotePage(course)}}
                        openEditForm={() => setFocusCourse(course)}
                        deleteCourse={(courseId) => handleDeleteCourse(courseId)}
                    />
                ))}
            </div>

            
        </div>
        

    )
}


export default DashBoardCourses