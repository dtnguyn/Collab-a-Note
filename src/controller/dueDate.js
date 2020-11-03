import {db, apiResponse} from "./api/firebase"


const getDueDates = (courseId, callback) => {
    db.collection("due_dates").where("courseId", "==", courseId)
    .get()
    .then(function(querySnapshot) {
        let dueDates = []
        querySnapshot.forEach(function(doc) {
            var date = doc.data();
            
            dueDates.push(date)
        });
        callback(apiResponse(true, "Getting due dates sucessfully.", dueDates));
    })
    .catch(function(error) {
        console.error("Error when getting due dates: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null));
    });
}


const addDueDate = (dueDate, callback) => {
    db.collection("due_dates").doc(dueDate.id).set(dueDate)
    .then(function() {
        console.log("Add due date sucessfully!");
        callback(apiResponse(true, "Add due date successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when adding due date: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}


export {
    getDueDates,
    addDueDate
}