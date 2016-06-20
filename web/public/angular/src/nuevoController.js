(function() {
    var app = angular.module('app');

    app.controller('nuevoController', ['$location', 'proxy', function($location, proxy) {

        var ctrl = this;

        //Datepicker
        $(function() {
            $( "#fechaInicio" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"//dateFormat: "mm-dd-yy"
            });
            $( "#fechaFin" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"//dateFormat: "mm-dd-yy"
            });
          });
        
        //Server Call
        ctrl.save = function() {
            console.log("se guardo exitosamente");
            console.dir(ctrl);
            /*proxy.save(ctrl, ctrl, function(data, status, headers, config){
                alert("Cliente guardado exitosamente. Gracias.");
                $location.path('/');
            });
            */
        };
        
        
    }]);

})();
