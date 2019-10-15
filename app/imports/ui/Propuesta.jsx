import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Comentario from "./Comentario.jsx";
import { Comentarios } from "../api/comentarios.js";
import { WishList } from "../api/wishlist.js";

class Propuesta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propuesta: this.props.propuesta,
      comentario: "",
      mostrarComentarios: false
    };

    this.handleComment = this.handleComment.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.showComments = this.showComments.bind(this);
    this.changeShowComments = this.changeShowComments.bind(this);
    this.isInWishList = this.isInWishList.bind(this);
    this.addWishList = this.addWishList.bind(this);
    this.deleteWishList = this.deleteWishList.bind(this);
  }

  changeShowComments() {
    console.log("changeShowComments: ");
    console.log("Comentarios propuesta: ");
    console.log(this.props.comentarios);
    console.log(
      "Cambió el estado.mostrarComentarios from: " +
        this.state.mostrarComentarios
    );
    this.setState({ mostrarComentarios: !this.state.mostrarComentarios });
  }

  showComments() {
    console.log("Llgeue a showComments");
    console.log("mostrar wish list: ");
    console.log(this.props.wishlist);
    let comentarios = [];
    this.props.comentarios.forEach(comentario => {
      if (Number(comentario.upper) === this.props.propuesta.id) {
        comentarios.push(
          <div className="comentario" key={comentario._id}>
            <Comentario
              comentario={{
                nombreUsuario: comentario.nombreUsuario,
                texto: comentario.texto
              }}
            />
          </div>
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

  isInWishList() {
    if (this.props.wishlist) {
      console.log("Is in wish list: ");
      console.log(this.props.propuesta.id);

      let wishlistId = "";
      let existIndex =
        this.props.wishlist.findIndex(item => {
          if (Number(item.propuesta) === this.props.propuesta.id) {
            wishlistId = item._id;
            return true;
          } else {
            return false;
          }
        }) >= 0;
      return { existIndex, wishlistId };
    } else {
      return { existIndex: false, wishlistId: -1 };
    }
  }

  addWishList() {
    console.log("addWishList: ");
    console.log(this.props.propuesta.id);
    console.log(this.props.currentUser);
    Meteor.call("wishlist.create", this.props.propuesta.id + "");
  }

  deleteWishList() {
    console.log("deleteWishList: ");
    Meteor.call("wishlist.delete", this.isInWishList().wishlistId);
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
            <h3 className="titulo-propuesta"> {this.state.propuesta.titulo}</h3>
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
              onClick={
                this.isInWishList().existIndex
                  ? this.deleteWishList
                  : this.addWishList
              }
            >
              {this.isInWishList().existIndex ? (
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
            <textarea
              className="areaComment"
              rows="1"
              cols="60"
              placeholder="Escribe un comentario"
              onChange={this.handleComment}
              onKeyPress={this.onKeyPress}
              value={this.state.comentario}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              onClick={this.changeShowComments}
              className="buttonShowComments"
            >
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
  comentarios: PropTypes.arrayOf(PropTypes.object),
  wishlist: PropTypes.arrayOf(PropTypes.object)
};

const PropuestaWrapper = withTracker(({ propuesta, currentUser }) => {
  console.log("Propuesta Tracker propuesta: ");
  console.log(propuesta);

  Meteor.subscribe("comentarios", propuesta.id + "");
  if (currentUser) {
    Meteor.subscribe("wishlistPropuesta", currentUser._id, propuesta.id + "");
    return {
      comentarios: Comentarios.find({}).fetch(),
      wishlist: WishList.find({}).fetch()
    };
  } else {
    return { comentarios: Comentarios.find({}).fetch() };
  }
})(Propuesta);

export default PropuestaWrapper;
