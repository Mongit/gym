var ClientesApi = (function() {
    var ClientesApi = function(models, pagoFactory, clienteFactory, err) {
        this.models = models;
        this.clienteFactory = clienteFactory;
        this.pagoFactory = pagoFactory;
        this.err = err;
    };
//curl http://localhost:3000/clientes/api/
     ClientesApi.prototype.getAll = function(req, res, next) {
         var that = this;
         that.models.cliente.find().populate({
           path: '_pagos',
           options: { limit: 1, sort: '-fechaFin' }
         })
        .exec(function (err, clientes) {
            if (err) return next(err);
            console.log(clientes);
            return res.json(clientes);
          });
        };
        //curl http://localhost:3000/clientes/api/clientesDeUsuario/465456
       ClientesApi.prototype.clientesDeUsuario = function(req, res, next) {
           var that = this;
           that.models.cliente.find({'_userId': req.params.userId }).populate({
             path: '_pagos',
             options: { limit: 1, sort: '-fechaFin' }
           })
          .exec(function (err, clientes) {
              if (err) return next(err);
              console.log(clientes);
              return res.json(clientes);
            });
          };
//guarda un cliente y su primer pago.
//curl -i -H "Content-Type: application/json" -d '{ "nombre": "jonas", "tipoPago": "semanal", "activo": true, "fechaInicio":"2016,05,10", "fechaFin":"2016,06,20" }' http://localhost:3000/clientes/api/
    ClientesApi.prototype.save = function(req, res, next){
        var that = this;
        var pago = that.pagoFactory.get();
        pago.tipoPago = req.body.tipoPago;
        pago.fechaInicio = req.body.fechaInicio;
        pago.fechaFin = req.body.fechaFin;
        pago.fechaCreacion = req.body.fechaCreacion;
        pago.save(function(err,pago){
          if (err) return next(err);
          var cliente = that.clienteFactory.get();
          cliente.nombre = req.body.nombre;
          cliente.activo = req.body.activo;
          cliente._userId = req.body._userId;
          cliente._pagos.push(pago._id)
          cliente.save(function (err, cliente) {
            if (err) return next(err);
                console.log(cliente);
                res.json(cliente);
          });
        });
      };
//curl http://localhost:3000/clientes/api/57729670ec96e0850c5ca88d
    ClientesApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.cliente.findById(req.params.id, function (err, cliente) {
            if(err) return next(err);
            res.json(cliente);
        });
    };
    //curl http://localhost:3000/clientes/api/lastpay/57729670ec96e0850c5ca88d
        ClientesApi.prototype.getOneWithLastPay = function(req, res, next) {
            var that = this;
            that.models.cliente.findById({'_id': req.params.id }).populate({
              path: '_pagos',
              options: { limit: 1, sort: '-fechaFin' }
            })
           .exec(function (err, cliente) {
               if (err) return next(err);
               console.log(cliente);
               return res.json(cliente);
             });
           };
//curl -X PUT -i -H "Content-Type: application/json" -d '{ "tipoPago": "semanal", "fechaInicio":"2016,05,25", "fechaFin":"2016,06,25", "fechaCreacion":"2016,05,20" }' http://localhost:3000/clientes/api/57715e68d2216852139e11e9

//borrar un cliente con todos sus pagos.
//curl -X "DELETE" http://localhost:3000/clientes/api/57767603eb2d05420ea45bdc
    ClientesApi.prototype.delete = function(req, res, next) {
        var that = this;
        var idCliente = req.params.id;
        that.models.cliente.findById({_id : idCliente }, function (err, cliente) {
            if(err) return next(err);
            var pagosArr = cliente._pagos;
            for (i = 0; i < pagosArr.length; i++) {
              that.models.pago.remove({_id : pagosArr[i]}, function(err, borrado) {
                  if(err) return next(err);
              });
            }
            that.models.cliente.remove({_id : idCliente}, function(err, borrado) {
                if(err) return next(err);
                res.json(borrado);
            });
        });
    };
    return ClientesApi;
})();
module.exports = ClientesApi;
