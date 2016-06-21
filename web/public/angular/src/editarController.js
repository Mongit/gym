(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'proxyFactory' ];
    depArr.push(function($route, $location, proxyFactory ) {
        var ctrl = this;

        ctrl.clienteId= $route.id;

        var getOne = function(id) {
            proxyFactory.getOne(id, function(data, status, headers, config){
                ctrl.nombre = data.nombre;
                ctrl.activo = data.activo,
                ctrl.ultimoPago = data.ultimosPagos: [pagoSchema]
            });
        };
        getOne(ctrl.clienteId);

        ctrl.quitarLogo = function() {
            ctrl.logotipo = undefined;
        };
        ctrl.quitarFoto = function() {
            ctrl.foto = undefined;
        };

        ctrl.borrarMarker = function () {
            ctrl.mapa.borrarMarker();
        };

        ctrl.agregarProducto = function() {
            ctrl.producto = prod.agregarProducto(ctrl.productos, ctrl.producto);
        };
        ctrl.removerProducto = function() {
            ctrl.productos = prod.removerProducto(ctrl.productos, ctrl.remover);
        };
        ctrl.borrarProductos = function() {
            ctrl.productos = prod.borrarProductos(ctrl.productos);
        };


        ctrl.agregarLink = function() {
            ctrl.link = linkObj.agregarLink(ctrl.links, ctrl.link);
        };
        ctrl.removerLink = function() {
            ctrl.links = linkObj.removerLink(ctrl.links, ctrl.numLinkARemover);
        };
        ctrl.borrarLinks = function() {
            ctrl.links = linkObj.borrarLinks(ctrl.links);
        };

        ctrl.editar = function(){
            ctrl.lat = ctrl.mapa.getLat();
            ctrl.long = ctrl.mapa.getLong();
            paginasProxy.update(ctrl.empresaId, modelInstance.getModelFromCtrl(ctrl), function(data, status, headers, config){
                alert("Info enviada");
                $location.path('/privado/todos');
            });

        };
    });
    app.controller('EditarFormularioController', depArr);
})();
