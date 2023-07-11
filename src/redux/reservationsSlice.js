import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: [],
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    SET_RESERVATIONS(state, action) {
      state.reservations = action.payload;
    },
  },
});

export const { SET_RESERVATIONS } = reservationsSlice.actions;

export const selectReservations = (state) => state.reservations.reservations;

export default reservationsSlice.reducer;
