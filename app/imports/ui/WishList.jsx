import React from "react";
import Navbar from "./Navbar.jsx";
import api from "../api/candidatos.json.js";
import Propuesta from "./Propuesta.jsx";
import PropTypes from "prop-types";

class WishList extends React.Component {
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
            console.log("forEach candidato: " + candidato.nombre);
            propuestas.push(
              <Propuesta
                key={propuesta.id}
                candidato={candidato.nombre}
                propuesta={{
                  categoria: propuesta.categoria,
                  titulo: propuesta.titulo,
                  descripcion: propuesta.descripcion
                }}
                currentUser={this.props.currentUser}
              />
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
              <button style={{ marginLeft: 10 }}>Filtrar</button>
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

WishList.propTypes = {
  currentUser: PropTypes.object,
  wishlist: PropTypes.arrayOf(PropTypes.object)
};

export default WishList;
