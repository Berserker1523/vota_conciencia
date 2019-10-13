import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Reacciones = new Mongo.Collection("reacciones");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("reacciones", upperObjectId => {
    return Reacciones.find({ upper: upperObjectId });
  });
}

Meteor.methods({
  "reacciones.create"(upperObjectId, tipo) {
    check(upperObjectId, String);
    check(tipo, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "El usuario debe iniciar sesion para poder reaccionar"
      );
    }

    Reacciones.insert({
      upper: upperObjectId,
      usuario: this.userId,
      nombreUsuario: Meteor.users.findOne(this.userId).username,
      tipo
    });
  },

  "reacciones.delete"(reaccionId) {
    check(reaccionId, String);

    const reaccion = Reacciones.findOne(reaccionId);
    if (reaccion.usuario !== this.userId) {
      throw new Meteor.Error("La reaccion no pertenece a este usuario");
    }

    Reacciones.remove(reaccionId);
  }
});
