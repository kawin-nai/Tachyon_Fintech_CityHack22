import React from "react";
import "../format.scss";

function Backdrop(props) {
  return <div className="backdrop" onClick={props.onClick}></div>;
}

export default Backdrop;
