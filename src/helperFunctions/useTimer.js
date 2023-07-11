import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_EMTY_CART } from "../redux/shoppingCartSlice";
import { SET_SELECTED_FLIGHT } from "../redux/flightsSlice";

export const useTimer = (time) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!time || time < 0) return;
  setTimeout(() => {
    dispatch(SET_EMTY_CART());
    dispatch(SET_SELECTED_FLIGHT({}));
    navigate("/expired");
  }, time);
};
