import React from "react";
import Navbar from "./Navbar.jsx";
import api from "../api/candidatos.json.js";

class Inicio extends React.Component {

  renderCandidatos() {
    return
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
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <hr className="red"/>
            </div>
            <div className="col">
              <hr className="yellow"/>
            </div>
          </div>
        </div>
        <div className="instrucciones">
          <h1>Arma tu propio plan de gobierno</h1>
          <div className="container-fluid pasos">
            <div className="row">
              <div className="col-sm">
                <img src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" className="img-instrucciones"/>
                <p className="paso">Selecciona el candidato del cual quieres conocer las propuestas</p>
              </div>
              <div className="col-sm">
                <img src="https://image.flaticon.com/icons/svg/25/25304.svg" alt="Simbolo más" className="img-instrucciones"/>
                <p className="paso">Haz click en "agregar" sobre la propuesta que te interesa</p>
              </div>
              <div className="col-sm">
                <img src="https://image.flaticon.com/icons/png/512/114/114903.png" alt="Icono de lista" className="img-instrucciones"/>
                <p className="paso">Revisa tu perfil</p>
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
