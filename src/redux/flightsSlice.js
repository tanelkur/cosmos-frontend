import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allFlights: {
    id: "",
    validUntil: "",
    legs: [],
    reservations: [],
  },
  origin: "Earth",
  destination: "Jupiter",
  currentRoute: [],
  sortedCurrentLegs: [],
  selectedFlight: {},
  company: "",
};

const flightsSlice = createSlice({
  name: "currentFlights",
  initialState,
  reducers: {
    SET_ALL_FLIGHTS(state, action) {
      state.allFlights = action.payload;
    },
    SET_ORIGIN(state, action) {
      state.origin = action.payload;
    },
    SET_DESTINATION(state, action) {
      state.destination = action.payload;
    },
    SET_SELECTED_FLIGHT(state, action) {
      state.selectedFlight = action.payload;
    },
    SET_COMPANY(state, action) {
      state.company = action.payload;
    },
    SET_CURRENT_ROUTE(state, action) {
      state.currentRoute = action.payload;
    },
    SET_SORTED_CURRENT_LEGS(state, action) {
      state.sortedCurrentLegs = action.payload;
    },
  },
});

export const {
  SET_ALL_FLIGHTS,
  SET_ORIGIN,
  SET_DESTINATION,
  SET_CURRENT_ROUTE,
  SET_SORTED_CURRENT_LEGS,
  SET_SELECTED_FLIGHT,
  SET_COMPANY,
} = flightsSlice.actions;

export const selectAllFlights = (state) => state.currentFlights.allFlights;
export const selectOrigin = (state) => state.currentFlights.origin;
export const selectDestination = (state) => state.currentFlights.destination;
export const selectSelectedFlight = (state) =>
  state.currentFlights.selectedFlight;
export const selectCompany = (state) => state.currentFlights.company;
export const selectCurrentRoute = (state) => state.currentFlights.currentRoute;
export const selectSortedCurrentLegs = (state) =>
  state.currentFlights.sortedCurrentLegs;

export default flightsSlice.reducer;
