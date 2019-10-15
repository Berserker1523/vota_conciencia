import { Meteor } from "meteor/meteor";
import "../imports/api/candidatos.js";
import "../imports/api/propuestas.js";
import "../imports/api/reacciones.js";
import "../imports/api/comentarios.js";
import "../imports/api/usuarios.js";
import "../imports/api/wishlist.js";

import "../imports/api/tasks.js";
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {WebApp.addHtmlAttributeHook(() => ({ lang: 'es' }));});
