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
            <h3 className="titulo-estudio"> {this.state.estudio.titulo}</h3>
          </div>
          <div className="col col-lg-2">
            <h3 className="categoria-estudio">
              {this.state.estudio.universidad}
            </h3>
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
