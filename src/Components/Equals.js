import { memo, useState, useEffect } from "react";
import "../StyleFormat/Equals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Equals(props) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.emailVerified) {
      alert("You need to verify your email!");
      navigate("/");
    }
  }, [user]);

  return (
    <div className="displayEquals">
      <p>{props.userInput}</p>
    </div>
  );
}
export default memo(Equals);
