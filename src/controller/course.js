import {db, apiResponse} from "./api/firebase"


const addCourse = (newCourse, callback) => {
    db.collection("courses").doc(newCourse.id).set(newCourse)
    .then(function() {
        console.log("Add course sucessfully!");
        callback(apiResponse(true, "Add course successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when adding course: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}

const getCourses = (ownerId, callback) => {
    db.collection("courses").where("ownerId", "==", "123123")
    .get()
    .then(function(querySnapshot) {
        let courses = []
        querySnapshot.forEach(function(doc) {
            var course = doc.data()
            course.creationDate = course.creationDate.toDate()
            course.lastUpdate = course.lastUpdate.toDate()
            courses.push(course)
        });
        callback(apiResponse(true, "Getting course sucessfully.", courses));
    })
    .catch(function(error) {
        console.error("Error when getting courses: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null));
    });
}

export {
    addCourse,
    getCourses
}