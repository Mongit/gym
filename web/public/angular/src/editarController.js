(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'proxy' ];
    depArr.push(function($route, $location, proxy ) {
        var ctrl = this;
        ctrl.nombre = "";
        ctrl.tipoPago = "";
        ctrl.fechaInicio = "";
        ctrl.fechaFin = "";

        ctrl.clienteId= $route.id;

        var getOne = function(id) {
            proxy.getOne(id, function(data, status, headers, config){
                ctrl.nombre = data.nombre
            });
        };
        getOne(ctrl.clienteId);

        ctrl.editar = function(){
            proxy.update(ctrl.clienteId, ctrl, function(data, status, headers, config){
                alert("Pago registrado");
                $location.path('/');
            });
        };
    });
    app.controller('EditarController', depArr);
})();
