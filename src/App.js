import Post from "./Components/Post";
import Navbar from "./Components/Navbar";
import Backdrop from "./Components/Backdrop";
import Form from "./Components/Form";
import Connector from "./Components/Connector";
import Postmain from "./Components/Postmain";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { ethers } from "ethers";
import {
  Database,
  getDatabase,
  get,
  ref,
  set,
  child,
} from "@firebase/database";
import tachyoncontract from "./tachyoncontract.json";
import logo from "./shareablelogo.svg";

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
  const contractAddress = "0x4aa4d686b6108631e79f160fccadc0788b832e15";

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
    updateEthers();
  };

  const updateEthers = () => {
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    const tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    const tempContract = new ethers.Contract(
      contractAddress,
      tachyoncontract,
      // portalcontracttwo,
      tempSigner
    );
    setContract(tempContract);
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

  const resetVote = async () => {
    await contract.resetVote().catch((error) => {
      alert(error.message);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="all">
      <div className="navbar">
        <div className="left-navbar">
          <button onClick={openModalHandler} className="connect-button">
            New Post
          </button>
          {modalOpen && <Backdrop onClick={closeModalHandler} />}
          {modalOpen && (
            <Form onClick={closeModalHandlerWithReload} mycontract={contract} />
          )}
          <button onClick={resetVote} className="reset-button">
            Reset
          </button>
        </div>
        <div className="logo-brand">
          <img src={logo} alt="logo" className="main-logo" />
          <h1 id="brand">Shareable</h1>
        </div>

        {!isConnected && <Connector onLogin={login} />}
        {isConnected && <div className="account-number">{account}</div>}
      </div>
      {mainPageShown && (
        <Postmain
          title={mainPageTitle}
          desc={mainPageDesc}
          view={mainPageView}
          vote={mainPageVote}
          mycontract={contract}
          onClick={closeMainPageHandlerReload}
        />
      )}
      {mainPageShown && <Backdrop onClick={closeMainPageHandler} />}
      <div className="main-back">
        <div className="post">
          <h2>Posts</h2>
        </div>
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
