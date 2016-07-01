var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clienteCollection = mongoose.Schema({
  nombre: String,
  activo: Boolean,
  _pagos: [{
     type: Schema.Types.ObjectId,
     ref: 'Pago'
  }]
});

module.exports = mongoose.model('Cliente', clienteCollection);
