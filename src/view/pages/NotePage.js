import React from 'react';
import Comments from '../components/NotePage/Comments';
import NoteEditor from '../components/NotePage/NoteEditor';
import "../styles/Note.css"


const NotePage = (props) => {

    const note = props.location.state;

    return(
        <div className="row">
            <div  className="col-md-8 col-sm-12">
                <NoteEditor
                    note={note}
                />
            </div>
            <div className="col-md-4 sol-sm-12">
                <Comments/>
            </div>
           
        </div>
    )
}



export default NotePage