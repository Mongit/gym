var ErrorClass = (function() {
    var ErrorClass = function(){
    }
    ErrorClass.prototype.printError = function(err){
        Object.keys(err.errors).forEach(function(key) {
            var message = err.errors[key].message;
            console.log('Validation error for "%s": %s', key, message);
        });
    };
    return ErrorClass;
})();

module.exports = ErrorClass;
