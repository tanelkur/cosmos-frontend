import React from "react";
import { useSelector } from "react-redux";
import { selectGoogleNames } from "../redux/userSlice";
import { googleSigning } from "../helperFunctions/googleSigning";

const User = () => {
  const { googleFirstName, googleLastName } = useSelector(selectGoogleNames);

  return googleSigning(googleFirstName, googleLastName);
};

export default User;
