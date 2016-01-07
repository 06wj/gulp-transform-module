module.exports = function(metadata){
    var head = "define(function(require, exports, module){\n\n";
    var tail = "\n\n});";

    if(metadata.requireClasses.length){
        var requiresStr = '';
        metadata.requireClasses.forEach(function(clazz, index){
            requiresStr += "var " + clazz + " = require('" + metadata.requireModules[index] + "');\n";
        });
        head += requiresStr + "\n";
    }

    if(metadata.moduleName) tail = '\n\nreturn ' + metadata.moduleName + ';' + tail;

    return {head:head, tail:tail};
};