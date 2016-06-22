(function() {
    var app = angular.module('app');

    app.controller('nuevoController', ['$location', 'proxy', function($location, proxy) {

        var ctrl = this;


        //Server Call
        ctrl.save = function() {
            proxy.save(ctrl, function(data, status, headers, config){
                alert("Cliente guardado exitosamente. Gracias.");
                $location.path('/');
            });
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
        ctrl.getFechaFin = function() {
          var week = 1000 * 60 * 60 * 24 * 6;
          var twoWeeks = 1000 * 60 * 60 * 24 * 14;
          var oneMonth = 1000 * 60 * 60 * 24 * 29;
          if(ctrl.tipoPago === "semanal"){
            ctrl.fechaInicio = Date.now();
            var result = ctrl.fechaInicio + week;
            ctrl.fechaFin = ctrl.getDateInHumanReadable(result);
            ctrl.fechaInicio = ctrl.getDateInHumanReadable(ctrl.fechaInicio);
          };
          if(ctrl.tipoPago === "quincenal"){
            ctrl.fechaInicio = Date.now();
            var result = ctrl.fechaInicio + twoWeeks;
            ctrl.fechaFin = ctrl.getDateInHumanReadable(result);
            ctrl.fechaInicio = ctrl.getDateInHumanReadable(ctrl.fechaInicio);
          };
          if(ctrl.tipoPago === "mensual"){
            ctrl.fechaInicio = Date.now();
            var result = ctrl.fechaInicio + oneMonth;
            ctrl.fechaFin = ctrl.getDateInHumanReadable(result);
            ctrl.fechaInicio = ctrl.getDateInHumanReadable(ctrl.fechaInicio);
          }else{
            return;
          }
          return;
        };
      /*
        var endDate = new Date(date || Date.now());
        var days = 6;
        endDate.setDate(endDate.getDate() + days);
        */
        //Datepicker
        $(function() {
            $( "#fechaInicio" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"//dateFormat: "mm-dd-yy"
            });
            $( "#fechaInicio" ).change(function(){
                ctrl.fechaInicio = $(this).val();
            });
            $( "#fechaFin" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"//dateFormat: "mm-dd-yy"
            });
            $( "#fechaFin" ).change(function(){

                ctrl.fechaFin = $(this).val();
            });
          });

    }]);

})();