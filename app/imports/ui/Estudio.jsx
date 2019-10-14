import React from "react";
import PropTypes from "prop-types";

class Estudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estudio: this.props.estudio
    };
  }

  render() {
    return (
      <div className="container-fluid estudio">
        <div className="row">
          <div className="col-8">
            <h2 className="titulo-estudio"> {this.state.estudio.titulo}</h2>
          </div>
          <div className="col col-lg-2">
            <h2 className="categoria-estudio">
              {this.state.estudio.universidad}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

Estudio.propTypes = {
  estudio: PropTypes.object.isRequired
};

export default Estudio;
