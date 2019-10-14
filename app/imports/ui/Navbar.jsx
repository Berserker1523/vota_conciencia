import React from "react";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to={"/"}>
        {"Vota'Conciencia logo"}
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" style={{ marginTop: 10, marginLeft: 10 }}>
            <AccountsUIWrapper />
          </li>
          <li className="nav-item">
            <Link
              to={"/"}
              className={
                props.paginaActual === "Inicio"
                  ? "nav-link disabled"
                  : "nav-link"
              }
            >
              Inicio
            </Link>
          </li>
          {props.currentUser ? (
            <li className="nav-item">
              <Link
                to={"/wishlist"}
                className={
                  props.paginaActual === "wishList"
                    ? "nav-link disabled"
                    : "nav-link"
                }
              >
                Wish List
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  paginaActual: PropTypes.string.isRequired,
  currentUser: PropTypes.object
};

export default Navbar;
