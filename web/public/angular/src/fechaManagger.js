(function() {
    var app = angular.module('app');

    app.factory('fechaManagger', [ function() {

        var FechaManagger = function() {
        };
        FechaManagger.prototype.aumentarUnDia = function(str){
          var fechaEnMillisec = Date.parse(str);//convierte a millisec.
          var dia = 1000 * 60 * 60 * 24 * 1;
          var result = fechaEnMillisec + dia;
          return result;
        };
        FechaManagger.prototype.aumentarUnDosDias = function(str){
          var fechaEnMillisec = Date.parse(str);//convierte a millisec.
          var dia = 1000 * 60 * 60 * 24 * 2;
          var result = fechaEnMillisec + dia;
          return result;
        };
        FechaManagger.prototype.aumentarSieteDias = function(str){
          var fechaEnMillisec = Date.parse(str);//convierte a millisec.
          var dia = 1000 * 60 * 60 * 24 * 7;
          var result = fechaEnMillisec + dia;
          return result; //en millisec.
        };

        FechaManagger.prototype.getDateStringForDisplayInInput = function(millisecOrString){
          var date = new Date(millisecOrString);
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

        FechaManagger.prototype.getFechaFin = function(fechaInicio, tipoPago) {
          var that = this;
          var fechaFin;
          var week = 1000 * 60 * 60 * 24 * 7;
          var twoWeeks = 1000 * 60 * 60 * 24 * 14;
          var oneMonth = 1000 * 60 * 60 * 24 * 30;
          var fechaInicioEnMillisec = Date.parse(fechaInicio);//convierte a millisec.

          if(tipoPago === "semanal"){
            fechaFin = fechaInicioEnMillisec + week;
            return fechaFin;//retorna milllisec
          };

          if(tipoPago === "quincenal"){
            fechaFin = fechaInicioEnMillisec + twoWeeks;
            return fechaFin;
          };

          if(tipoPago === "mensual"){
            fechaFin = fechaInicioEnMillisec + oneMonth;
            return fechaFin;
          }
          return;
        };

        return function() {
            return new FechaManagger();
        };
    }]);
})();
