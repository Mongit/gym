(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$location', 'proxy', function($location, proxy) {
        var ctrl = this;
        
        ctrl.getAll = function(){
            proxy.getAll(function(data){
                ctrl.clientes=data;
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