import React, { useState, memo } from "react";
import "../StyleFormat/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import Loading from "./Loading";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name!");
    if(!email) alert("Please enter email!");
    if(!password) alert("Please enter password!");
    registerWithEmailAndPassword(name, email, password, setLoading);
    setLoading(true);
  };

  return (
    <div className="login-page">
      <div className="form">
        <div className="register-form">
          <input type="text" placeholder="name" />
          <input type="password" placeholder="password" />
          <input type="text" placeholder="email address" />
          <button>create</button>
          <p className="message">
            Already registered?
            <Link to="/">
              <a href="#">Sign In</a>
            </Link>
          </p>
        </div>
        <div className="login-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={register}>Register</button>
          <button className="additionalButton" onClick={signInWithGoogle}>Register with Google</button>
          <p className="message">
            Already registered?
            <Link to="/">
              <a>Sign In</a>
            </Link>
          </p>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}
export default memo(Register);
