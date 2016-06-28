(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'pagosProxy', 'proxy', 'fechaManagger' ];
    depArr.push(function($route, $location, proxy, clientesProxy, fechaManagger ) {
        var ctrl = this;
        ctrl.nombre = "";
        ctrl.tipoPago = "";
        ctrl.fechaInicio = "";
        var fm = fechaManagger();
        ctrl.clienteId= $route.id;

        var getOne = function(id) {
                clientesProxy.getOneWithLastPay(id, function(data, status, headers, config){
                ctrl.nombre = data.nombre;
                var millisec = fm.aumentarUnDosDias(data._pagos[0].fechaFin);//el 00 del string resta un dia.
                ctrl.fechaInicio = fm.getDateStringForDisplayInInput(millisec);//nuevo pago inicia en la fecha de vencimiento anterior.
                ctrl.tipoPago = data._pagos[0].tipoPago;
                var fechaFinMillisec = fm.getFechaFin(ctrl.fechaInicio, ctrl.tipoPago);
                ctrl.fechaFin = fm.getDateStringForDisplayInInput(fechaFinMillisec);
            });
        };

        getOne(ctrl.clienteId);

        ctrl.pagar = function(){
            proxy.saveWithId(ctrl.clienteId, ctrl, function(data, status, headers, config){
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
    app.controller("PagarController", depArr);
})();
