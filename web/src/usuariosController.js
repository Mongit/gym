module.exports = (function() {
    var UsuariosController = function(express, usuariosApi) {
        this.express = express.module;
        this.usuariosApi = usuariosApi;
        this.router = this.express.Router();

        var router = this.router;
        var that = this;

        router.get('/', usuariosApi.getAll.bind(usuariosApi));

        router.post('/signin', usuariosApi.findByEmail.bind(usuariosApi));

        router.post('/signup', usuariosApi.save.bind(usuariosApi));
    };

    return UsuariosController;
})();
