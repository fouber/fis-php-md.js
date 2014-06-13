(function(global){
    var factorys = {};
    var modules = {};
    var run = function(factory){
        var module = {};
        var exports = module.exports = {};
        var ret = factory(require, exports, module);
        return typeof ret === 'undefined' ? module.exports : ret;
    };
    global.define = function(id, factory){
        switch (typeof id){
            case 'string':
                if(typeof factory === 'function'){
                    factorys[id] = factory;
                } else {
                    modules[id] = factory;
                }
                break;
            case 'function':
                run(id);
                break;
        }
    };
    var require = function(id){
        if(modules.hasOwnProperty(id)){
            return modules[id];
        } else if(factorys.hasOwnProperty(id)) {
            return modules[id] = run(factorys[id]);
        } else {
            throw 'undefined module [' + id + ']';
        }
    };
})(window);
