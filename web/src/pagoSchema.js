var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pagoSchema = Schema({
    tipoPago: String,
    fechaInicio: Date,
    fechaFin: Date,
    fechaCreacion: Date
});

module.exports = pagoSchema;
