(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$location', 'proxy', function($location, proxy) {
        var ctrl = this;
        ctrl.getDiasParaVencimiento = function(vencimiento){
          var today = Date.now();
          var venc = Date.parse( vencimiento );
          var result = venc - today;
          var days = (result / (1000*60*60*24));
          return days;
        };
        ctrl.getDateInHumanReadable = function(vencimiento){
          var date = new Date(vencimiento);
          var curr_date = date.getDate();
          var curr_month = date.getMonth() + 1; //Months are zero based
          var curr_year = date.getFullYear();
          var str = curr_date + "-" + curr_month + "-" + curr_year;
          return str;
        };


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
