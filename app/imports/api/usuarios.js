import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  "usuarios.setAnonimo"(setAnonimo) {
    check(setAnonimo, Boolean);
    Meteor.users.update(
      { _id: Meteor.user()._id },
      { $set: { anonimo: setAnonimo } }
    );
  }
});
