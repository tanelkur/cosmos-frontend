import React from "react";
import "./Customers.css";
import { BsArrowRight } from "react-icons/bs";
import { priceToDecimal } from "../helperFunctions/priceToDecimal";

const Customers = ({ reservations }) => {
  const hashName = (name) => {
    return name[0] + "*".repeat(name.length - 1);
  };

  const renderCustomers = () => {
    return reservations.map((reservation, index) => {
      return (
        <li key={index} className="card-effect mb customers">
          <div className="names">
            <p className="inline">{`${hashName(
              reservation.firstName
            )} ${hashName(reservation.lastName)}`}</p>
            <p className="inline customers-small-text">
              {reservation.bookTime}
            </p>
          </div>
          <ul className="customers-text">
            <p className="booked">{`Booked ${
              reservation.shoppingCart.length > 1
                ? `${reservation.shoppingCart.length} trips:`
                : "1 trip:"
            }`}</p>
            {reservation.shoppingCart.map((item, index) => {
              return (
                <li key={index} className="flex-start">
                  {item.origin}
                  <BsArrowRight />
                  {item.destination}
                </li>
              );
            })}
          </ul>
          <div>
            <p className="inline customers-text">{`Total price: `}</p>
            <p className="inline medium-text">{`${priceToDecimal(
              reservation.totalPrice
            )}€`}</p>
          </div>
        </li>
      );
    });
  };

  return (
    <div>
      <p className="medium-text">Latest bookings:</p>
      <ul>{renderCustomers()}</ul>
    </div>
  );
};

export default Customers;
