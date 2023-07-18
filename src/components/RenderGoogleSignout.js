import React from "react";
import "./RenderGoogleSignout.css";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_DATA } from "../redux/userSlice";

const RenderGoogleLogout = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="mb mt flex-center"
      onClick={() => {
        dispatch(
          SET_GOOGLE_DATA({
            googleFirstName: "",
            googleLastName: "",
          })
        );
      }}
    >
      <p className="sign-out-text">Sign out</p>
    </div>
  );
};

export default RenderGoogleLogout;
