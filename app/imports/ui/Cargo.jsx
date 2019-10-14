import React from "react";
import PropTypes from "prop-types";

class Cargo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cargo: this.props.cargo
    };
  }

  render() {
    return (
      <div className="container-fluid cargo">
        <div className="row">
          <div className="col-8">
            <h2 className="titulo-cargo"> {this.state.cargo.cargo}</h2>
          </div>
          <div className="col col-lg-2">
            <h2 className="categoria-cargo">{this.state.cargo.tiempo}</h2>
          </div>
        </div>
      </div>
    );
  }
}

Cargo.propTypes = {
  cargo: PropTypes.object.isRequired
};

export default Cargo;
