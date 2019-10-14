import React from "react";
import Navbar from "./Navbar.jsx";
import api from "../api/candidatos.json.js";

class Inicio extends React.Component {
  renderCandidatos() {
    return;
  }
  render() {
    return (
      <div>
        <Navbar paginaActual="Inicio" />
        <div className="container-fluid inicio">
          <div className="candidatos">
            <h1>Conoce los candidatos</h1>
            <div className="container-fluid">
              <div className="row">
                {api.candidatos.map(candidato => (
                  <div className="col-sm" key={candidato.id}>
                    <img
                      className="img-candidato"
                      src={candidato.foto_url}
                      alt={`Candidato ${candidato.nombre}`}
                    />
                    <h2 className="nombre-candidato">{candidato.nombre}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="instrucciones">
            <h1>Arma tu propio plan de gobierno</h1>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm">
                  <h1 className="paso">Paso 1</h1>
                </div>
                <div className="col-sm">
                  <h1 className="paso">Paso 2</h1>
                </div>
                <div className="col-sm">
                  <h1 className="paso">Paso 3</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*const mostrarCandidatos = () => {
    console.log("Llgeue aki");
    console.log("candidatos: ");
    console.log(api.candidatos);
    return api.candidatos.map(candidato => {
      <div>
        <img src={candidato.foto_url} alt={`Candidato ${candidato.nombre}`} />
        <h2>{candidato.nombre}</h2>
      </div>;
    });
  };*/

/*  return (
    <div className="container-fluid">
      <Navbar paginaActual="Inicio" />
      <div>
        <h1>Conoce a los candidatos</h1>
        {api.candidatos.map(candidato => (
          <div key={candidato.id}>
            <img
              src={candidato.foto_url}
              alt={`Candidato ${candidato.nombre}`}
            />
            <h2>{candidato.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};*/

export default Inicio;
