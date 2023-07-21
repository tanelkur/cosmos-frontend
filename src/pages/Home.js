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

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const allFlights = useSelector(selectAllFlights);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const reservations = useSelector(selectReservations);

  const validUntil = new Date(allFlights.validUntil).getTime();
  const dateNow = Date.now();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BACKEND_URL}/api/pricelist`);
        dispatch(SET_ALL_FLIGHTS(data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const getReservations = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/reservations`);
        dispatch(SET_RESERVATIONS(data));
      } catch (error) {
        console.log(error);
      }
    };
    getReservations();
    getData();
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
                <Customers reservations={reservations} />
              </div>
            </div>
            <div className="flight-list-ml">
              <SortFlightList />
              <FlightList
                allFlights={allFlights}
                origin={origin}
                destination={destination}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
