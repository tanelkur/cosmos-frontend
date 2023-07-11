import React, { useState } from "react";
import "./RouteSelect.css";
import { useDispatch } from "react-redux";
import {
  SET_COMPANY,
  SET_DESTINATION,
  SET_ORIGIN,
} from "../redux/flightsSlice";

const RouteSelector = ({ allFlights, origin, destination }) => {
  const [hiddenFrom, setHiddenFrom] = useState(true);
  const [hiddenTo, setHiddenTo] = useState(true);
  const dispatch = useDispatch();

  const dropDownClassName = (fromOrTo) => {
    if (fromOrTo === "from") return hiddenFrom ? "hidden" : "visible";
    if (fromOrTo === "to") return hiddenTo ? "hidden" : "visible";
    return null;
  };

  const dropDownMenu = (fromOrTo) => {
    const menuItemsArray = [];

    allFlights.legs.map((leg) => {
      if (fromOrTo === "from") {
        return menuItemsArray.push(leg.routeInfo[fromOrTo].name);
      }
      if (fromOrTo === "to" && leg.routeInfo.from.name === origin) {
        return menuItemsArray.push(leg.routeInfo[fromOrTo].name);
      }
      return null;
    });

    const uniqueValues = [...new Set(menuItemsArray)];

    return (
      <div
        className="dropdown"
        onMouseLeave={() => {
          setHiddenFrom(true);
          setHiddenTo(true);
        }}
      >
        {fromOrTo === "from" ? (
          <div
            className="btn btn-big"
            onMouseEnter={() => setHiddenFrom(false)}
          >
            {origin}
          </div>
        ) : (
          <div className="btn btn-big" onMouseEnter={() => setHiddenTo(false)}>
            {destination}
          </div>
        )}
        <ul className={`${dropDownClassName(fromOrTo)}`}>
          {uniqueValues.map((item, index) => {
            if (fromOrTo === "from" && item === origin) return;
            if (fromOrTo === "to" && item === destination) return;
            return (
              <li
                className="btn btn-big"
                onClick={() => {
                  if (fromOrTo === "from") {
                    const changeDestination = allFlights.legs.find(
                      (leg) => leg.routeInfo.from.name === item
                    );
                    dispatch(SET_ORIGIN(item));
                    dispatch(
                      SET_DESTINATION(changeDestination.routeInfo.to.name)
                    );
                    dispatch(SET_COMPANY(""));
                    setHiddenFrom(true);
                  }
                  if (fromOrTo === "to") {
                    dispatch(SET_DESTINATION(item));
                    dispatch(SET_COMPANY(""));
                    setHiddenTo(true);
                  }
                }}
                key={index}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="">
      <div className="grid2 mb2">
        <div>
          <div className="flex-start mb">
            <p className="big-number">01</p>
            <p className="thin-text">Select planet of departure</p>
          </div>
          <div style={{ zIndex: "1" }}>{dropDownMenu("from")}</div>
        </div>
        <div>
          <div className="flex-start mb">
            <p className="big-number">02</p>
            <p className="thin-text">Select planet of arrival</p>
          </div>
          <div>{dropDownMenu("to")}</div>
        </div>
      </div>
      <div className="flex-center mb">
        <div className="flex-start">
          <p className="big-number">03</p>
          <p className="thin-text">Select a flight and book it</p>
        </div>
      </div>
    </div>
  );
};

export default RouteSelector;
