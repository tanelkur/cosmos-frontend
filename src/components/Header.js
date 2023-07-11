import React, { useState } from "react";
import "./Header.css";
import { BsRocketFill } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShoppingCart } from "../redux/shoppingCartSlice";
import { selectGoogleNames } from "../redux/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMEnuOpen] = useState(false);
  const shoppingCartSize = useSelector(selectShoppingCart).length;
  const { googleFirstName } = useSelector(selectGoogleNames);
  const renderShoppingCartSize = () => {
    if (shoppingCartSize < 1) return;
    return (
      <div>
        <p className="cart-number">{shoppingCartSize}</p>
      </div>
    );
  };

  const renderMenuItem = (linkName, path) => {
    return (
      <p className="pointer" onClick={() => navigate(`/${path}`)}>
        {linkName}
      </p>
    );
  };

  const renderUserMenuItem = () => {
    return (
      <div className="flex-start mr pointer" onClick={() => navigate("/user")}>
        <p className="small-text">
          {`Welcome, ${googleFirstName ? googleFirstName : "guest"}`}
        </p>
        <p>
          <FiUser />
        </p>
      </div>
    );
  };

  return (
    <header className="header mb flex-between">
      <div className="flex-start">
        <p className="header-icon ml" onClick={() => navigate("/")}>
          <BsRocketFill />
        </p>

        <h1>Cosmos Odyssey</h1>
      </div>
      <div className="flex-start">
        <div className="header-desktop-menu header-text">
          <div className="mr">{renderMenuItem("Home", "")}</div>
          <div className="mr">
            {renderMenuItem("Reservations", "reservations")}
          </div>
          <div className="mr">{renderMenuItem("Help", "help")}</div>
          {renderUserMenuItem()}
        </div>
        <div className=" mr pointer cart-div" onClick={() => navigate("/cart")}>
          {renderShoppingCartSize()}
          <p>
            <RiShoppingCartLine style={{ fontSize: "3rem" }} />
          </p>
        </div>
        <div
          onClick={() => {
            setMobileMEnuOpen(!mobileMenuOpen);
          }}
          className="header-mobile-menu mr pointer"
        >
          <div
            className={`${
              mobileMenuOpen ? "show-mobile-menu" : "hide-mobile-menu"
            }`}
          >
            {renderMenuItem("Home", "")}
            {renderMenuItem("Reservations", "reservations")}
            {renderMenuItem("Help", "help")}
            {renderUserMenuItem()}
          </div>
          <p className="small-text">Menu</p>
          <AiOutlineMenu style={{ fontSize: "3rem" }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
