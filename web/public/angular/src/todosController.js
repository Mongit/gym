(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$location', 'proxy', function($location, proxy) {
        var ctrl = this;
            ctrl.getDiasParaVencimiento = function(vencimiento){
          var today = Date.now();
          var venc = Date.parse( vencimiento );
          var result = venc - today;
          var days = parseInt(result / (1000*60*60*24));
          return days;
        };
        ctrl.getDateInHumanReadable = function(vencimiento){
          var date = new Date(vencimiento);
          var curr_date = date.getDate();
          var curr_month = date.getMonth() + 1; //Months are zero based
          var curr_year = date.getFullYear();
          if(curr_date<10){
            curr_date = "0" + curr_date;
          }
          if(curr_month<10){
            curr_month = "0" + curr_month;
          }
          var str = curr_year + "-" + curr_month + "-" + curr_date;
          return str;
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
            //console.dir(data);
                ctrl.clientes=data;
                for(var i = 0; i < data.length; i++ ) {
                    var index = data[i].ultimosPagos.length - 1;
                    ctrl.clientes[i].fechaDeVencimiento = data[i].ultimosPagos[index].fechaFin;
                    var x = Date.parse(new Date(ctrl.clientes[i].fechaDeVencimiento)) + (1000 * 60 * 60 * 24 * 1);//le suma un dia para que quede con la fecha Correcta
                    ctrl.clientes[i].fechaDeVencimiento = new Date(x);
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
