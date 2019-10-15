import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { HashRouter, Switch, Route } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import Inicio from "./Inicio.jsx";
import CandidatoPerfil from "./CandidatoPerfil.jsx";
import WishListComponent from "./WishList.jsx";

// App component - represents the whole app
const App = props => {
  console.log("App current User" + props.currentUser);
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
            <CandidatoPerfil {...propiedades} currentUser={props.currentUser} />
          )}
          exact
        />
        <div role="main">
        <Route
          path="/wishlist"
          render={propiedades => (
            <WishListComponent
              {...propiedades}
              currentUser={props.currentUser}
            />
              /* incluir un main landmark */
          )}
           <div role="main">
          exact
        />
      </Switch>
    </HashRouter>
  );
};

App.propTypes = {
  currentUser: PropTypes.object
};

const AppWrapper = withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(App);

export default AppWrapper;
