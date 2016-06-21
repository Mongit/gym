(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$location', 'proxy', function($location, proxy) {
        var ctrl = this;
        
        ctrl.getAll = function(){
            proxy.getAll(function(data){
                ctrl.clientes=data;
                for(var i = 0; i < data.length; i++ ) {
                    var index = data[i].ultimosPagos.length - 1;
                    ctrl.clientes[i].fechaDeVencimiento = data[i].ultimosPagos[index].fechaFin;
                }
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