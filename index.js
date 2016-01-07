var through2 = require('through2');

var moduleTypes = {
    kissy:require('./lib/kissy'),
    cmd:require('./lib/cmd'),
    requirejs:require('./lib/requirejs')
};

/**
 * 转换模块
 * @param  {String|Function} typeOrFunc 内置kissy, requirejs, cmd，可以传function，默认requirejs
 * @param  {RegExp} trimRegExp
 * @return {Stream}
 */
module.exports = function transform(typeOrFunc, trimRegExp){
    var buildFunc;
    if(typeof typeOrFunc === 'function'){
        buildFunc = typeOrFunc;
    }
    else if(moduleTypes[typeOrFunc]){
        buildFunc = moduleTypes[typeOrFunc];
    }
    else{
        buildFunc = moduleTypes['requirejs'];
    }


    return through2.obj(function(file, encoding, done) {
        var content = String(file.contents);
        if(trimRegExp){
            content = content.replace(trimRegExp, '');
        }
        var metadata = findMetadata(content);
        var headTail = buildFunc(metadata);
        file.contents = new Buffer(headTail.head + content + headTail.tail);
        this.push(file);
        done();
    });
};

function findMetadata(code){
    var matches = [], result;
    var module, moduleName, requireModules = [], requireClasses = [];
    var moduleRegExp = /(\*[\s]?@module[\s]+)([\S]+)\s/;
    var requireRegExp = /(\*[\s]?@requires[\s]+)([\S]+)\s/ig;
    var classRegExp = /\/?(\w+)$/;

    //module info
    if((result = moduleRegExp.exec(code)) != null){
        matches.push(result[0]);
        module = result[2];
        moduleName = module.match(classRegExp)[1];
    }

    //require module info
    while((result = requireRegExp.exec(code)) != null){
        matches.push(result[0]);
        var mod = result[2];
        var clazz = mod.match(classRegExp)[1];
        requireModules.push(mod);
        requireClasses.push(clazz);
    }

    return {
        matches: matches,
        module: module,
        moduleName: moduleName,
        requireModules: requireModules,
        requireClasses: requireClasses
    };
}