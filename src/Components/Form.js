import React, { useState } from "react";
import "../format.scss";

function Form(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const createTitle = (e) => {
    setTitle(e.target.value);
  };

  const createDesc = (e) => {
    setDesc(e.target.value);
  };

  const createPost = async () => {
    if (title !== "" && desc !== "") {
    }
  };

  return (
    <div className="form">
      <div className="text-field">
        <div>
          <label>Title:</label>
          <br />
          <input type="text" className="input-field" onChange={createTitle} />
        </div>
        <br />
        <div>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            className="input-field"
            onChange={createDesc}
          />
        </div>
        <div>
          <button onClick={createPost}>Create Post</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
