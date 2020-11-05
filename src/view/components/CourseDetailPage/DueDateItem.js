import React from 'react';


const DueDateItem = ({dueDate}) => {
    return (
        <div className="dueDate">
            <h2>{dueDate.title}</h2>
            <h4>
                {dueDate.deadline.toString()}
            </h4>
        </div>
    )
}


export default DueDateItem