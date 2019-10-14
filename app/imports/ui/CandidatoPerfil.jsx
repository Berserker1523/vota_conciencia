import React from "react";
import Navbar from "./Navbar.jsx";
//import { Link } from "react-router-dom";
import api from "../api/candidatos.json.js";
import Propuesta from "./Propuesta.jsx";
import Cargo from "./Cargo.jsx";
import Estudio from "./Estudio.jsx";
import PropTypes from "prop-types";

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
      return (
        <div className="biografia">
          <h1>Biografía</h1>
          <p className="biografia">{candidato.biografia}</p>
        </div>
      );
    } else if (this.state.estado === "Cargos") {
      return (
        <div>
          <h1>Cargos</h1>
          {candidato.cargos_anteriores.map((cargo, i) => (
            <Cargo key={i} cargo={cargo} />
          ))}
        </div>
      );
    } else if (this.state.estado === "Estudios") {
      return (
        <div>
          <h1>Estudios</h1>
          {candidato.estudios.map((estudio, i) => (
            <Estudio key={i} estudio={estudio} />
          ))}
        </div>
      );
    } else if (this.state.estado === "Noticias") {
      return <h1>Noticias</h1>;
    }
  }

  render() {
    console.log("Candidato perfil: " + this.props.currentUser);
    const candidato = api.candidatos[this.state.candidatoId - 1];
    return (
      <div>
        <Navbar currentUser={this.props.currentUser} paginaActual="" />
        <div className="container-fluid perfil-candidato">
          <div className="row">
            <div className="col titulo-candidato">
              <h2> {candidato.nombre} </h2>
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
              <h5>Partido {candidato.partido}</h5>
              <h5>{candidato.cargo_aspirante}</h5>
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
                  <button
                    onClick={e => this.handleClick("Propuestas", e)}
                    className={
                      this.state.estado === "Propuestas"
                        ? "btn-disabled"
                        : "btn"
                    }
                  >
                    Propuestas
                  </button>
                  <button
                    onClick={e => this.handleClick("Biografía", e)}
                    className={
                      this.state.estado === "Biografía" ? "btn-disabled" : "btn"
                    }
                  >
                    Biografía
                  </button>
                  <button
                    onClick={e => this.handleClick("Cargos", e)}
                    className={
                      this.state.estado === "Cargos" ? "btn-disabled" : "btn"
                    }
                  >
                    Cargos
                  </button>
                  <button
                    onClick={e => this.handleClick("Estudios", e)}
                    className={
                      this.state.estado === "Estudios" ? "btn-disabled" : "btn"
                    }
                  >
                    Estudios
                  </button>
                  <button
                    onClick={e => this.handleClick("Noticias", e)}
                    className={
                      this.state.estado === "Noticias" ? "btn-disabled" : "btn"
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
  currentUser: PropTypes.object
};

export default CandidatoPerfil;
