import React from "react";
import { useSelector } from "react-redux";
import { selectGoogleData } from "../redux/userSlice";
import { googleSigning } from "../helperFunctions/googleSigning";

const User = () => {
  const { googleFirstName, googleLastName } = useSelector(selectGoogleData);

  return googleSigning(googleFirstName, googleLastName);
};

export default User;
