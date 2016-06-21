(function() {
    var app = angular.module('app');
    
    app.factory('proxy', ['proxyFactory', function(proxyFactory) {
        console.log("PROXY")
        var proxy = proxyFactory('http://localhost:3000/clientes/api/');
        return proxy;     
    }]);
})();