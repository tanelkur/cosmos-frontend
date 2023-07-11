import React, { useEffect, useState } from "react";
import "./FlightList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CURRENT_ROUTE,
  SET_SELECTED_FLIGHT,
  selectCompany,
  selectSelectedFlight,
  selectSortedCurrentLegs,
} from "../redux/flightsSlice";
import { datesAndTimes } from "../helperFunctions/datesAndTimes";
import { RenderFlightDetails } from "./RenderFlightDetails";
import { priceToDecimal } from "../helperFunctions/priceToDecimal";

const FlightList = ({ allFlights, origin, destination }) => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const [toCart, setToCart] = useState(false);
  const [hoveredListItem, setHoveredListItem] = useState(-1);

  const selectedFlight = useSelector(selectSelectedFlight);
  const sortedLegs = useSelector(selectSortedCurrentLegs);
  const company = useSelector(selectCompany);

  const currentRoute = allFlights.legs.filter(
    (leg) =>
      leg.routeInfo.from.name === origin &&
      leg.routeInfo.to.name === destination
  );

  useEffect(() => {
    dispatch(SET_CURRENT_ROUTE(currentRoute[0]));
  }, [dispatch, currentRoute]);

  const availableFlights = sortedLegs?.map((flight, index) => {
    const {
      startYear,
      endYear,
      startMonth,
      endMonth,
      startDay,
      endDay,
      startTime,
      endTime,
      durationDays,
      durationHours,
    } = datesAndTimes(flight);

    if (flight.company.name === company || company === "") {
      return (
        <li
          className="grid-flights card-effect"
          key={index}
          onMouseEnter={() => {
            setHoveredListItem(index);
          }}
          onMouseLeave={() => setHoveredListItem(-1)}
          onClick={() => {
            dispatch(
              SET_SELECTED_FLIGHT({
                ...flight,
                origin,
                destination,
                durationDays,
                durationHours,
                startYear,
                endYear,
                startMonth,
                endMonth,
                startDay,
                endDay,
                startTime,
                endTime,
              })
            );
            setHidden(false);
          }}
        >
          <div className="grid4">
            <div>
              <p
                className="small-text"
                style={{
                  marginBottom: "1rem",
                }}
              >
                Flight start:
              </p>
              <div className="flex-start">
                <div className="column">
                  <div className="day">{startDay}</div>
                  <span className="month-year">
                    <p>{startMonth}</p>
                    <p>{startYear}</p>
                  </span>
                </div>
                <p className="time">{startTime}</p>
              </div>
            </div>
            <div>
              <p
                className="small-text"
                style={{
                  marginBottom: "1rem",
                }}
              >
                Duration:
              </p>
              <p style={{ color: "#869db3" }}>
                {durationDays}d {durationHours}h
              </p>
            </div>
            <div>
              <p className="small-text" style={{ marginBottom: "1rem" }}>
                Flight end:
              </p>
              <div className="flex-start">
                <div className="column">
                  <div className="day">{endDay}</div>
                  <span className="month-year">
                    <p>{endMonth}</p>
                    <p>{endYear}</p>
                  </span>
                </div>
                <p className="time">{endTime}</p>
              </div>
            </div>
            <div>
              <p
                className="small-text"
                style={{
                  marginBottom: "1rem",
                }}
              >
                Price:
              </p>
              <p style={{ color: "#c3a94b", fontSize: "2.6rem" }}>
                {priceToDecimal(flight.price)}€
              </p>
            </div>
          </div>
          <div className="flex-center">
            <div>
              <p className="small-text">Carrier:</p>
              <p>{flight.company.name}</p>
            </div>
            <p
              className={`${
                hoveredListItem === index
                  ? "more-info-visible"
                  : "more-info-hidden"
              }`}
            >
              Click for more info
            </p>
          </div>
        </li>
      );
    } else return null;
  });

  return (
    <div>
      <ul>{availableFlights}</ul>
      <div
        className={`${
          hidden ? "hidden flight-list--hidden" : "visible flight-list--visible"
        } ${toCart ? "to-cart" : ""}  selected-flight`}
        onClick={() => {
          setHidden(true);
        }}
      >
        <RenderFlightDetails
          selectedFlight={selectedFlight}
          cancelText="Back to Flights"
          submitText="Add to Cart"
          setHidden={setHidden}
          setToCart={setToCart}
        />
      </div>
    </div>
  );
};

export default FlightList;
