import "./RenderFlightDetails.css";
import { BsRocketTakeoff } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";
import { TbPigMoney } from "react-icons/tb";
import { SET_CART_ADD_ITEM } from "../redux/shoppingCartSlice";
import { useDispatch } from "react-redux";
import { priceToDecimal } from "../helperFunctions/priceToDecimal";

export const RenderFlightDetails = ({
  selectedFlight,
  cancelText,
  submitText,
  setHidden,
  setToCart,
}) => {
  const dispatch = useDispatch();

  if (!selectedFlight.price) return;

  const {
    destination,
    origin,
    price,
    company: { name: company },
    startYear,
    endYear,
    startMonth,
    endMonth,
    startDay,
    endDay,
    startTime,
    endTime,
    durationDays,
    durationHours,
  } = selectedFlight;

  const renderCancelBtn = (cancelText) => {
    if (cancelText === "") return;
    return (
      <div
        className="btn btn-cancel"
        onClick={() => {
          setHidden(true);
        }}
      >
        {cancelText}
      </div>
    );
  };

  const renderSubmitBtn = (submitText) => {
    if (submitText === "") return;
    return (
      <div
        className="btn btn-primary"
        onClick={() => {
          dispatch(SET_CART_ADD_ITEM({ ...selectedFlight }));
          setToCart(true);
          setTimeout(() => {
            setToCart(false);
            setHidden(true);
          }, 700);
        }}
      >
        {submitText}
      </div>
    );
  };

  return (
    <div
      className="selected-flight--box card-effect"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="selected-flight--container">
        <div>
          <div className="flex-center mb">
            <div>
              <p>
                <BsRocketTakeoff
                  style={{ fontSize: "2rem", color: "#f4d35e" }}
                />
              </p>
              <p>
                Planet of departure: <b>{origin}</b>
              </p>
              <p>
                Depature date: <b>{startMonth}</b>, <b>{startDay}</b>,
                <b>{startYear}</b>
              </p>
              <p className="ml">
                Time: <b>{startTime}</b>
              </p>
            </div>
            <div>
              <p>
                <BsRocketTakeoff
                  style={{
                    fontSize: "2rem",
                    color: "#f4d35e",
                    transform: "rotate(90deg)",
                  }}
                />
              </p>
              <p>
                Planet of arrival: <b>{destination}</b>
              </p>
              <p>
                Arrival date: <b>{endMonth}</b>, <b>{endDay}</b>,
                <b>{endYear}</b>
              </p>
              <p className="ml">
                Time: <b>{endTime}</b>
              </p>
            </div>
          </div>
          <hr className="mb" />
          <div className="flex-center mb">
            <div>
              <p>
                <BiTimer style={{ fontSize: "2rem", color: "#f4d35e" }} />
              </p>
              <p>
                Flight duration: <b>{durationDays}</b>d <b>{durationHours}</b>h
              </p>
              <hr className="mb" />
              <p>
                Operating carrier: <b>{company}</b>
              </p>
              <p>Free snacks and drinks on board</p>
            </div>
            <div>
              <p>
                <TbPigMoney style={{ fontSize: "2rem", color: "#f4d35e" }} />
              </p>
              <span className="flex-start">
                <p>Price:</p>{" "}
                <p style={{ fontSize: "1.6rem" }}>{priceToDecimal(price)}€</p>
              </span>
            </div>
          </div>

          <div className="flex-center">
            {renderCancelBtn(cancelText)}
            {renderSubmitBtn(submitText)}
          </div>
        </div>
      </div>
    </div>
  );
};
