import React, { useEffect, useState } from "react";
import "./SortFlightList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_SORTED_CURRENT_LEGS,
  selectCurrentRoute,
} from "../redux/flightsSlice";
import { ImSortNumbericDesc, ImSortNumericAsc } from "react-icons/im";

const SortFlightList = () => {
  const [sortBy, setSortBy] = useState("price");
  const [ascending, setAscending] = useState(true);
  const dispatch = useDispatch();
  const currentRoute = useSelector(selectCurrentRoute);
  const newDate = (date) => {
    return new Date(date).getTime();
  };
  const sortByDate = (flightStartOrEnd) => {
    sorted = ascending
      ? legsArray.sort(
          (a, b) => newDate(a[flightStartOrEnd]) - newDate(b[flightStartOrEnd])
        )
      : legsArray.sort(
          (a, b) => newDate(b[flightStartOrEnd]) - newDate(a[flightStartOrEnd])
        );
  };

  // Make array of flights
  const legsArray = [];
  currentRoute?.providers?.map((flight) => {
    return legsArray.push(flight);
  });

  // Sort array
  let sorted;
  if (sortBy === "price") {
    sorted = ascending
      ? legsArray.sort((a, b) => a.price - b.price)
      : legsArray.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "start") {
    sortByDate("flightStart");
  }
  if (sortBy === "end") {
    sortByDate("flightEnd");
  }

  if (sortBy === "duration") {
    const calcDuration = (aOrB) => {
      return newDate(aOrB.flightEnd) - newDate(aOrB.flightStart);
    };
    sorted = ascending
      ? legsArray.sort((a, b) => calcDuration(a) - calcDuration(b))
      : legsArray.sort((a, b) => calcDuration(b) - calcDuration(a));
  }

  useEffect(() => {
    dispatch(SET_SORTED_CURRENT_LEGS(sorted));
  }, [dispatch, sorted]);

  const showIcon = (sortType) => {
    if (sortType === sortBy)
      return ascending ? (
        <b>
          <ImSortNumericAsc />
        </b>
      ) : (
        <b>
          <ImSortNumbericDesc />
        </b>
      );
  };

  return (
    <div className="grid4 sort-flight-list">
      <div
        className="flex-start column-info pointer"
        onClick={() => {
          setSortBy("start");
          setAscending(!ascending);
        }}
      >
        <p>Start</p> {showIcon("start")}
      </div>
      <div
        className="flex-start column-info pointer"
        onClick={() => {
          setSortBy("duration");
          setAscending(!ascending);
        }}
      >
        <p>Duration</p> {showIcon("duration")}
      </div>
      <div
        className="flex-start column-info pointer"
        onClick={() => {
          setSortBy("end");
          setAscending(!ascending);
        }}
      >
        <p>End</p> {showIcon("end")}
      </div>
      <div
        className="flex-start column-info pointer"
        onClick={() => {
          setSortBy("price");
          setAscending(!ascending);
        }}
      >
        <p>Price</p> {showIcon("price")}
      </div>
    </div>
  );
};

export default SortFlightList;
