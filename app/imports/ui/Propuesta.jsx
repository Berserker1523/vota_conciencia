import React from "react";

class Propuesta extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      propuesta : this.props.propuesta,
    }
  }

  render() {
    return(
      <div className="container-fluid propuesta">
        <div className="row">
          <div className="col-8">
            <h2 className="titulo-propuesta"> {this.state.propuesta.titulo}</h2>
          </div>
          <div className="col col-lg-2">
            <h2 className="categoria-propuesta">{this.state.propuesta.categoria}</h2>
          </div>
          <div className="col col-lg-2">
            <button type="button" class="btn btn-default btn-sm">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <p className="descripcion-propuesta">{this.state.propuesta.descripcion}</p>
        </div>
      </div>
    );
  }
}

export default Propuesta;