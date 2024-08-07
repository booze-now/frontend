import React, { useState } from "react";
import { useTranslation } from "contexts/TranslationContext.js";
import { useUser } from "contexts/UserContext.js";
import "./topnav.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const TopNav = () => {
  const { __, language, languages, changeLanguage } = useTranslation();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleSearch = () => {
    navigate(`/drinks?search=${searchQuery}`);
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="sb-topnav navbar navbar-expand-lg custom-navbar navbar-background">
      <Link data-ek="brand" className="navbar-brand ps-3" to="/">
        <img style={{ width: 70 }} src="/pictures/booze-logo.png" alt="Logo" />
      </Link>
      <li className="nav-item" style={{ listStyleType: 'none'}} >
            <Link className="nav-link" to="">
              <span className="gold-text">Booze Now</span>
            </Link>
          </li>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
      >
        <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavbarCollapsed ? "" : "show"}`}>
        <ul className="navbar-nav ms-auto me-3">
        </ul>
        {!user ? (
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item">
              <Link data-ek="login" to="/login" className="nav-link">
                <span className="white-text">{__("Login")}</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownUserLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="fas fa-user fa-fw"
                  style={{ fontSize: 30, marginRight: 5 }}
                ></i>
                {user.first_name ?? __("Guest")}
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownUserLink"
              >
                <li>
                  <Link className="dropdown-item" to="/orders">
                    <span className="white-text">{__("Orders")}</span>
                  </Link>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/profile">
                    <span className="white-text">{__("Profile")}</span>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => logout()}>
                    <span className="white-text">{__("Logout")}</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        )}
        <ul className="navbar-nav ms-auto me-3">
          <li className="nav-item">
            <Link className="nav-link" to="/drinks">
              <span className="white-text">{__("Beverage Menu")}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shopping-cart">
              <span className="white-text">{__("Shopping Cart")}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about-us">
              <span className="white-text">{__("About us")}</span>
            </Link>
          </li>
        </ul>
        <form
          className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0 hidden-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="input-group" style={{ maxWidth: "500px", paddingTop: "10px" }}>
            <input
              className="form-control"
              type="text"
              placeholder={__("Search for...")}
              aria-label={__("Search for...")}
              aria-describedby="btnNavbarSearch"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button" onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <Link
              data-ek="langDropdown"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#!"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span style={{ fontSize: 23 }} className={"fi fi-" + languages[language].code}></span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              {Object.keys(languages).map((e, i) => (
                <li key={i}>
                  <Link
                    data-ek={"langSelect" + e}
                    className="dropdown-item"
                    href="#!"
                    onClick={() => {
                      changeLanguage(e);
                    }}
                  >
                    <span className={"fi fi-" + languages[e].code}> </span>
                    &nbsp;
                    {__(languages[e].name)}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <Link className="nav-link" to="/shopping-cart">
          <span style={{ fontSize: 25 }}>
            <i className="fa-solid fa-basket-shopping"></i>
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default TopNav;
