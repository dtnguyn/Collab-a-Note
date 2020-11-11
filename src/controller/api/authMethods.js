import firebaseconfig from "./firebase";
import firebase from "firebase";

export const authMethods = {
  signup: (email, password, setErrors, setToken) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;
        await localStorage.setItem("token", token);
        setToken(window.localStorage.token);
        console.log(res);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
        console.error(err);
      });
  },
  signin: (email, password, setErrors, setToken) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;
        await localStorage.setItem("token", token);
        setToken(window.localStorage.token);
        console.log(res);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  signout: (setErrors, setToken) => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        localStorage.removeItem("token");
        setToken(null);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
        localStorage.removeItem("token");
        setToken(null);
        console.error(err.message);
      });
  },
};
