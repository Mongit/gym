var PagosApi = (function() {
    var PagosApi = function(models, pagoFactory, clienteFactory, err) {
        this.models = models;
        this.pagoFactory = pagoFactory;
        this.clienteFactory = clienteFactory;
        this.err = err;
    };

//curl http://localhost:3000/pagos/api/
    PagosApi.prototype.getAll = function(req, res, next) {
        var that = this;
        that.models.pago.find().populate('_clienteId')
       .exec(function (err, pagos) {
           if (err) return next(err);
           console.log(pagos);
           return res.json(pagos);
         });
    };
/*
    PagosApi.prototype.getLastPaids = function(req, res, next) {
        var that = this;
        that.models.pago.find({ "nombre": "jonas"}, function (err, pagos) {
            if (err) return next(err);
            console.log(pagos);
            res.json(pagos);
        });
    };
*/
//curl -i -H "Content-Type: application/json" -d '{ "nombre": "jonas", "tipoPago": "semanal", "activo": true, "fechaInicio":"2016,05,25", "fechaFin":"2016,06,25", "fechaCreacion":"2016,05,20" }' http://localhost:3000/pagos/api/
  /*  PagosApi.prototype.save = function(req, res, next){
        var that = this;
        var cliente = that.clienteFactory.get();
        cliente.nombre = req.body.nombre;
        cliente.activo = req.body.activo;
        cliente.save(function(err, cliente){
            if(err) return that.err.printError(err);
            var pago = that.pagoFactory.get();
            pago.tipoPago = req.body.tipoPago;
            pago.fechaInicio = req.body.fechaInicio;
            pago.fechaFin = req.body.fechaFin;
            pago.fechaCreacion = req.body.fechaCreacion;
            pago._clienteId = cliente._id;
            pago.save(function(err, pago){
                if(err) return that.err.printError(err);
                res.json(pago);
            });
        });
    };
*/
    PagosApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.pago.findById(req.params.id, function (err, pago) {
            if(err) return next(err);
            res.json(pago);
        });
    };

//curl -X "DELETE" http://localhost:3000/pagos/api/576821fd92dea54d668fd3d3
    PagosApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.pago.remove({_id : req.params.id}, function(err, borrado) {
            if(err) return next(err);
            res.json(borrado);
        });
    };

    return PagosApi;
})();

module.exports = PagosApi;
