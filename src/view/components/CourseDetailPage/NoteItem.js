import React from "react";
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons/";

const NoteItem = (props) => {
  const noteButtonsStyle = {
    width: "40px",
    height: "40px",
    margin: "5px",
  };

  if (!props.note) return null;
  return (
    <div className="note-item-container">
      <div onClick={props.onClick}>
        <h3 data-testid="title">{props.note.title}</h3>
        <p data-testid="creation-date">
          created {props.note.creationDate.toLocaleDateString("en-US")}
        </p>
        <p data-testid="last-update">
          last updated {props.note.lastUpdate.toLocaleDateString("en-US")}
        </p>
      </div>

      <div className="note-buttons-container">
        <IconButton
          onClick={() => {
            props.deleteNote(props.note.id);
          }}
          style={noteButtonsStyle}
        >
          <Delete />
        </IconButton>

        <IconButton
          data-testid="edit-button"
          onClick={() => {
            props.openEditTitleForm();
          }}
          style={noteButtonsStyle}
        >
          <Edit />
        </IconButton>
      </div>
      <hr />
    </div>
  );
};

export default NoteItem;
