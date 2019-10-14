import React from "react";
import Navbar from "./Navbar.jsx";
import api from "../api/candidatos.json.js";

const Inicio = () => {
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

  return (
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
};

export default Inicio;
