import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer flex-between mb">
      <div className="flex-start ">
        <p
          className="pointer small-text ml"
          onClick={() => {
            navigate("/");
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          Home
        </p>
        <p
          className="pointer small-text ml"
          onClick={() => {
            navigate("/reservations");
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          Reservations
        </p>
        <p
          className="pointer small-text ml"
          onClick={() => {
            navigate("/help");
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          Help
        </p>
      </div>
      <p className="small-text mr">Site design / logo © 2023</p>
    </footer>
  );
};

export default Footer;
