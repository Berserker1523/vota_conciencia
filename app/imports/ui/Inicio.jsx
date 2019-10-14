import React from "react";
import Navbar from "./Navbar.jsx";

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
                <div className="col-sm">
                  <img className="img-candidato" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Foto de ..."/>
                  <h1 className="nombre-candidato">Candidato 1</h1>
                </div>
                <div className="col-sm">
                  <img className="img-candidato" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Foto de ..."/>
                  <h1 className="nombre-candidato">Candidato 2</h1>
                </div>
                <div className="col-sm">
                  <img className="img-candidato" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Foto de ..."/>
                  <h1 className="nombre-candidato">Candidato 3</h1>
                </div>
                <div className="col-sm">
                  <img className="img-candidato" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Foto de ..."/>
                  <h1 className="nombre-candidato">Candidato 4</h1>
                </div>
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

export default Inicio;
