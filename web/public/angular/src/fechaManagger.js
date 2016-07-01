(function() {
    var app = angular.module('app');

    app.factory('fechaManagger', [ function() {

        var FechaManagger = function() {
        };

        FechaManagger.prototype.getDiasParaVencimiento = function(vencimiento){
          var today = moment();
          var venc = moment( vencimiento );
          var days = venc.diff(today, 'days', true);
          days = Math.round( days * 10) / 10
          return days;
        };
        FechaManagger.prototype.getDateInHumanReadable = function(str){
          var result = moment.utc(str).format("YYYY-MM-DD");//utc va adelante de local time, si lo despliego en local(default), será un día atras puesto que utc está a media noche.
          return result;
        };

        FechaManagger.prototype.getFechaFin = function(fechaInicioObj, tipoPago) {
          var that = this;
          var fechaFinObj;
          var fechaInicioClon = moment(fechaInicioObj);//because mutability
          if(tipoPago === "semanal"){
            fechaFinObj = fechaInicioClon.add(1, "w");
            return fechaFinObj;
          };

          if(tipoPago === "quincenal"){
            fechaFinObj = fechaInicioClon.add(2, "w");
            return fechaFinObj;
          };

          if(tipoPago === "mensual"){
            fechaFinObj = fechaInicioClon.add(1, 'months');
            return fechaFinObj;
          }
          return;
        };

        return function() {
            return new FechaManagger();
        };
    }]);
})();
