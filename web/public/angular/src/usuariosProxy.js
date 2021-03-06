(function() {
    var app = angular.module('app');

    app.factory("usuariosProxy", ["proxyFactory", function(proxyFactory) {
        var UsuariosProxy = function() {
            this.signinProxy = proxyFactory('usuarios/api/signin');
            this.logoutProxy = proxyFactory('usuarios/api/logout');
            this.signupProxy = proxyFactory('usuarios/api/signup');
        };

        UsuariosProxy.prototype.signin = function(model, success){
            this.signinProxy.save(model, success);
        };

        //AccountProxy.prototype.logout = function(){}
        UsuariosProxy.prototype.signup = function(model, success){
            this.signupProxy.save(model, success);
        };

        return new UsuariosProxy();
    }]);
})();
