(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$location', 'proxy', 'fechaManagger', function($location, proxy, fechaManagger) {
        var ctrl = this;
        var fm = fechaManagger();
        ctrl.now = moment();
        ctrl.clientes = [];

        ctrl.getDiasParaVencimiento = function(vencimiento){
          return fm.getDiasParaVencimiento(vencimiento);
        };
        ctrl.getDateInHumanReadable = function(str){
          return fm.getDateInHumanReadable(str);
        };

        ctrl.getColor = function(fvencimiento){
            if(fvencimiento < 0)
                return "#C9302C";
            else if(fvencimiento > 3)
                return "#449D44";
            else if(fvencimiento >= 0 && fvencimiento < 4)
                return "#EC971F";
        };

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
