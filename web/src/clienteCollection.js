var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clienteCollection = mongoose.Schema({
  nombre: String,
  activo: Boolean,
  _userId: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' },
  _pagos: [{
     type: Schema.Types.ObjectId,
     ref: 'Pago'
  }]
});

module.exports = mongoose.model('Cliente', clienteCollection);
