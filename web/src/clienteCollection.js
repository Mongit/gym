var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pagoSchema = require("./pagoSchema.js");

var clienteSchema = mongoose.Schema({
  nombre: String,
  activo: Boolean,
  ultimosPagos: [pagoSchema]
});

module.exports = mongoose.model('Cliente', clienteSchema);
