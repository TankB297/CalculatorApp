import React, { memo } from "react";
import "../StyleFormat/Login.css";

function Waiting() {
  return (
    <div className="login-page">
      <div className="form">
        <div className="login-form">
         <h2>Verification email has been sent to the email you just registered, please check your email!</h2>
        </div>
      </div>
    </div>
  );
}
export default memo(Waiting)
