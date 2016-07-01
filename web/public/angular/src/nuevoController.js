(function() {
    var app = angular.module('app');

    app.controller('nuevoController', ['$location', 'proxy', 'fechaManagger','$scope','tokenStorage', function($location, proxy, fechaManagger, scope, tokenStorage) {
        var ctrl = this;
        var fm = fechaManagger();
        ctrl._userId = tokenStorage.getId();
        ctrl.tipoPago;
        ctrl.fechaInicio = "";
        ctrl.fechaFin = "";
        ctrl.fechaInicioCambiada;
        ctrl.fechaFinCambiada;
        ctrl.fechaPropuesta;

        ctrl.getFechaFinBasadoEntipoPagoYfechaInicio = function(){
          var today = moment();
          var fechaFin = fm.getFechaFin(today, ctrl.tipoPago);
          ctrl.fechaInicio = today.format("YYYY-MM-DD");
          ctrl.fechaFin = fechaFin.format("YYYY-MM-DD");
        };

        //Server Call
        ctrl.save = function() {
            ctrl.fechaCreacion = moment().format("YYYY-MM-DD");//para que sea un string en el server y se guarde, entonces en el get, se convierta en utc.
            ctrl.fechaInicio = ctrl.fechaInicioCambiada || ctrl.fechaInicio;
            ctrl.fechaFin = ctrl.fechaFinCambiada || ctrl.fechaFin;
            proxy.save(ctrl, function(data, status, headers, config){
                $location.path('/todos');
            });
        };

        //Datepicker
        $(function() {
            $( "#fechaInicio" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"
            });
            $( "#fechaInicio" ).change(function(){
                ctrl.fechaInicioCambiada = $(this).val();
            });
            $( "#fechaFin" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"
            });
            $( "#fechaFin" ).change(function(){
                ctrl.fechaFinCambiada = $(this).val();
            });
          });

    }]);

})();
