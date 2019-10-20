import React from "react";
import PropTypes from "prop-types";
import "./FourColGrid.css";

const FourColGrid = props => {
  // Iterate through all the movie props
  const renderElements = () => {
    const gridElements = props.children.map((element, i) => {
      return (
        <div key={i} className="rmdb-grid-element">
          {element}
        </div>
      );
    });
    return gridElements;
  };

  return (
    <div className="rmdb-grid">
      {props.header && !props.loading ? <h1>{props.header}</h1> : null}
      <div className="rmdb-grid-content">{renderElements()}</div>
    </div>
  );
};

FourColGrid.propTypes = {
  header: PropTypes.string
};

export default FourColGrid;
