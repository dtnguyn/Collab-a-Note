import { db, storage, apiResponse } from "./api/firebase";

const addCourse = (newCourse, callback) => {
  console.log(newCourse);
  db.collection("courses")
    .doc(newCourse.id)
    .set(newCourse)
    .then(function () {
      console.log("Add course sucessfully!");
      callback(apiResponse(true, "Add course successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when adding course: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const getCourses = (ownerId, callback) => {
  db.collection("courses")
    .where("ownerId", "==", ownerId)
    .get()
    .then(function (querySnapshot) {
      let courses = [];
      querySnapshot.forEach(function (doc) {
        var course = doc.data();
        course.creationDate = course.creationDate.toDate();
        course.lastUpdate = course.lastUpdate.toDate();
        courses.push(course);
      });
      callback(apiResponse(true, "Getting course sucessfully.", courses));
    })
    .catch(function (error) {
      console.error("Error when getting courses: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const deleteCourse = (courseId, callback) => {
  db.collection("courses")
    .doc(courseId)
    .delete()
    .then(function () {
      console.log("Delete course sucessfully!");
      callback(apiResponse(true, "Delete course successfully.", null));
    })
    .catch(function (error) {
      console.error("Error when deleting course: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const updateCourse = (updatedCourse, callback) => {
  db.collection("courses")
    .doc(updatedCourse.id)
    .set(updatedCourse)
    .then(function () {
      console.log("Update course sucessfully!");
      callback(apiResponse(true, "Update course successfully.", updatedCourse));
    })
    .catch(function (error) {
      console.error("Error when updating course: ", error);
      callback(
        apiResponse(false, "There's some error! Please try again", null)
      );
    });
};

const uploadCoverImage = (file, course, callback) => {
  console.log(file, course);
  var uploadTask = storage.ref().child(`courses/images/${file.name}`).put(file);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    function (error) {
      callback(
        apiResponse(false, `Error when uploading image: ${error.message}`, null)
      );
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        console.log(course);
        course.coverImg = downloadURL;
        updateCourse(course, callback);
      });
    }
  );
};

export { addCourse, getCourses, deleteCourse, updateCourse, uploadCoverImage };
