var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pagoCollection = Schema({
    tipoPago: String,
    fechaInicio: Date,
    fechaFin: Date,
    fechaCreacion: Date,

});

module.exports = mongoose.model('Pago', pagoCollection)
