import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../firebase";
import "../StyleFormat/Reset.css";
function Reset() {
  const [email, setEmail] = useState("");

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default memo(Reset);
