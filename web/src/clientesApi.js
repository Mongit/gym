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
//guarda un cliente y su primer pago.
//curl -i -H "Content-Type: application/json" -d '{ "nombre": "jonas", "tipoPago": "semanal", "activo": true, "fechaInicio":"2016,05,10", "fechaFin":"2016,06,20" }' http://localhost:3000/clientes/api/
    ClientesApi.prototype.save = function(req, res, next){
        var that = this;
        var pago = that.pagoFactory.get();
        pago.tipoPago = req.body.tipoPago;
        pago.fechaInicio = req.body.fechaInicio;
        pago.fechaFin = req.body.fechaFin;
        pago.fechaCreacion = Date.now();
        pago.save(function(err,pago){
          if (err) return next(err);
          var cliente = that.clienteFactory.get();
          cliente.nombre = req.body.nombre;
          cliente.activo = req.body.activo;
          cliente._pagos.push(pago._id)
          cliente.save(function (err, cliente) {
            if (err) return next(err);
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


//curl -X "DELETE" http://localhost:3000/clientes/api/57729670ec96e0850c5ca88d
    ClientesApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.cliente.remove({_id : req.params.id}, function(err, borrado) {
            if(err) return next(err);
            res.json(borrado);
        });
    };

    return ClientesApi;
})();

module.exports = ClientesApi;
