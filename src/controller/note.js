import {db, apiResponse} from "./api/firebase"



const addNote = (newNote, callback) => {
    db.collection("notes").doc(newNote.id).set(newNote)
    .then(function() {
        console.log("Add note sucessfully!");
        callback(apiResponse(true, "Add note successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when adding note: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}


const getNotes = (courseId, callback) => {
    db.collection("notes").where("courseId", "==", courseId)
    .get()
    .then(function(querySnapshot) {
        let notes = []
        querySnapshot.forEach(function(doc) {
            var note = doc.data();
            note.creationDate = note.creationDate.toDate();
            note.lastUpdate = note.lastUpdate.toDate();
            notes.push(note)
        });
        callback(apiResponse(true, "Getting notes sucessfully.", notes));
    })
    .catch(function(error) {
        console.error("Error when getting notes: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null));
    });
}


let currentNoteContent = "";

const onChangeNote = (newContent) => {
    currentNoteContent = newContent;
}


const updateNote = (note, callback) => {
    console.log(currentNoteContent);
    const updatedNote = {
        ...note,
        content: currentNoteContent
    }
    db.collection("notes").doc(updatedNote.id).set(updatedNote)
    .then(function() {
        console.log("Edit note sucessfully!");
        callback(apiResponse(true, "Edit note successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when editting note: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}

export {
    addNote,
    getNotes,
    onChangeNote,
    updateNote
}