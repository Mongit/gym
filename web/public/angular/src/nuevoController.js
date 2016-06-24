(function() {
    var app = angular.module('app');

    app.controller('nuevoController', ['$location', 'proxy', 'fechaManagger', function($location, proxy, fechaManagger) {
        var ctrl = this;
        var fm = fechaManagger();
        ctrl.tipoPago;
        //en millisec
        ctrl.sugerenciaInicio = Date.now(); //millisec.
        ctrl.sugerenciaFin;

        var inicioModificada;
        var finModificada;

        ctrl.getStringDateForDisplayFromMilliSec = function(dateMill){
            var str = fm.getDateStringForDisplayInInput(dateMill);
            return str;
        };


        ctrl.getFechaFinBasadoEntipoPagoYfechaInicio = function(){
          var that = this;
          var sugerenciaInicioSting = that.getStringDateForDisplayFromMilliSec(ctrl.sugerenciaInicio);
          ctrl.sugerenciaFin = fm.getFechaFin(sugerenciaInicioSting, ctrl.tipoPago);//fechaInicio es string. sugerenciafin retornara milisec.
            ctrl.fechaFin = ctrl.sugerenciaFin;
        };
var este = this;
        //Server Call
        ctrl.save = function() {
            //ctrl.fechaInicio = inicioModificada || ctrl.getStringDateForDisplayFromMilliSec(ctrl.sugerenciaInicio);
            //ctrl.fechaFin = finModificada || ctrl.getStringDateForDisplayFromMilliSec(ctrl.sugerenciaFin);
            ctrl.fechaInicio = ctrl.getStringDateForDisplayFromMilliSec(inicioModificada) || ctrl.getStringDateForDisplayFromMilliSec(ctrl.sugerenciaInicio);
            
          ctrl.sugerenciaFin = fm.getFechaFin(este.getStringDateForDisplayFromMilliSec(inicioModificada), ctrl.tipoPago);
            //ctrl.fechaFin = ctrl.getFechaFinBasadoEntipoPagoYfechaInicio();
            ctrl.fechaFin = ctrl.sugerenciaFin || ctrl.getStringDateForDisplayFromMilliSec(ctrl.fechaFin);
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
                inicioModificada = $(this).val();//facha inicio es un string  "2016-06-16"
            });
            $( "#fechaFin" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"
            });
            $( "#fechaFin" ).change(function(){
                finModificada = $(this).val();
            });
          });

    }]);

})();
