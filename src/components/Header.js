import React, { useState } from "react";
import "./Header.css";
import { BsRocketFill } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
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
      <p className="flex-start pointer" onClick={() => navigate("/user")}>
        <span>{`Welcome, ${googleFirstName ? googleFirstName : "guest"}`}</span>
        <FiUser className="user-icon" />
      </p>
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
        <div className="header-desktop-menu ">
          <div className="header-text mr">{renderMenuItem("Home", "")}</div>
          <div className="header-text mr">
            {renderMenuItem("Reservations", "reservations")}
          </div>
          <div className="header-text mr">{renderMenuItem("Help", "help")}</div>
          <div className="header-text" style={{ fontSize: "1.8rem" }}>
            {renderUserMenuItem()}
          </div>
        </div>
        <div
          className="header-text mr pointer cart-div"
          onClick={() => navigate("/cart")}
        >
          {renderShoppingCartSize()}
          <p className="ml">
            <RiShoppingCartLine style={{ fontSize: "3rem" }} />
          </p>
        </div>
        <div
          onClick={() => {
            setMobileMEnuOpen(!mobileMenuOpen);
          }}
          className="header-mobile-menu mr pointer"
        >
          <div className={`mobile-menu ${mobileMenuOpen ? "" : "hide"}`}>
            <div className="mobile-menu-items">
              <RxCross1 className="mobile-x-icon" />
              {renderMenuItem("Home", "")}
              {renderMenuItem("Reservations", "reservations")}
              {renderMenuItem("Help", "help")}
              {renderUserMenuItem()}
            </div>
          </div>

          {/* <p className="small-text">Menu</p> */}
          <AiOutlineMenu style={{ fontSize: "4rem" }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
