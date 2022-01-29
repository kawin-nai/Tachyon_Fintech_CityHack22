import React, { useState } from "react";
import "../format.scss";
import { initializeApp } from "firebase/app";
import { Database, getDatabase, ref, set, child } from "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrTL0337ihHSJwk8HfDsrdd9-oFZr6xAY",
  authDomain: "tachyon-cityhack.firebaseapp.com",
  databaseURL:
    "https://tachyon-cityhack-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tachyon-cityhack",
  storageBucket: "tachyon-cityhack.appspot.com",
  messagingSenderId: "1088178599200",
  appId: "1:1088178599200:web:b27fd2a422d1ee86c35345",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

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
      set(ref(db, "Posts/" + title), {
        Title: title,
        Desc: desc,
        Id: 1,
      });
    }
    props.onClick();
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
