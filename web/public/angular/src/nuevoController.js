(function() {
    var app = angular.module('app');

    app.controller('nuevoController', ['$location', 'proxy', 'fechaManagger', function($location, proxy, fechaManagger) {
        var ctrl = this;
        var fm = fechaManagger();
        ctrl.tipoPago;
        ctrl.fechaInicio = "";
        ctrl.fechaFin = "";
        ctrl.fechaInicioCambiada;
        ctrl.fechaFinCambiada;

        ctrl.getStringDateForDisplayFromMilliSec = function(dateMill){
            var str = fm.getDateStringForDisplayInInput(dateMill);
            return str;
        };


        ctrl.getFechaFinBasadoEntipoPagoYfechaInicio = function(){
          var that = this;
          var sugerenciaInicioSting = that.getStringDateForDisplayFromMilliSec(Date.now());
          var fechaFinMillisec = fm.getFechaFin(sugerenciaInicioSting, ctrl.tipoPago);//fechaInicio es string. sugerenciafin retornara milisec.
          ctrl.fechaInicio = fm.getDateStringForDisplayInInput(Date.now());
          ctrl.fechaFin = fm.getDateStringForDisplayInInput(fechaFinMillisec);
        };

        //Server Call
        ctrl.save = function() {
            ctrl.fechaInicio = ctrl.fechaInicioCambiada || ctrl.fechaInicio;
            ctrl.fechaFin = ctrl.fechaFinCambiada || ctrl.fechaFin;
            proxy.save(ctrl, function(data, status, headers, config){
                $location.path('/');
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
                ctrl.fechaInicioCambiada = $(this).val();//facha inicio es un string  "2016-06-16"
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
