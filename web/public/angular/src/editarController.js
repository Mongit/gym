(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'proxy' ];
    depArr.push(function($route, $location, proxy ) {
        var ctrl = this;
        ctrl.nombre = "";
        ctrl.tipoPago = "";
        ctrl.fechaInicio = "";
        ctrl.fechaFin = "";

        ctrl.clienteId= $route.id;

        var getOne = function(id) {
            proxy.getOne(id, function(data, status, headers, config){
                ctrl.nombre = data.nombre;
                var index = data.ultimosPagos.length - 1;
                var ultimoPago = data.ultimosPagos[index];
                ctrl.fechaInicio = ultimoPago.fechaFin;//nuevo pago inicia en la fecha de vencimiento anterior.
                ctrl.tipoPago = ultimoPago.tipoPago;
            });
        };
        getOne(ctrl.clienteId);

        ctrl.getDateInHumanReadable = function(millisec){
          var date = new Date(millisec);
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
            var result = Date.parse(ctrl.fechaInicio) + week;
            ctrl.fechaFin = ctrl.getDateInHumanReadable(result);
          };
          if(ctrl.tipoPago === "quincenal"){
            var result = Date.parse(ctrl.fechaInicio) + twoWeeks;
            ctrl.fechaFin = ctrl.getDateInHumanReadable(result);
          };
          if(ctrl.tipoPago === "mensual"){
            var result = Date.parse(ctrl.fechaInicio) + oneMonth;
            ctrl.fechaFin = ctrl.getDateInHumanReadable(result);
          }else{
            return;
          }
          return;
        };
        ctrl.getFechaFin();

        ctrl.editar = function(){
            proxy.update(ctrl.clienteId, ctrl, function(data, status, headers, config){
                alert("Pago registrado");
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

    });
    app.controller('EditarController', depArr);
})();
