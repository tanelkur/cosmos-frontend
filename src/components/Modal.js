import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Modal = ({ modalText }) => {
  const navigate = useNavigate();

  return ReactDOM.createPortal(
    <div
      onClick={() => {
        navigate("/");
      }}
      className="modal"
    >
      <div className="modal-content">
        <div>
          <div>{modalText}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
