import React from "react";
import "../format.scss";

function Post(props) {
  return (
    <div className="post-wrapper">
      {/* <div className="vote-wrapper">
        <p>up</p>
        <p>Vote</p>
        <p>down</p>
      </div> */}
      <div className="post-content-wrapper" onClick={props.onClick}>
        <div className="title-wrapper">
          <h3>{props.title}</h3>
        </div>
        <div className="view-wrapper">Views: {props.view}</div>
        <div className="vote-wrapper">Vote: {props.vote}</div>
      </div>
    </div>
  );
}

export default Post;
