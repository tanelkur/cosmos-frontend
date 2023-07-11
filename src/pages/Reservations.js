import React, { useEffect } from "react";
import Customers from "../components/Customers";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_RESERVATIONS,
  selectReservations,
} from "../redux/reservationsSlice";
import axios from "axios";
import { BACKEND_URL } from "../App";

const Reserved = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);
  useEffect(() => {
    const getReservations = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/reservations`);
        dispatch(SET_RESERVATIONS(data));
      } catch (error) {
        console.log(error);
      }
    };

    getReservations();
  }, [dispatch]);

  return (
    <div className="container">
      <Customers reservations={reservations} />
    </div>
  );
};

export default Reserved;
