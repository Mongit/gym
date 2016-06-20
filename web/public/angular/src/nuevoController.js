(function() {
    var app = angular.module('app');

    app.controller('nuevoController', ['$http', '$location', function($http, $location) {

        var ctrl = this;

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
    }]);

})();
