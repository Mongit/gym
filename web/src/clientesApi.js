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
        that.models.cliente.find().populate('pagos')
       .exec(function (err, clientes) {
           if (err) return next(err);
           console.log(clientes);
           return res.json(clientes);
         });
    };

//curl -i -H "Content-Type: application/json" -d '{ "nombre": "jonas", "tipoPago": "semanal", "activo": true, "fechaInicio":"2016,05,25", "fechaFin":"2016,06,25", "fechaCreacion":"2016,05,20" }' http://localhost:3000/clientes/api/
    ClientesApi.prototype.save = function(req, res, next){
        var that = this;
        var cliente = that.clienteFactory.get();
        
        cliente.nombre = req.body.nombre;
        cliente.activo = req.body.activo;
        cliente.ultimosPagos.push({
          tipoPago:req.body.tipoPago,
          fechaInicio:req.body.fechaInicio,
          fechaFin:req.body.fechaFin,
          fechaCreacion: Date.now()
        });
        cliente.save(function (err, cliente) {
          if (err) return next(err)
          console.log('Success!');
          res.json(cliente);
        });
      };
//curl http://localhost:3000/clientes/api/576951d1644d2c5711d0b1b4
    ClientesApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.cliente.findById(req.params.id, function (err, cliente) {
            if(err) return next(err);
            res.json(cliente);
        });
    };
//curl -X PUT -i -H "Content-Type: application/json" -d '{ "nombre": "jonas", "tipoPago": "semanal", "activo": true, "fechaInicio":"2016,05,25", "fechaFin":"2016,06,25", "fechaCreacion":"2016,05,20" }' http://localhost:3000/clientes/api/576951d1644d2c5711d0b1b4
     ClientesApi.prototype.agregarPago = function(req, res, next) {
          var that = this;

          //uses body to find a user.
          that.models.cliente.findById(req.params.id, function(err, cliente) {
              if(err)  return next(err);
              //uses body to update user.
              console.log(cliente);
              cliente.nombre = req.body.nombre;
              cliente.activo = req.body.activo;
              cliente.ultimosPagos.push({
                tipoPago:req.body.tipoPago,
                fechaInicio:req.body.fechaInicio,
                fechaFin:req.body.fechaFin,
                fechaCreacion: Date.now()
              });
              cliente.save(function (err, cliente) {
                 if (err) return next(err)
                 console.log('Success!');
                 res.json(cliente);
              });
          });
      };
//curl -X "DELETE" http://localhost:3000/clientes/api/576821fd92dea54d668fd3d3
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
