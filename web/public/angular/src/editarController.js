(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'proxy', 'fechaManagger' ];
    depArr.push(function($route, $location, proxy, fechaManagger ) {
        var ctrl = this;
        ctrl.nombre = "";
        ctrl.tipoPago = "";
        ctrl.fechaInicio = "";
        var fm = fechaManagger();
        ctrl.clienteId= $route.id;

        var getOne = function(id) {
            proxy.getOne(id, function(data, status, headers, config){
                ctrl.nombre = data.nombre;
                var index = data.ultimosPagos.length - 1;
                var ultimoPago = data.ultimosPagos[index];
                var millisec = fm.aumentarUnDosDias(ultimoPago.fechaFin);//el 00 del string resta un dia.
                ctrl.fechaInicio = fm.getDateStringForDisplayInInput(millisec);//nuevo pago inicia en la fecha de vencimiento anterior.
                ctrl.tipoPago = ultimoPago.tipoPago;
                var fechaFinMillisec = fm.getFechaFin(ctrl.fechaInicio, ctrl.tipoPago);
                ctrl.fechaFin = fm.getDateStringForDisplayInInput(fechaFinMillisec);

            });
        };
        getOne(ctrl.clienteId);


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
