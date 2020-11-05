import React from 'react';

const NoteItem = (props) => {
    return(
        <div onClick={props.onClick}>
            <h3>{props.title}</h3>
            <p>created {props.dateCreation}</p>
            <p>last updated {props.dateUpdate}</p>
            <hr/>
        </div>
    )
}


export default NoteItem;