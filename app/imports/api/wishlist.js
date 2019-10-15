import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const WishList = new Mongo.Collection("wishlist");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("wishlistPropuesta", (usuarioId, propuestaId) => {
    check(propuestaId, String);
    check(usuarioId, String);

    return WishList.find({ usuario: usuarioId, propuesta: propuestaId });
  });

  Meteor.publish("wishlist", () => {
    if (!this.userId) {
      throw new Meteor.Error(
        "El usuario debe iniciar sesion para poder ver a su lista de deseos."
      );
    }

    return WishList.find({ usuario: this.userId });
  });
}

Meteor.methods({
  "wishlist.create"(propuestaId) {
    check(propuestaId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "El usuario debe iniciar sesion para poder agregar a su lista de deseos."
      );
    }

    WishList.insert({
      usuario: this.userId,
      propuesta: propuestaId
    });
  },

  "wishlist.delete"(wishlistId) {
    check(wishlistId, String);

    const item = WishList.findOne(wishlistId);
    if (item.usuario !== this.userId) {
      throw new Meteor.Error("El item de la lista no pertenece a este usuario");
    }

    WishList.remove(wishlistId);
  }
});
