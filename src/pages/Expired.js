import React from "react";
import Modal from "../components/Modal";
import Home from "./Home";

const Expired = () => {
  return (
    <div>
      <Home />
      <Modal modalText="Flights expired, click to continue with new opportunities" />
    </div>
  );
};

export default Expired;
