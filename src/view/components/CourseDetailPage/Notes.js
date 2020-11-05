
import React, { useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import "../../styles/CourseDetail.css"
import { Button, Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getNotes, addNote } from "../../../controller/note"
import AddNoteForm from './AddNoteForm';
import { useHistory } from 'react-router-dom'

const Notes = (props) => {
    const [notes, setNotes] = useState([]);
    const [addNoteForm, setAddNoteForm] = useState(false)
    const history = useHistory();

    const addNoteIconStyle = {
        marginRight: "30px",
        width: "50px",
        height: "50px",
        top: "0",
        right: "0",
        bottom: 0,
        left: "auto",
        position: "absolute",
    };

    const handleAddNote = (newNote) => {
        addNote(newNote, (response) => {
            if(response.status){
                setNotes(previousNotes => [...previousNotes, newNote])
            } else {
                //Handle Error
            }
            setAddNoteForm(false)
        })
    }


    

    const moveToNotePage = (note) => {
        history.push(`/note/${note.id}`, note) 
    
    }

    useEffect(() => {
        const course = props.course
        console.log(course);
        getNotes(course.id, (response) => {
            if(response.status){
                setNotes(response.data)
            } else {
                //Handle Error
            }
        })
    }, [])

    return (
        <div className="notes-container">
            <h1 className="detail-subtitle">Notes</h1>

            {/* <Fab color="primary" aria-label="add" style={addNotesIconStyle} onClick={() => {setAddNoteForm(true)}}>
                <AddIcon/>
            </Fab> */}

            <IconButton 
                onClick={() => setAddNoteForm(true)}
                style={addNoteIconStyle}>
                <AddIcon/>
            </IconButton>
            <AddNoteForm
                formStatus={addNoteForm} 
                course ={props.course}
                handleClose={() => setAddNoteForm(false)} 
                addNote={(newNote) => handleAddNote(newNote)}
            />
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    title={note.title}
                    onClick={() => moveToNotePage(note)}
                    dateCreation={note.creationDate.toLocaleDateString("en-US")}
                    dateUpdate={note.lastUpdate.toLocaleDateString("en-US")}
                />
            ))}
        </div>
    )


    //   useEffect(() => {
//     setNotes(this.props.location.classItem.notes);
//   }, []);

//     const [notes, setNotes] = useState([]);
    
//     const [addNoteForm, setAddNoteForm] = useState(false)

//   return (
//     <div>
//       <h1 className="dashboard-body-title">Notes</h1>
//       <Fab
//         color="primary"
//         aria-label="add"
//         style={addClassIconStyle}
//         onClick={() => setAddClassForm(true)}
//       >
//         <AddIcon />
//       </Fab>
//       {notes.map((note) => {
//         <NoteItem
//           title={note.title}
//           dateCreation={note.dateCreation}
//           dateUpdate={note.lastUpdate}
//         />;
//       })}

//        {/* <NoteItem
// //                 title="Program Design"
// //                 dateCreation="Aug, 28th"
// //                 dateUpdate="Aug, 30th"
// //             />
// //             <NoteItem
// //                 title="Agile"
// //                 dateCreation="Aug, 28th"
// //                 dateUpdate="Aug, 30th"
// //             />
// //             <NoteItem
// //                 title="Design Pattern"
// //                 dateCreation="Aug, 28th"
// //                 dateUpdate="Aug, 30th"
// //             />
// //             <NoteItem
// //                 title="Midterm Review"
// //                 dateCreation="Aug, 28th"
// //                 dateUpdate="Aug, 30th"
// //             /> */}
//      </div>
//   );
// };
}


export default Notes
