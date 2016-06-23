(function() {
    var app = angular.module('app');

    app.controller('nuevoController', ['$location', 'proxy', 'fechaManagger', function($location, proxy, fechaManagger) {
        var ctrl = this;
        var fm = fechaManagger();
        ctrl.tipoPago;
        ctrl.fechaInicio = Date.now(); //millisec.
        ctrl.fechaInicio = fm.getDateStringForDisplayInInput(Date.now());//string for display.
        ctrl.fechaFin;
        var inicioModificada;
        var finModificada;

        ctrl.getFechaFinBasadoEntipoPagoYfechaInicio = function(){
          var fechaFin = fm.getFechaFin(ctrl.fechaInicio, ctrl.tipoPago);//fechaInicio es string. fechaFin retornara milisec.
          ctrl.fechaFin = fm.getDateStringForDisplayInInput(fechaFin);
        };
        
        //Server Call
        ctrl.save = function() {
            ctrl.fechaInicio = inicioModificada || ctrl.fechaInicio;
            ctrl.fechaFin = finModificada || ctrl.fechaFin;
            proxy.save(ctrl, function(data, status, headers, config){
                $location.path('/');
            });
        };

        //Datepicker
        $(function() {
            $( "#fechaInicio" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"//dateFormat: "mm-dd-yy"
            });
            $( "#fechaInicio" ).change(function(){
                inicioModificada = $(this).val();//facha inicio es un string  "2016-06-16"
            });
            $( "#fechaFin" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"//dateFormat: "mm-dd-yy"
            });
            $( "#fechaFin" ).change(function(){
                finModificada = $(this).val();
            });
          });

    }]);

})();
