import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  Database,
  getDatabase,
  ref,
  set,
  child,
  get,
} from "@firebase/database";
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

function Postmain(props) {
  //   const [oldStage, setOldStage] = useState(props.stage);
  //   var teststage = oldStage;

  const [curVote, setCurVote] = useState(props.vote);

  const upVote = () => {
    console.log(props.vote);
    setCurVote(curVote + 1);
    set(ref(db, "Posts/" + props.title + "/Vote"), props.vote + 1);
  };

  const downVote = () => {
    console.log(props.vote);
    setCurVote(curVote - 1);
    set(ref(db, "Posts/" + props.title + "/Vote"), props.vote - 1);
  };

  const deletePost = () => {
    console.log("test");
    set(ref(db, "Posts/" + props.title), {});
    props.onClick();
  };

  useEffect(() => {
    const setView = (e) => {
      console.log(e);
      set(ref(db, "Posts/" + props.title + "/View"), e);
    };
    setView(props.view + 1);
  }, []);

  return (
    <div className="main-page">
      <div className="main-title">{props.title}</div>
      <br />
      <div className="main-desc">{props.desc}</div>
      <br />
      <div className="main-view-vote-wrapper">
        <div className="main-view">Views: {props.view}</div>
        <div className="main-vote-wrapper">
          <button onClick={upVote}>Up</button>
          {/* <button onClick={setVote(props.vote + 1)}>Up</button> */}
          <button onClick={downVote}>Down</button>
          {/* <button onClick={setVote(props.vote - 1)}>Down</button> */}
          <div>Vote: {curVote}</div>
        </div>
      </div>
      <button className="delete-button" onClick={deletePost}>
        Delete
      </button>
    </div>
  );
}

export default Postmain;
