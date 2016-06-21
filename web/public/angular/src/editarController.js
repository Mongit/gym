(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'proxyFactory' ];
    depArr.push(function($route, $location, proxyFactory ) {
        var ctrl = this;
        ctrl.nombre = "";
        ctrl.tipoPago = "";
        ctrl.fechaInicio = "";
        ctrl.fechaFin = "";

        ctrl.clienteId= $route.id;

        var getOne = function(id) {
            proxyFactory.getOne(id, function(data, status, headers, config){
                ctrl.nombre = data.nombre,
            });
        };

        getOne(ctrl.clienteId);


        ctrl.editar = function(){
            proxyFactory.update(ctrl.clienteId, ctrl, function(data, status, headers, config){
                alert("Pago registrado");
                $location.path('/');
            });

        };
    });
    app.controller('EditarController', depArr);
})();
