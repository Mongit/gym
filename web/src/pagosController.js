module.exports = (function() {
    var PagosController = function(express, pagosApi) {
        this.express = express.module;
        this.pagosApi = pagosApi;
        this.router = this.express.Router();

        var router = this.router;

        router.get('/', pagosApi.getAll.bind(pagosApi));
/*
        router.get('/ultimos', pagosApi.getLastPaids.bind(pagosApi));
*/
    //    router.post('/', pagosApi.save.bind(pagosApi));

        

        router.get('/:id', pagosApi.getOne.bind(pagosApi));

        router.delete('/:id', pagosApi.delete.bind(pagosApi));
    }

    return PagosController;
})();
