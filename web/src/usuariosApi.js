var UsuariosApi = (function() {
    var UsuariosApi = function(models, usuarioFactory, moment, jwt) {
        this.models = models;
        this.usuarioFactory = usuarioFactory;

        this.moment = moment.module;
        this.jwt = jwt.module;
    };

    UsuariosApi.prototype.findByEmail = function(req, res, next) {
        var that = this;
        that.models.usuario.findOne({ email: req.body.email}, function(err, user) {
            if(err) {
                return next(err);
            }

            if (!user) {
                // incorrect username
                return res.sendStatus(401);
            }

            if (!user.password === req.body.password) {
                // incorrect password
                return res.sendStatus(401);
            }

            var expires = that.moment().add(30, 'minutes').valueOf();
            var token = that.jwt.encode({
                iss: user.email,
                exp: expires
            }, 'cualquiera');

            console.log({
                token : token,
                expires: expires,
                user: user
            });
            res.json({
                token : token,
                expires: expires,
                user: user
            });
        });
    };
    //curl http://localhost:3000/usuarios/api/
    UsuariosApi.prototype.getAll = function(req, res, next) {
        var that = this;
        that.models.usuario.find().
        exec(function (err, usuarios) {
           if (err) return next(err);
           console.log(usuarios);
           return res.json(usuarios);
         });
    };

    UsuariosApi.prototype.save = function(req, res, next) {
        var that = this;
        var usuario = that.usuarioFactory.get();
        for (var property in req.body){
            usuario[property] = req.body[property];
        }
        usuario.save(function(err, usuario){
            //if(err) return next(err);
            if(err) console.log(err);
            res.json({success: true});
        });
    };

    //curl -X "DELETE" http://localhost:3000/usuarios/api/577566c637f5bac8122ec537
    UsuariosApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.usuario.remove({_id : req.params.id}, function(err, borrado) {
            if(err) return next(err);
            res.json(borrado);
        });
    };


    return UsuariosApi;
})();

module.exports = UsuariosApi;
