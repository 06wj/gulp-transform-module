module.exports = function(metadata){
    var head = "";
    var tail = "";

    if(metadata.requireClasses.length){
        var requiresStr = '';
        metadata.requireClasses.forEach(function(clazz, index){
            requiresStr += "var " + clazz + " = require('" + metadata.requireModules[index] + "');\n";
        });
        head += requiresStr + "\n";
    }

    if(metadata.moduleName) tail = '\n\nmodule.exports = ' + metadata.moduleName + ';';

    return {head:head, tail:tail};
};