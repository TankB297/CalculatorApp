import React, { useState, useEffect, memo } from "react";
import "../StyleFormat/Login.css";
import { signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSucceed, setIsSucceed] = useState(false);

  const onClickLogin = () => {
    signInWithEmailAndPassword(email, password, setIsSucceed, setLoading);
    setLoading(true);
  };
  useEffect(() => {
    if (loading) {
      if (isSucceed) {
        navigate("/calculator");
      }
    }
  }, [isSucceed, loading]);

  const onClickLoginWithGoogle = () => {
    signInWithGoogle(setLoading, setIsSucceed);
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
            <a href="#">Sign In</a>
          </p>
        </div>
        <div className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={isSucceed ? "/calculator" : "/"}>
            <button onClick={onClickLogin}>Login</button>
          </Link>
          <Link to={isSucceed ? "/calculator" : "/"}>
            <button
              className="login__btn login__google"
              onClick={onClickLoginWithGoogle}
            >
              Login with Google
            </button>
          </Link>
          <div>
            <Link to="/reset">
              <a className="link-Forgot-Password">Forgot Password</a>
            </Link>
          </div>
          <p className="message">
            Not registered?
            <Link to="/register">
              <a>Create an account</a>
            </Link>
          </p>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}
export default memo(Login);
