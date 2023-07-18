import React from "react";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_DATA } from "../redux/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const RenderGoogleLogin = () => {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      onSuccess={(response) => {
        console.log(jwtDecode(response.credential));

        dispatch(
          SET_GOOGLE_DATA({
            googleFirstName: jwtDecode(response.credential).given_name,
            googleLastName: jwtDecode(response.credential).family_name,
            googlePicture: jwtDecode(response.credential).picture,
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
