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
