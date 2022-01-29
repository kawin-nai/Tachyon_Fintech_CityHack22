import logo from "./logo.svg";
import Post from "./Components/Post";
import Navbar from "./Components/Navbar";
import Backdrop from "./Components/Backdrop";
import Form from "./Components/Form";
import Connector from "./Components/Connector";
import Postmain from "./Components/Postmain";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  Database,
  getDatabase,
  get,
  ref,
  set,
  child,
} from "@firebase/database";
import { saveAs, FileSaver } from "file-saver";

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

function App() {
  const [stateChange, setStateChange] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [ListOfProduct, setListOfProduct] = useState();
  const [mainPageTitle, setMainPageTitle] = useState("");
  const [mainPageDesc, setMainPageDesc] = useState("");
  const [mainPageShown, setMainPageShown] = useState(false);
  const [mainPageView, setMainPageView] = useState();
  const [mainPageVote, setMainPageVote] = useState();
  const [curView, setCurView] = useState();

  const login = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
          setIsConnected(true);
        });
    } else {
      console.log("Metamask not installed");
    }
  };

  const accountChangeHandler = (newaccount) => {
    setAccount(newaccount);
    // updateEthers();
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const closeModalHandlerWithReload = () => {
    setModalOpen(false);
    window.location.reload(false);
  };

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const mainPageHandler = () => {
    setMainPageShown(true);
  };

  const closeMainPageHandler = () => {
    setMainPageShown(false);
    // window.location.reload(false);
  };

  const closeMainPageHandlerReload = () => {
    setMainPageShown(false);
    window.location.reload(false);
  };

  const getAllData = () => {
    get(child(dbRef, "Posts")).then((snapshot) => {
      var allproducts = [];

      snapshot.forEach((childSnapshot) => {
        allproducts.push(childSnapshot.val());
      });

      setListOfProduct(allproducts);
      console.log(allproducts);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <div className="navbar">
        <button onClick={openModalHandler} className="connect-button">
          New Post
        </button>
        {modalOpen && <Backdrop onClick={closeModalHandler} />}
        {modalOpen && <Form onClick={closeModalHandlerWithReload} />}

        {!isConnected && <Connector onLogin={login} />}
        {isConnected && <div className="account-number">{account}</div>}
      </div>
      {mainPageShown && (
        <Postmain
          title={mainPageTitle}
          desc={mainPageDesc}
          view={mainPageView}
          vote={mainPageVote}
          onClick={closeMainPageHandlerReload}
        />
      )}
      {mainPageShown && <Backdrop onClick={closeMainPageHandler} />}
      <div className="main-back">
        <div className="content-wrapper">
          {ListOfProduct
            ? ListOfProduct.map((databasearrdetail) => {
                return (
                  <Post
                    desc={databasearrdetail.Desc}
                    title={databasearrdetail.Title}
                    view={databasearrdetail.View}
                    vote={databasearrdetail.Vote}
                    onClick={() => {
                      setMainPageDesc(databasearrdetail.Desc);
                      setMainPageTitle(databasearrdetail.Title);
                      setMainPageView(databasearrdetail.View);
                      setMainPageVote(databasearrdetail.Vote);
                      mainPageHandler();
                    }}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
