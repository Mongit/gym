(function() {
    var app = angular.module('app');

    app.factory('pagosProxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('pagos/api/');
        return proxy;
    }]);
})();
