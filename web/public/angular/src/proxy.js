(function() {
    var app = angular.module('app');

    app.factory('proxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('clientes/api/');
        return proxy;
    }]);
})();
