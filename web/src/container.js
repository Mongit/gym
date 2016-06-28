var intravenous = require("intravenous");

//local modules
var Cliente = require("./clienteCollection");
var Pago = require("./pagoCollection");

var models = {
    cliente: Cliente,
    pago: Pago
};
var Error = require("./errManagger");
var ClientesApi = require("./clientesApi");
var PagosApi = require("./pagosApi");
ClientesApi.$inject = ["models", "pagoFactory", "clienteFactory", "err"];
PagosApi.$inject = ["models", "pagoFactory", "clienteFactory", "err"];

var ClientesController = require("./clientesController");
ClientesController.$inject = ["express", "clientesApi"];

var PagosController = require("./pagosController");
PagosController.$inject = ["express", "pagosApi"];


var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var container = intravenous.create();

//register
container.register("models", models);
container.register("cliente", Cliente);
container.register("pago", Pago);
container.register("err", Error);
container.register("clientesApi", ClientesApi);
container.register("pagosApi", PagosApi);
container.register("clientesController", ClientesController);
container.register("pagosController", PagosController);
container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("dbConnection", DbConnection);

module.exports = container;
