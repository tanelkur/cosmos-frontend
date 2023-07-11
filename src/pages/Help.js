import React from "react";
import "./Help.css";
import solar from "../img/solar.jpg";

const Help = () => {
  return (
    <div className="container">
      <p>Pricelist api:</p>
      <a href="https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices">
        https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices
      </a>
      <p className="mb mt">Hover image to see all available routes</p>
      <div className="wrapper">
        <div className="help-overlay"></div>
        <img src={solar} alt="available routes between planets" />
      </div>
    </div>
  );
};

export default Help;
