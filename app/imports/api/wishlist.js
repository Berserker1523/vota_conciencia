import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const WishList = new Mongo.Collection("wishlist");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("wishlist", usuario => {
    return WishList.find({ usuario: usuario });
  });
}

Meteor.methods({
  "wishlist.create"(usuario, propuesta) {
    check(usuario, String);
    check(propuesta, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "El usuario debe iniciar sesion para poder agregar a su lista de deseos."
      );
    }

    WishList.insert({
      usuario,
      propuesta
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
