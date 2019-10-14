import React from "react";
import PropTypes from "prop-types";
import "../api/wishlist.js";
import { Meteor } from "meteor/meteor";

class Propuesta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propuesta: this.props.propuesta
    };
    this.addWishList = this.addWishList.bind(this);
  }

  addWishList() {
    console.log(this.props.propuesta.id);
    console.log(this.props.currentUser);
    Meteor.call(
      "wishlist.create",
      this.props.currentUser._id,
      this.props.propuesta.id + ""
    );
  }

  render() {
    console.log("Propuesta candidato: " + this.props.candidato);
    return (
      <div className="container-fluid propuesta">
        {this.props.candidato ? (
          <div className="row">
            <div className="col-8">
              <h6 className="candidato-propuesta">{this.props.candidato}</h6>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-8">
            <h2 className="titulo-propuesta"> {this.state.propuesta.titulo}</h2>
          </div>
          <div className="col col-lg-2">
            <h2 className="categoria-propuesta">
              {this.state.propuesta.categoria}
            </h2>
          </div>
          <div className="col col-lg-2">
            <button
              type="button"
              className="btn btn-default btn-sm"
              onClick={this.addWishList}
            >
              {this.props.candidato ? (
                <i className="fa fa-minus"></i>
              ) : (
                <i className="fa fa-plus"></i>
              )}
            </button>
          </div>
        </div>
        <div className="row">
          <p className="descripcion-propuesta">
            {this.state.propuesta.descripcion}
          </p>
        </div>
      </div>
    );
  }
}

Propuesta.propTypes = {
  candidato: PropTypes.string,
  propuesta: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

export default Propuesta;
