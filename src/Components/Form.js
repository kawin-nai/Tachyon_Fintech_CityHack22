import React, { useState } from "react";
import "../format.scss";
import { initializeApp } from "firebase/app";
import {
  Database,
  getDatabase,
  ref,
  set,
  child,
  get,
} from "@firebase/database";
import { sha256, sha224 } from "js-sha256";

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
const dbRef = ref(db);

function Form(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [view, setView] = useState(0);
  const [author, setAuthor] = useState("");
  const [vote, setVote] = useState(0);
  const createTitle = (e) => {
    setTitle(e.target.value);
  };

  const createDesc = (e) => {
    setDesc(e.target.value);
  };

  const createPost = async () => {
    if (title !== "" && desc !== "") {
      console.log(sha256(title));
      set(ref(db, "Posts/" + title), {
        Title: title,
        Desc: desc,
        Id: 1,
        View: view,
        Vote: vote,
      });
    }
    props.onClick();
  };

  return (
    <div className="form">
      {/* {console.log(sha256("coolbeans"))} */}
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
        <br />
        <div>
          <button onClick={createPost}>Create Post</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
