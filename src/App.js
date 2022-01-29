import logo from "./logo.svg";
import Post from "./Components/Post";
import Navbar from "./Components/Navbar";
import Backdrop from "./Components/Backdrop";
import Form from "./Components/Form";
import React, { useState, useEffect } from "react";

function App() {
  const [stateChange, setStateChange] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const openModalHandler = () => {
    setModalOpen(true);
  };

  return (
    <div className="main-back">
      <button onClick={openModalHandler}>Open Modal</button>
      {modalOpen && <Backdrop onClick={closeModalHandler} />}
      {modalOpen && <Form onClick={closeModalHandler} />}
    </div>
  );
}

export default App;
