var path = require('path');
module.exports = function(metadata){
    var head = "";
    var tail = "";

    if(metadata.requireClasses.length){
        var requiresStr = '';
        metadata.requireClasses.forEach(function(clazz, index){
            var module = metadata.module;
            var requireModule = metadata.requireModules[index];
            var fromModule = path.resolve(module, '../') + '/';
            var relativeModule = path.relative(fromModule, requireModule);

            if(/\w/.test(relativeModule[0])){
                relativeModule = './' + relativeModule;
            }
            requiresStr += "var " + clazz + " = require('" + relativeModule + "');\n";
        });
        head += requiresStr + "\n";
    }

    if(metadata.moduleName) tail = '\n\nmodule.exports = ' + metadata.moduleName + ';';

    return {head:head, tail:tail};
};