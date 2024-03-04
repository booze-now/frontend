import React from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from '../contexts/TranslationContext';
import { useUser } from '../contexts/UserContext';
// import { useTheme } from '../contexts/ThemeContext';

const Logout = () => {
  const { /* language, languages, */ __ /*, changeLanguage*/ } = useTranslation();
  const { /* user, login, */ logout } = useUser();// || {};
  // const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  }

  return (
    <>
      <div className="container">
        <button
          className="btn btn-sm btn-info"
          onClick={handleClick}
        >
          {__("Logout")}
        </button>
      </div>
    </>
  );
};

export default Logout;


