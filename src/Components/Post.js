import React from "react";
import "../format.scss";

function Post(props) {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.desc}</p>
    </div>
  );
}

export default Post;
