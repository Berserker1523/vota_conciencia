import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Inicio from "./Inicio.jsx";
import CandidatoPerfil from "./CandidatoPerfil.jsx";
import WishListComponent from "./WishList.jsx";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { WishList } from "../api/wishlist.js";
import { Meteor } from "meteor/meteor";

// App component - represents the whole app
const App = props => {
  console.log("App current User" + props.currentUser);
  console.log("Wishlist: ");
  console.log(props.wishlist);
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
        <Route
          path="/wishlist"
          render={propiedades => (
            <WishListComponent
              {...propiedades}
              currentUser={props.currentUser}
              wishlist={props.wishlist}
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
  wishlist: PropTypes.arrayOf(PropTypes.object)
};

const AppWrapper = withTracker(() => {
  if (Meteor.user()) {
    Meteor.subscribe("wishlist", Meteor.user()._id);
    return {
      currentUser: Meteor.user(),
      wishlist: WishList.find({}, {}).fetch()
    };
  } else {
    return {};
  }
})(App);

export default AppWrapper;
