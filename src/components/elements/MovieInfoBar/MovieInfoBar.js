import React from "react";
import { calcTime, convertMoney } from "../../../helpers";
import "./MovieInfoBar.css";

const MovieInfoBar = props => {
  return (
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <i className="fa fa-clock-o fa-2x"></i>
          <span className="rmdb-movieinfobar-info">
            Running time:{calcTime(props.time)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <i className="fa fa-money fa-2x"></i>
          <span className="rmdb-movieinfobar-info">
            Budget: {convertMoney(props.budget)}
          </span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <i className="fa fa-usd fa-2x"></i>
          <span className="rmdb-movieinfobar-info">
            Revenue {convertMoney(props.revenue)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBar;
