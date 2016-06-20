var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Pago = require("./pagoCollection");
var schema = mongoose.Schema({
    nombre: String,
    activo: Boolean,
    _pagos: [Pago]
});

module.exports = mongoose.model('Cliente', schema);
