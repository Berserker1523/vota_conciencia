import React from "react";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to={"/"}>
        {"Vota'Conciencia logo"}
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" style={{ marginTop: 12 }}>
            <AccountsUIWrapper />
          </li>
          <li>
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
          <li className="nav-item">
            <Link
              to={"/candidatos"}
              className={
                props.paginaActual === "Candidatos"
                  ? "nav-link disabled"
                  : "nav-link"
              }
            >
              Candidatos
            </Link>
          </li>
          {props.currentUser ? (
            <li className="nav-item">
              <Link
                to={"/wishList"}
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

const NavbarWrapper = withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(Navbar);

export default NavbarWrapper;
