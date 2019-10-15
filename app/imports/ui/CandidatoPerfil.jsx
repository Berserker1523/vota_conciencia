import React from "react";
import Navbar from "./Navbar.jsx";
//import { Link } from "react-router-dom";
import api from "../api/candidatos.json.js";
import Propuesta from "./Propuesta.jsx";
import Cargo from "./Cargo.jsx";
import Estudio from "./Estudio.jsx";
import PropTypes from "prop-types";
/*


Issue description
Ensures buttons have discernible text


Element does not have inner text that is visible to screen readers

aria-label attribute does not exist or is empty

aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty

Element's default semantics were not overridden with role="presentation"

Element's default semantics were not overridden with role="none"

Element has no title attribute or the title attribute is empty
*/

class CandidatoPerfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidatoId: this.props.match.params.candidatoId,
      estado: "Propuestas"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(estado) {
    this.setState({
      estado: estado
    });
  }

  renderState(candidato) {
    if (this.state.estado === "Propuestas") {
      return candidato.propuestas.map((propuesta, i) => (
        <Propuesta
          key={i}
          propuesta={propuesta}
          currentUser={this.props.currentUser}
        />
      ));
    } else if (this.state.estado === "Biografía") {
      return <p className="biografia">{candidato.biografia}</p>;
    } else if (this.state.estado === "Cargos") {
      return candidato.cargos_anteriores.map((cargo, i) => (
        <Cargo key={i} cargo={cargo} />
      ));
    } else if (this.state.estado === "Estudios") {
      return candidato.estudios.map((estudio, i) => (
        <Estudio key={i} estudio={estudio} />
      ));
    } else if (this.state.estado === "Noticias") {
      return <h1>Noticias</h1>;
    }
  }

  render() {
    const candidato = api.candidatos[this.state.candidatoId - 1];
    return (
      <div>
        <Navbar currentUser={this.props.currentUser} paginaActual="" />
        <div className="container-fluid perfil-candidato">
          <div className="row">
            <div className="col titulo-candidato">
              <h1> {candidato.nombre} </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md4">
              <img
                className="img-candidato"
                src={candidato.foto_url}
                alt={`Candidato ${candidato.nombre}`}
              />
            </div>
            <div className="col informacion-basica">
              <p>Partido {candidato.partido}</p>
              <p>{candidato.cargo_aspirante}</p>
            </div>
            <div className="col col-lg-2 redes-sociales">
              <div className="row">
                <div className="col-sm">
                  <a href={candidato.redes_sociales.Facebook}>
                    <img
                      src="https://images.vexels.com/media/users/3/137253/isolated/preview/90dd9f12fdd1eefb8c8976903944c026-icono-de-facebook-logo-by-vexels.png"
                      alt="Logo Facebook"
                      className="red-social-logo"
                    />
                  </a>
                </div>
                <div className="col-sm">
                  <a href={candidato.redes_sociales.Twitter}>
                    <img
                      src="https://images.vexels.com/media/users/3/137419/isolated/preview/b1a3fab214230557053ed1c4bf17b46c-icono-de-twitter-logo-by-vexels.png"
                      alt="Logo Twitter"
                      className="red-social-logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid informacion">
            <div className="row">
              <div className="col col-lg-2 menu-candidato">
                <div className="btn-group-vertical">
                  <button role="presentation"
                    onClick={e => this.handleClick("Propuestas", e)}
                    className={
                      this.state.estado === "Propuestas"
                        ? "btn disabled"
                        : "btn"
                    }
                    aria-disabled={
                      this.state.estado === "Propuestas" ? true : false
                    }
                  >
                    Propuestas
                  </button>
                  <button
                    onClick={e => this.handleClick("Biografía", e)}
                    className={
                      this.state.estado === "Biografía" ? "btn disabled" : "btn"
                    }
                    aria-disabled={
                      this.state.estado === "Biografía" ? true : false
                    }
                  >
                    Biografía
                  </button>
                  <button
                    onClick={e => this.handleClick("Cargos", e)}
                    className={
                      this.state.estado === "Cargos" ? "btn disabled" : "btn"
                    }
                    aria-disabled={
                      this.state.estado === "Cargos" ? true : false
                    }
                  >
                    Cargos
                  </button>
                  <button
                    onClick={e => this.handleClick("Estudios", e)}
                    className={
                      this.state.estado === "Estudios" ? "btn disabled" : "btn"
                    }
                    aria-disabled={
                      this.state.estado === "Estudios" ? true : false
                    }
                  >
                    Estudios
                  </button>
                  <button
                    onClick={e => this.handleClick("Noticias", e)}
                    className={
                      this.state.estado === "Noticias" ? "btn disabled" : "btn"
                    }
                    aria-disabled={
                      this.state.estado === "Noticias" ? true : false
                    }
                  >
                    Noticias
                  </button>
                </div>
              </div>
              <div className="col info-estado">
                {this.renderState(candidato)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CandidatoPerfil.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  wishlist: PropTypes.arrayOf(PropTypes.object),
  comentarios: PropTypes.arrayOf(PropTypes.object)
};

export default CandidatoPerfil;
