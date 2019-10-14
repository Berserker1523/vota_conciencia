import React from "react";
import PropTypes from "prop-types";
import "../api/wishlist.js";
import "../api/comentarios.js";
import { Meteor } from "meteor/meteor";
import Comentario from "./Comentario.jsx";

class Propuesta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propuesta: this.props.propuesta,
      comentario: "",
      mostrarComentarios: false
    };
    this.addWishList = this.addWishList.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.showComments = this.showComments.bind(this);
    this.changeShowComments = this.changeShowComments.bind(this);
  }

  changeShowComments() {
    console.log("Comentarios propuesta: ");
    console.log(this.props.comentarios);
    console.log("Cambió el estado from: " + this.state.mostrarComentarios);
    this.setState({ mostrarComentarios: !this.state.mostrarComentarios });
  }

  showComments() {
    console.log("Llgeue a showComments");
    let comentarios = [];
    this.props.comentarios.forEach(comentario => {
      if (this.props.propuesta.id === Number(comentario.upper)) {
        comentarios.push(
          <Comentario
            key={comentario._id}
            comentario={{
              nombreUsuario: comentario.nombreUsuario,
              texto: comentario.texto
            }}
          />
        );
      }
    });
    return comentarios;
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      console.log("crear comentario");
      console.log(this.props.propuesta.id);
      console.log(this.state.comentario);
      Meteor.call(
        "comentarios.create",
        this.props.propuesta.id + "",
        this.state.comentario
      );
      this.setState({ comentario: "" });
    }
  }

  handleComment(e) {
    this.setState({ comentario: e.target.value });
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
          <div className="col">
            <p className="descripcion-propuesta">
              {this.state.propuesta.descripcion}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              placeholder="Escribe un comentario"
              onChange={this.handleComment}
              onKeyPress={this.onKeyPress}
              value={this.state.comentario}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button onClick={this.changeShowComments}>
              {!this.state.mostrarComentarios
                ? "Ver comentarios"
                : "Ocultar comentarios"}
            </button>
          </div>
        </div>
        {this.state.mostrarComentarios ? (
          <div className="row">
            <div className="col">{this.showComments()}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

Propuesta.propTypes = {
  candidato: PropTypes.string,
  propuesta: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  comentarios: PropTypes.arrayOf(PropTypes.object)
};

export default Propuesta;
