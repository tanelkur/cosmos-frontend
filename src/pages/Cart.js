import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../App";
import {
  SET_SELECTED_FLIGHT,
  selectAllFlights,
  selectSelectedFlight,
} from "../redux/flightsSlice";
import { useNavigate } from "react-router-dom";
import { RenderFlightDetails } from "../components/RenderFlightDetails";
import {
  SET_CART_DELETE_ITEM,
  selectShoppingCart,
  SET_EMTY_CART,
} from "../redux/shoppingCartSlice";
import { BsArrowRight, BsInfoCircle } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { priceToDecimal } from "../helperFunctions/priceToDecimal";
import { selectGoogleNames } from "../redux/userSlice";
import RenderGoogleLogin from "../components/RenderGoogleLogin";

const Cart = () => {
  let totalPrice = 0,
    totalTimeMillis = 0,
    totalDays,
    totalHours;

  const selectedFlight = useSelector(selectSelectedFlight);
  const shoppingCart = useSelector(selectShoppingCart);
  const { _id: flightMongoId, reservations } = useSelector(selectAllFlights);
  const { googleFirstName, googleLastName } = useSelector(selectGoogleNames);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hidden, setHidden] = useState(true);
  const [clickLocation, setClickLocation] = useState([1000, 200]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(googleFirstName);
    setLastName(googleLastName);
  }, [googleFirstName, googleLastName]);

  const renderShoppingCart = () => {
    return shoppingCart.map((item, index) => {
      return (
        <li key={index} className="card-effect cart-item grid4 cart-grid">
          <span className="flex-start">
            <p>{index + 1}.</p>
            <p>{item.origin}</p>
            <p>
              <BsArrowRight />
            </p>
            <p>{item.destination}</p>
          </span>
          <span className="flex-start">
            <p>{item.startDay}</p>
            <p>{item.startMonth}</p>
            <p>{item.startTime}</p>
          </span>
          <span>
            <p>{priceToDecimal(item.price)}€</p>
          </span>
          <span className="flex-between ml2">
            <p
              className="cart-info-icon"
              onClick={(e) => {
                setClickLocation([e.pageX, e.pageY]);
                dispatch(SET_SELECTED_FLIGHT(item));
                setHidden(false);
              }}
            >
              <BsInfoCircle />
            </p>
            <p
              className="cart-delete-icon ml"
              id={index}
              onClick={(e) => {
                const newShoppingCart = shoppingCart.toSpliced(
                  e.currentTarget.id,
                  1
                );
                dispatch(SET_CART_DELETE_ITEM([...newShoppingCart]));
              }}
            >
              <RxCross1 />
            </p>
          </span>
        </li>
      );
    });
  };

  const renderTotals = () => {
    return (
      <div className="grid4 small-text">
        <span>
          <p>Total flights:</p>
          <p>
            <b>{shoppingCart.length}</b>
          </p>
        </span>
        <span>
          <p>Total travel time:</p>
          <p>
            <b>{totalDays}</b>d <b>{totalHours}</b>h
          </p>
        </span>
        <span>
          <p>Total price:</p>
          <p>
            <b>{priceToDecimal(totalPrice)}</b>€
          </p>
        </span>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form className="flex-start ml" onSubmit={(e) => onSubmit(e)}>
        <input
          className="input"
          type="text"
          placeholder="First name"
          required
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Last name"
          required
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Book {`${shoppingCart.length > 1 ? "flights" : "Flight"}`}
        </button>
      </form>
    );
  };

  const totalTimeAndPrice = () => {
    shoppingCart.map((item) => {
      totalPrice = totalPrice + item.price;

      return (totalTimeMillis =
        totalTimeMillis +
        new Date(item.flightEnd).getTime() -
        new Date(item.flightStart).getTime());
    });
    totalDays = Math.floor(totalTimeMillis / 1000 / 60 / 60 / 24);
    totalHours = Math.floor(
      (totalTimeMillis - totalDays * 1000 * 60 * 60 * 24) / 1000 / 60 / 60
    );
  };
  totalTimeAndPrice();

  const onSubmit = async (e) => {
    const bookTime =
      new Date().toLocaleString("en-UK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      new Date().toLocaleTimeString("en-UK", {
        hour12: false,
      });

    e.preventDefault();
    const data = {
      flightMongoId,
      reservations,
      firstName: firstName[0].toUpperCase().trim() + firstName.slice(1).trim(),
      lastName: lastName[0].toUpperCase().trim() + lastName.slice(1).trim(),
      shoppingCart,
      totalPrice,
      totalDays,
      totalHours,
      bookTime,
    };

    try {
      await axios.post(`${BACKEND_URL}/api/reservation`, data);
      dispatch(SET_EMTY_CART());
      navigate("/reservations");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleHidden = () => {
    return hidden ? "hidden cart-hidden" : "visible cart-visible";
  };

  if (shoppingCart.length === 0)
    return (
      <div className="container-small">
        <p className="mb">Shopping cart is empty</p>
        <p className="pointer" onClick={() => navigate("/")}>
          Click here to find Your next flight
        </p>
      </div>
    );

  return (
    <div className="container-small">
      <div className="grid4 cart-column-info">
        <p>Route</p>
        <p>Start Date</p>
        <p>Price</p>
        <p className="ml2">Manage Cart</p>
      </div>
      <ul className="mb small-text">{renderShoppingCart()}</ul>
      <div>{renderTotals()}</div>
      <div className="google-box ml mt">
        <p>You can use Google Account to fill the form</p>
        <RenderGoogleLogin />
      </div>
      <div
        style={{
          transformOrigin: `${clickLocation[0]}px ${clickLocation[1]}px`,
        }}
        className={`${toggleHidden()} selected-flight`}
        onClick={() => {
          setHidden(true);
        }}
      >
        <RenderFlightDetails
          selectedFlight={selectedFlight}
          cancelText="Back to Cart"
          submitText=""
          setHidden={setHidden}
        />
      </div>
      <div className="reservation-form ">{renderForm()}</div>
    </div>
  );
};

export default Cart;
