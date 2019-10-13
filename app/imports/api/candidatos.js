import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Candidatos = new Mongo.Collection("candidatos");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("candidatos", () => {
    return Candidatos.find({});
  });
}

Meteor.methods({
  "candidatos.create"(
    nombre,
    cargo_aspirante,
    partido,
    fecha_nacimiento,
    foto_url,
    redes_sociales
  ) {
    check(nombre, String);
    check(cargo_aspirante, String);
    check(partido, String);
    check(fecha_nacimiento, String);
    check(foto_url, String);
    check(redes_sociales, Object);

    Candidatos.insert({
      nombre,
      cargo_aspirante,
      partido,
      fecha_nacimiento,
      foto_url,
      redes_sociales
    });
  },

  "candidatos.update"(
    candidatoId,
    nombre,
    cargo_aspirante,
    partido,
    fecha_nacimiento,
    foto_url,
    redes_sociales
  ) {
    check(candidatoId, String);
    check(nombre, String);
    check(cargo_aspirante, String);
    check(partido, String);
    check(fecha_nacimiento, String);
    check(foto_url, String);
    check(redes_sociales, Object);

    Candidatos.updateOne(candidatoId, {
      $set: {
        nombre: nombre,
        cargo_aspirante: cargo_aspirante,
        partido: partido,
        fecha_nacimiento: fecha_nacimiento,
        foto_url: foto_url,
        redes_sociales: redes_sociales
      }
    });
  },

  "candidatos.delete"(candidatoId) {
    check(candidatoId, String);
    Candidatos.remove(candidatoId);
  }
});
