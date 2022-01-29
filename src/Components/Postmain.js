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
import like from "./like.png";
import dislike from "./dislike.png";
import likefilled from "./likefilled.png";
import dislikefilled from "./dislikefilled.png";
import bin from "./bin.png";

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
  const [curVote, setCurVote] = useState(props.vote);
  const [ID, setID] = useState();
  var contract = props.mycontract;

  const upVote = async () => {
    console.log(props.vote);
    // console.log("ID: " + ID);
    await contract
      .increaseVote(ID)
      .then(() => {
        setCurVote(curVote + 1);
        set(ref(db, "Posts/" + props.title + "/Vote"), props.vote + 1);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const downVote = async () => {
    console.log(props.vote);
    // console.log(props.Id);
    await contract
      .decreaseVote(ID)
      .then(() => {
        setCurVote(curVote - 1);
        set(ref(db, "Posts/" + props.title + "/Vote"), props.vote - 1);
      })
      .catch((error) => {
        alert(error.message);
      });
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
    console.log(props.mycontract);

    get(child(dbRef, "Posts/" + props.title + "/Id")).then((snapshot) => {
      console.log("ID retrieved" + snapshot.val());
      setID(snapshot.val());
    });
  }, []);

  return (
    <div className="main-page">
      <div className="main-top">
        <div className="main-title">{props.title}</div>
        <img
          className="bin-button"
          src={bin}
          alt="Delete Button"
          onClick={deletePost}
        />
        {/* <button className="delete-button" onClick={deletePost}>
          Delete
        </button> */}
      </div>

      <br />
      <div className="main-desc">{props.desc}</div>
      <br />
      <div className="main-view-vote-wrapper">
        <div className="main-view">Views: {props.view}</div>
        <div className="main-vote-wrapper">
          <img
            className="like-button"
            src={likefilled}
            alt="Like Button"
            onClick={upVote}
          />
          {/* <button onClick={upVote}>Up</button> */}
          {/* <button onClick={setVote(props.vote + 1)}>Up</button> */}
          <img
            className="dislike-button"
            src={dislikefilled}
            alt="Dislike Button"
            onClick={downVote}
          />
          {/* <button onClick={downVote}>Down</button> */}
          {/* <button onClick={setVote(props.vote - 1)}>Down</button> */}
          <div>Vote: {curVote}</div>
        </div>
      </div>
    </div>
  );
}

export default Postmain;
