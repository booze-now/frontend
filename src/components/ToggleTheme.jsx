import "./ToggleTheme.css";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  const handleChange = (event) => {
    event.target.blur();
    toggleTheme();
  };

  return (
    <div className="toggle-theme" >
      <i className="fa-regular fa-moon"></i>&nbsp;
      <div className="form-check form-switch">
        <input type="checkbox" role="switch" id="theme-toggler" onChange={handleChange}
        className="form-check-input" checked={theme}></input>
      </div>
      <i className="fa-regular fa-sun"></i>
    </div >
  );
};

export default ToggleTheme;
