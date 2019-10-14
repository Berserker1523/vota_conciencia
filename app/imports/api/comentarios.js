import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Comentarios = new Mongo.Collection("comentarios");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("comentarios", () => {
    return Comentarios.find({});
  });
}

Meteor.methods({
  "comentarios.create"(upperObjectId, texto) {
    check(upperObjectId, String);
    check(texto, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "El usuario debe iniciar sesion para poder comentar"
      );
    }

    Comentarios.insert({
      upper: upperObjectId,
      usuario: this.userId,
      nombreUsuario: Meteor.users.findOne(this.userId).username,
      texto
    });
  },

  "comentarios.update"(comentarioId, texto) {
    check(comentarioId, String);
    check(texto, String);

    const comentario = Comentarios.findOne(comentarioId);
    if (comentario.usuario !== this.userId) {
      throw new Meteor.Error("El comentario no pertenece a este usuario");
    }

    Comentarios.updateOne(comentarioId, {
      $set: {
        texto: texto
      }
    });
  },

  "comentarios.delete"(comentarioId) {
    check(comentarioId, String);

    const comentario = Comentarios.findOne(comentarioId);
    if (comentario.usuario !== this.userId) {
      throw new Meteor.Error("El comentario no pertenece a este usuario");
    }

    Comentarios.remove(comentarioId);
  }
});
