import React, { useEffect, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { propTypes } from "react-bootstrap/esm/Image";
import { updateNote, onChangeNote } from "../../../controller/note"

const NoteEditor = (props) => {

    const [noteContent, setNoteContent] = useState(props.note.content);
    

    const onEditorChange = (content) => {
        setNoteContent(content)
        onChangeNote(content);
    }

    const saveNote = () => {
        
        updateNote(props.note, (response) => {
            if(response.status){
                alert(response.message)
            } else {
                //Handle Error
            }
        })
    }


    return(
        <div>
            <div>
            <Editor
                apiKey="3ki3s2vgpnwgdgsz9hijujj9u4683mukery5oki29jnxhtgz"
                initialValue={props.note.content}
                value={noteContent}
                onEditorChange={(content, editor) => {onEditorChange(content)}}

                init={{
                height: "100vh",
                menubar: true,
                autosave_interval: '5s',
                save_onsavecallback: function(){ saveNote() },
                plugins: [
                    'advlist autolink lists link image', 
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount save autosave'
                ],
                toolbar:
                    'formatselect| fontselect | bold italic underline| backcolor forecolor|\
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | undo redo | save'
                }}
            />
            </div>
        </div>
    )
}


export default NoteEditor