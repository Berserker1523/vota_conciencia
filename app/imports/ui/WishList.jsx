import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

import Navbar from "./Navbar.jsx";
import Propuesta from "./Propuesta.jsx";

import api from "../api/candidatos.json.js";
import { WishList } from "../api/wishlist.js";

class WishListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.mostrarPropuestas = this.mostrarPropuestas.bind(this);
  }

  mostrarPropuestas() {
    let propuestas = [];
    this.props.wishlist.forEach(item =>
      api.candidatos.forEach(candidato => {
        candidato.propuestas.forEach(propuesta => {
          if (propuesta.id === Number(item.propuesta)) {
            propuestas.push(
              <div className="row">
                <div className="col">
                  <Propuesta
                    key={propuesta.id}
                    candidato={candidato.nombre}
                    propuesta={{
                      id: propuesta.id,
                      categoria: propuesta.categoria,
                      titulo: propuesta.titulo,
                      descripcion: propuesta.descripcion
                    }}
                    currentUser={this.props.currentUser}
                  />
                </div>
              </div>
            );
          }
        });
      })
    );

    return propuestas;
  }

  render() {
    return (
      <div>
        <Navbar currentUser={this.props.currentUser} paginaActual="wishList" />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 style={{ marginTop: 0 }}>Wish List</h1>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col-6">{this.mostrarPropuestas()}</div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
}

WishListComponent.propTypes = {
  currentUser: PropTypes.object,
  wishlist: PropTypes.arrayOf(PropTypes.object).isRequired
};

const WishListWrapper = withTracker(({ currentUser }) => {
  if (currentUser) {
    Meteor.subscribe("wishlist");
    return {
      wishlist: WishList.find({}).fetch()
    };
  } else {
    return { wishlist: [] };
  }
})(WishListComponent);

export default WishListWrapper;
