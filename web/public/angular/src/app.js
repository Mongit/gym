(function () {
    var app = angular.module('app', ['ngRoute', 'ngMessages']);

    app.config(["$routeProvider", function ($router) {
        $router.when("/", { templateUrl: "angular/views/todos.html" })
        $router.when("/nuevo", { templateUrl: "angular/views/nuevo.html" })
        $router.when("/editar/:id", { templateUrl: "angular/views/pagar.html" })
        .otherwise({ redirectTo: "/" });
    }]);
})();
