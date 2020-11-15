import React from 'react';
import { IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons/';


const NoteItem = (props) => {


    const noteButtonsStyle = {
        width: "40px",
        height: "40px",
        margin: "5px",
    }



    return(
        <div className="note-item-container">
            <div onClick={props.onClick}>
                <h3>{props.note.title}</h3>
                <p>created {props.note.creationDate.toLocaleDateString("en-US")}</p>
                <p>last updated {props.note.lastUpdate.toLocaleDateString("en-US")}</p>
            </div>
            
            <div className="note-buttons-container">
                <IconButton 
                    onClick={() => {props.deleteNote(props.note.id)}}
                    style={noteButtonsStyle}>
                    <Delete/>
                </IconButton>   

                <IconButton 
                    onClick={() => {props.openEditTitleForm()}}
                    style={noteButtonsStyle}>
                    <Edit/>
                </IconButton>
            </div>
            <hr/>
        </div>
    )
}


export default NoteItem;