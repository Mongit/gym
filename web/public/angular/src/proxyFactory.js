(function() {
    var app = angular.module('app');

    app.factory('proxyFactory', ['$http', '$log', function($http, $log) {

        var Proxy = function(url) {
            this.url = url;
        };

        Proxy.prototype.error = function(data, status, headers, config){
            $log.error('%s %s %s', config.method, config.url, status);
        };

        Proxy.prototype.getAll = function(success) {
            var that = this;
            $http({
                method: 'GET',
                url: that.url
            }).success(success).error(that.error);
        };
        Proxy.prototype.getAllFromUser = function(userId, success) {
            var that = this;
            $http({
                method: 'GET',
                url: that.url + "clientesDeUsuario/" + userId,
            }).success(success).error(that.error);
        };

        Proxy.prototype.getOne = function(id, success) {
         var that = this;
         $http({
             method: "GET",
             url: that.url + id
         }).success(success).error(that.error);
        };

        Proxy.prototype.getOneWithLastPay = function(id, success) {
         var that = this;
         $http({
             method: "GET",
             url: that.url + "lastpay/" + id
         }).success(success).error(that.error);
        };

        Proxy.prototype.save = function(model, success) {
            var that = this;
            $http({
                method: 'POST',
                url: that.url,
                data: model
            }).success(success).error(that.error);
        };

        Proxy.prototype.saveWithId = function(id, model, success) {
            var that = this;
            $http({
                method: 'POST',
                url: that.url + id,
                data: model
            }).success(success).error(that.error);
        };

        Proxy.prototype.update = function(id, model, success) {
           var that = this;
           $http({
               method: 'PUT',
               url: that.url + id,
               data: model
           }).success(success).error(that.error);
         };

        Proxy.prototype.delete = function(id, success) {
            var that = this;
            $http({
                method: "DELETE",
                url: that.url + id
            }).success(success).error(that.error);
        };

        return function(url) {
            return new Proxy(url);
        };
    }]);
})();
