import React from "react";
import "./RenderGoogleSignout.css";
import { useDispatch } from "react-redux";
import { SET_GOOGLE_NAMES } from "../redux/userSlice";

const RenderGoogleLogout = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="mb mt flex-start"
      onClick={() => {
        dispatch(
          SET_GOOGLE_NAMES({
            googleFirstName: "",
            googleLastName: "",
          })
        );
      }}
    >
      <p className="sign-out-text ml2">Sign out</p>
    </div>
  );
};

export default RenderGoogleLogout;
