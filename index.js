var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-transform-module';
var MODULE_TYPES = {
    kissy: require('./lib/kissy'),
    cmd: require('./lib/cmd'),
    amd: require('./lib/amd'),
    commonjs: require('./lib/commonjs')
};

/**
 * transform module define
 * @param  {String|Function} typeOrFunc, if type, value is amd|commonjs|cmd|kissy, default is amd;
 *                                       if function，see below;
 * @return {steam}
 */
module.exports = function transform(typeOrFunc) {
    var buildFunc;
    if (typeof typeOrFunc === 'function') {
        buildFunc = typeOrFunc;
    } else if (MODULE_TYPES[typeOrFunc]) {
        buildFunc = MODULE_TYPES[typeOrFunc];
    } else {
        buildFunc = MODULE_TYPES['requirejs'];
    }

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }
        try {
            var content = file.contents.toString();
            var metadata = findMetadata(content);
            var headTail = buildFunc(metadata);
            file.contents = new Buffer(headTail.head + content + headTail.tail);
            this.push(file);
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err, {
                fileName: file.path
            }));
        }
        cb();
    });
};

function findMetadata(code) {
    var matches = [],
        result;
    var module, moduleName, requireModules = [],
        requireClasses = [];
    var moduleRegExp = /(\*[\s]?@module[\s]+)([\S]+)\s/;
    var requireRegExp = /(\*[\s]?@requires[\s]+)([\S]+)\s/ig;
    var classRegExp = /\/?(\w+)$/;

    //module info
    if ((result = moduleRegExp.exec(code)) != null) {
        matches.push(result[0]);
        module = result[2];
        moduleName = module.match(classRegExp)[1];
    }

    //require module info
    while ((result = requireRegExp.exec(code)) != null) {
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