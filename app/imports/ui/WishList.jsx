import React from "react";
import Navbar from "./Navbar.jsx";
//import { Link } from "react-router-dom";
import api from "../api/candidatos.json.js";
import Propuesta from "./Propuesta.jsx";
import PropTypes from "prop-types";

class WishList extends React.Component {
  render() {
    return <h1>HOLAAA</h1>;
  }
}

WishList.propTypes = {
  currentUser: PropTypes.object
};

export default WishList;
