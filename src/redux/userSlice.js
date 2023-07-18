import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleFirstName: "",
  googleLastName: "",
  googlePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_GOOGLE_DATA(state, action) {
      state.googleFirstName = action.payload.googleFirstName;
      state.googleLastName = action.payload.googleLastName;
      state.googlePicture = action.payload.googlePicture;
    },
  },
});

export const { SET_GOOGLE_DATA } = userSlice.actions;

export const selectGoogleData = (state) => state.user;

export default userSlice.reducer;
