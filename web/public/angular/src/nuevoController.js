(function() {
    var app = angular.module('app');

    app.controller('nuevoController', ['$location', 'proxy', 'fechaManagger','$scope', function($location, proxy, fechaManagger, scope) {
        var ctrl = this;
        var fm = fechaManagger();
        ctrl.tipoPago;
        ctrl.fechaInicio = "";
        ctrl.fechaFin = "";
        ctrl.fechaInicioCambiada;
        ctrl.fechaFinCambiada;
        ctrl.fechaPropuesta;


        ctrl.getFechaFinBasadoEntipoPagoYfechaInicio = function(){
          var that = this;
          var today = moment();
          var fechaFin = fm.getFechaFin(today, ctrl.tipoPago);
          ctrl.fechaInicio = today.format("YYYY-MM-DD");
          ctrl.fechaFin = fechaFin.format("YYYY-MM-DD");
        };

        //Server Call
        ctrl.save = function() {
            ctrl.fechaInicio = ctrl.fechaInicioCambiada || ctrl.fechaInicio;
            ctrl.fechaFin = ctrl.fechaFinCambiada || ctrl.fechaFin;
            proxy.save(ctrl, function(data, status, headers, config){
                $location.path('/');
            });
        };

        ctrl.calcularFechaPropuesta = function(fechaInicio){
          var that = this;
          var str = that.getStringDateForDisplayFromMilliSec(fechaInicio);
          var fechaFinMillisec = fm.getFechaFin(str, ctrl.tipoPago);//fechaInicio es string. sugerenciafin retornara milisec.
          var fechaFin = fm.getDateStringForDisplayInInput(fechaFinMillisec);
          return fechaFin;
        };

        //Datepicker
        $(function() {
            $( "#fechaInicio" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"
            });
            $( "#fechaInicio" ).change(function(){
                ctrl.fechaInicioCambiada = $(this).val();//facha inicio es un string  "2016-06-16"
            //    ctrl.fechaPropuesta = ctrl.calcularFechaPropuesta(ctrl.fechaInicioCambiada);
            //    scope.$apply();
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
