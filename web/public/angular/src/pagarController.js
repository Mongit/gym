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
                ctrl.fechaInicio = moment.utc(data._pagos[0].fechaFin).add(1, "d").format("YYYY-MM-DD");
                ctrl.tipoPago = data._pagos[0].tipoPago;
                var fechaFinObj = fm.getFechaFin(moment(ctrl.fechaInicio), ctrl.tipoPago);
                ctrl.fechaFin = fechaFinObj.format("YYYY-MM-DD");
            });
        };

        getOne(ctrl.clienteId);

        ctrl.pagar = function(){
            ctrl.fechaCreacion = moment().format("YYYY-MM-DD");//para que sea un string en el server y se guarde, entonces en el get, se convierta en utc.
            proxy.saveWithId(ctrl.clienteId, ctrl, function(data, status, headers, config){
                alert("Pago registrado");
                $location.path('/todos');
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
