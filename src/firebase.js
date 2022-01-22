//import firebase from "firebase";
//import * as firebase from "firebase/app"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useState } from "react";

const MyContext = React.createContext(false);

const ChangeStatus = () => {
  const [status, setStatus] = useState(false);
  setStatus(true);
}

const firebaseConfig = {
  apiKey: "AIzaSyB9s_s43ImdaFEQo_hYpsS7zYaVNVmvgGI",
  authDomain: "calculator-app-final.firebaseapp.com",
  projectId: "calculator-app-final",
  storageBucket: "calculator-app-final.appspot.com",
  messagingSenderId: "382998698900",
  appId: "1:382998698900:web:ae697f0023d1749b9a8d81",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async (setLoading, setSucceed) => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        result: []
      });
    }
    setLoading(false);
    setSucceed(true);
  } catch (err) {
    console.error(err);
    alert(err.message);
    setLoading(false);
  }
};

const signInWithEmailAndPassword = async (email, password, setSucceed, setLoading) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    setSucceed(true);
    setLoading(false);
  } catch (err) {
    console.error(err);
    alert(err.message);
    setLoading(false);
  }
};

const registerWithEmailAndPassword = async (name, email, password, setLoading) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      result: []
    });
    setLoading(false);
    alert("Sign Up Success!");
  } catch (err) {
    console.error(err);
    alert(err.message);
    setLoading(false);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

<MyContext.Provider value={ChangeStatus.status}></MyContext.Provider>;
export {
  MyContext,
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
