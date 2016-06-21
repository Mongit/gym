(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$location', 'proxy', function($location, proxy) {
        var ctrl = this;
        ctrl.fechaDeVencimiento = [];
        
        ctrl.getAll = function(){
            proxy.getAll(function(data){
                ctrl.clientes=data;
                //console.dir(data[0].ultimosPagos);
                for(var i = 0; i < data.length; i++ ) {
                    var index = data[i].ultimosPagos.length - 1;
                    ctrl.fechaDeVencimiento[i] = data[i].ultimosPagos[index].fechaFin;
                }
                    console.dir(ctrl.fechaDeVencimiento);
                //var ultimoPago = data.ultimosPagos.length - 1;
                //ctrl.fechaDeVencimiento = data.ultimosPagos[ultimoPago];
            });
        };
        ctrl.getAll();
       
        ctrl.delete = function (id) {
            proxy.delete(id,function(){
               $location.path('/');
            });
        };
       
    }]);
})();