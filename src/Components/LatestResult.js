import React, { useState, memo } from "react";
import "../StyleFormat/LatestResult.css";
import logoutIcon from "../Images/logout.png";
import logOutIconHover from "../Images/logoutHover.png";
import { Link } from "react-router-dom";

function LatestResult(props) {
  const [icon, setIcon] = useState(logoutIcon);
  const handleMouseOver = () => {
    setIcon(logOutIconHover);
  };
  const handleMouseOut = () => {
    setIcon(logoutIcon);
  };
  return (
    <div className="result-main">
      <Link to='/'>
        <img
          src={icon}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </Link>
      <h1>Latest 10 Results</h1>
      <p>{props.latestResult}</p>
    </div>
  );
}
export default memo(LatestResult)
