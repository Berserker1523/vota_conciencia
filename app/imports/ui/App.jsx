import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Inicio from "./Inicio.jsx";
import CandidatoPerfil from "./CandidatoPerfil.jsx";
import WishListComponent from "./WishList.jsx";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { WishList } from "../api/wishlist.js";
import { Comentarios } from "../api/comentarios.js";
import { Meteor } from "meteor/meteor";

// App component - represents the whole app
const App = props => {
  console.log("App current User" + props.currentUser);
  console.log("Wishlist: ");
  console.log(props.wishlist);
  console.log("Comentarios: ");
  console.log(props.comentarios);
  return (
    <HashRouter>
      {/* envolvemos nuestra aplicación en el Router  */}
      <Switch>
        {/* también la envolvemos en el componente Switch */}
        <Route
          path="/"
          render={propiedades => (
            <Inicio {...propiedades} currentUser={props.currentUser} />
          )}
          exact
        />
        {/* y creamos nuestras rutas */}
        <Route
          path="/candidatos/:candidatoId"
          render={propiedades => (
            <CandidatoPerfil
              {...propiedades}
              currentUser={props.currentUser}
              wishlist={props.wishlist}
              comentarios={props.comentarios}
            />
          )}
          exact
        />
        <Route
          path="/wishlist"
          render={propiedades => (
            <WishListComponent
              {...propiedades}
              currentUser={props.currentUser}
              wishlist={props.wishlist}
              comentarios={props.comentarios}
            />
          )}
          exact
        />
      </Switch>
    </HashRouter>
  );
};

App.propTypes = {
  currentUser: PropTypes.object,
  wishlist: PropTypes.arrayOf(PropTypes.object),
  comentarios: PropTypes.arrayOf(PropTypes.object)
};

const AppWrapper = withTracker(() => {
  Meteor.subscribe("comentarios");

  if (Meteor.user()) {
    Meteor.subscribe("wishlist", Meteor.user()._id);
    return {
      currentUser: Meteor.user(),
      wishlist: WishList.find({}, {}).fetch(),
      comentarios: Comentarios.find({}, {}).fetch()
    };
  } else {
    return { comentarios: Comentarios.find({}, {}).fetch() };
  }
})(App);

export default AppWrapper;
