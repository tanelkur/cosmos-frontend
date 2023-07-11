import React from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_NAMES } from "../redux/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const RenderGoogleLogin = () => {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      onSuccess={(response) => {
        dispatch(
          SET_GOOGLE_NAMES({
            googleFirstName: jwtDecode(response.credential).given_name,
            googleLastName: jwtDecode(response.credential).family_name,
          })
        );
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default RenderGoogleLogin;
