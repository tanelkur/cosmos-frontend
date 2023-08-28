import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectAllFlights,
  selectOrigin,
  SET_ALL_FLIGHTS,
} from "../redux/flightsSlice";
import axios from "axios";
import { BACKEND_URL } from "../App";
import RouteSelector from "../components/RouteSelect";
import FlightList from "../components/FlightList";
import FilterByCompany from "../components/FilterByCompany";
import SortFlightList from "../components/SortFlightList";
import { useTimer } from "../helperFunctions/useTimer";
import Customers from "../components/Customers";
import {
  SET_RESERVATIONS,
  selectReservations,
} from "../redux/reservationsSlice";
import { BsBoxArrowInUp } from "react-icons/bs";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoadingFlights, setIsLoadingFlights] = useState(false);
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);

  const allFlights = useSelector(selectAllFlights);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const reservations = useSelector(selectReservations);

  const validUntil = new Date(allFlights.validUntil).getTime();
  const dateNow = Date.now();

  useEffect(() => {
    const getCurrentPricelist = async () => {
      try {
        setIsLoadingFlights(true);
        const { data } = await axios.get(`${BACKEND_URL}/api/currentPricelist`);
        dispatch(SET_ALL_FLIGHTS(data));
        setIsLoadingFlights(false);
      } catch (error) {
        console.log(error);
      }
    };

    const getReservations = async () => {
      try {
        setIsLoadingReservations(true);
        const { data } = await axios.get(`${BACKEND_URL}/api/reservations`);
        dispatch(SET_RESERVATIONS(data));
        setIsLoadingReservations(false);
      } catch (error) {
        console.log(error);
      }
    };

    const getFlightsData = async () => {
      try {
        // setIsLoadingFlights(true);
        const { data } = await axios.get(`${BACKEND_URL}/api/pricelist`);
        dispatch(SET_ALL_FLIGHTS(data));
        // setIsLoadingFlights(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentPricelist();
    getFlightsData();
    getReservations();
  }, [dispatch]);

  useTimer(validUntil - dateNow);

  return (
    <div>
      <BsBoxArrowInUp
        className="scroll-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      />
      <div className="container">
        <RouteSelector
          allFlights={allFlights}
          origin={origin}
          destination={destination}
        />
        <div>
          <div className="company-flights">
            <div>
              <FilterByCompany
                allFlights={allFlights}
                origin={origin}
                destination={destination}
              />
              <div className="reservations">
                {isLoadingReservations ? (
                  <LoadingSpinner />
                ) : (
                  <Customers reservations={reservations} />
                )}
              </div>
            </div>
            <div className="flight-list-ml">
              <SortFlightList />
              {isLoadingFlights ? (
                <LoadingSpinner />
              ) : (
                <FlightList
                  allFlights={allFlights}
                  origin={origin}
                  destination={destination}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
