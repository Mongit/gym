(function() {
    var app = angular.module('app');
    
    app.factory('proxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('http://localhost:3000/clientes/api/');
        return proxy;     
    }]);
})();