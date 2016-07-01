var intravenous = require("intravenous");

//local modules
var Cliente = require("./clienteCollection");
var Pago = require("./pagoCollection");
var Usuario = require("./usuarioCollection");

var models = {
    cliente: Cliente,
    pago: Pago,
    usuario: Usuario,
};

var Error = require("./errManagger");
var ClientesApi = require("./clientesApi");
var PagosApi = require("./pagosApi");
var UsuariosApi = require("./usuariosApi");
ClientesApi.$inject = ["models", "pagoFactory", "clienteFactory", "err"];
PagosApi.$inject = ["models", "pagoFactory", "clienteFactory", "err"];
UsuariosApi.$inject = ["models", "usuarioFactory", "moment", "jwt"];

var ClientesController = require("./clientesController");
var PagosController = require("./pagosController");
var UsuariosController = require("./usuariosController");
ClientesController.$inject = ["express", "clientesApi"];
PagosController.$inject = ["express", "pagosApi"];
UsuariosController.$inject = ["express", "usuariosApi"];

var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var container = intravenous.create();

//register
container.register("models", models);
container.register("cliente", Cliente);
container.register("pago", Pago);
container.register("usuario", Usuario);
container.register("err", Error);
container.register("clientesApi", ClientesApi);
container.register("pagosApi", PagosApi);
container.register("usuariosApi", UsuariosApi);
container.register("clientesController", ClientesController);
container.register("pagosController", PagosController);
container.register("usuariossController", UsuariosController);
container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("jwt", { module: require('jwt-simple') });
container.register("moment", { module: require('moment') });

container.register("dbConnection", DbConnection);

module.exports = container;
