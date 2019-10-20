import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = props => {
  const [state, setState] = useState({ value: "", timeout: 0 });

  const handleChange = e => {
    e.preventDefault();
    if (state.timeout) {
      clearTimeout(state.timeout);
    }

    setState({
      value: e.target.value,
      timeout: setTimeout(() => {
        state.value && props.handleSearch(state.value);
      }, 1000)
    });
  };

  return (
    <div className="rmdb-searchbar">
      <div className="rmdb-searchbar-content">
        <i className="rmdb-fa-search fa fa-search fa-2x" />
        <input
          type="text"
          className="rmdb-searchbar-input"
          placeholder="Search"
          onChange={handleChange}
          value={state.value}
        />
      </div>
    </div>
  );
};
export default SearchBar;
