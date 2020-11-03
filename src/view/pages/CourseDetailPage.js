import React, { useContext, useEffect, useState } from 'react';
import Notes from '../components/CourseDetailPage/Notes';
import DueDates from '../components/CourseDetailPage/DueDates';
import SharedUsers from '../components/CourseDetailPage/SharedUsers';
import "../styles/CourseDetail.css"


const CourseDetailPage = (props) => {

    const [course, setCourse] = useState();


    useEffect(() => {
        setCourse(props.location.state)
    }, [])


    if(!course) return null

    return(
        <div className="detail-container">
            <h1 className="detail-title">{course.name}</h1>
            <SharedUsers/>
            <div className="row">
                <div className="col-md-8">
                    <Notes course={course} />
                </div>
                <div className="col-md-4">
                    <DueDates course={course}/>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailPage