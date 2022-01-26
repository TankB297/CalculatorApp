import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

const signInWithEmailAndPassword = async (
  email,
  password,
  setSucceed,
  setLoading
) => {
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

const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  setLoading,
  setSucceed
) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    await res.user.sendEmailVerification({
      url: "http://localhost:3000",
    });
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      result: [],
    });
    setSucceed(true);
    setLoading(false);
    alert("Email has been sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
    setSucceed(false);
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

export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
