import { configureStore } from "@reduxjs/toolkit";
import currentFlightsReducer from "./flightsSlice";
import reservationsReducer from "./reservationsSlice";
import shoppingCartReducer from "./shoppingCartSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    currentFlights: currentFlightsReducer,
    reservations: reservationsReducer,
    shoppingCart: shoppingCartReducer,
    user: userReducer,
  },
});
