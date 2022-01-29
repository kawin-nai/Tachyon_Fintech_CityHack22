import React from "react";
import "../format.scss";

function Connector(props) {
  const loginHandler = async () => {
    props.onLogin();
  };

  return (
    <div>
      <button onClick={loginHandler} className="connect-button">
        Connect to Metamask
      </button>
    </div>
  );
}

export default Connector;
