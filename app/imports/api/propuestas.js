import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Propuestas = new Mongo.Collection("propuestas");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("propuestas", () => {
    return Propuestas.find({});
  });
}

Meteor.methods({
  "propuestas.create"(candidatoId, titulo, categoria, descripcion) {
    check(candidatoId, String);
    check(titulo, String);
    check(categoria, String);
    check(descripcion, String);

    Propuestas.insert({
      candidato: candidatoId,
      titulo,
      categoria,
      descripcion,
      me_gusta: 0,
      no_me_gusta: 0
    });
  },

  "propuestas.update"(
    propuestaId,
    titulo,
    categoria,
    descripcion,
    me_gusta,
    no_me_gusta
  ) {
    check(propuestaId, String);
    check(titulo, String);
    check(categoria, String);
    check(descripcion, String);
    check(me_gusta, Number);
    check(no_me_gusta, Number);

    Propuestas.updateOne(propuestaId, {
      $set: {
        titulo: titulo,
        categoria: categoria,
        descripcion: descripcion,
        me_gusta: me_gusta,
        no_me_gusta: no_me_gusta
      }
    });
  },

  "propuestas.delete"(propuestaId) {
    check(propuestaId, String);
    Propuestas.remove(propuestaId);
  }
});
