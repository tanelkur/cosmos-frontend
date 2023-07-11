import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleFirstName: "",
  googleLastName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_GOOGLE_NAMES(state, action) {
      state.googleFirstName = action.payload.googleFirstName;
      state.googleLastName = action.payload.googleLastName;
    },
  },
});

export const { SET_GOOGLE_NAMES } = userSlice.actions;

export const selectGoogleNames = (state) => state.user;

export default userSlice.reducer;
