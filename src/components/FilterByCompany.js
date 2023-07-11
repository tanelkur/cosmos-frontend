import React, { useState } from "react";
import "./FilterByCompany.css";
import { SET_COMPANY, selectCompany } from "../redux/flightsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

const FilterByCompany = ({ allFlights, origin, destination }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const currentCompany = useSelector(selectCompany);
  const renderXIcon = (company) => {
    if (company === currentCompany) {
      return (
        <div>
          <RxCross1
            className="company-icon"
            onClick={() => {
              dispatch(SET_COMPANY(""));
              setActive(false);
            }}
          />
        </div>
      );
    }
    return;
  };
  const providersArray = [];
  const filteredRoute = allFlights.legs.filter(
    (leg) =>
      leg.routeInfo.from.name === origin &&
      leg.routeInfo.to.name === destination
  );
  filteredRoute[0]?.providers.map((leg) => {
    return providersArray.push(leg.company.name);
  });

  const uniqueCompanies = [...new Set(providersArray)];

  const renderCompanies = uniqueCompanies.map((company, index) => {
    return (
      <li key={index} className="company-select">
        <div
          className={`company-link ${
            active && company === currentCompany ? "active" : ""
          }`}
          onClick={() => {
            dispatch(SET_COMPANY(company));
            setActive(true);
          }}
        >
          {company}
        </div>
        <div>{renderXIcon(company)}</div>
      </li>
    );
  });

  return (
    <div>
      <p className="filter-company-text medium-text">Filter by company:</p>
      <ul className="mb">{renderCompanies}</ul>
    </div>
  );
};

export default FilterByCompany;
