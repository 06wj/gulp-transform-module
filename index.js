var through = require('through2');
var gutil = require('gulp-util');
var bufferstreams = require('bufferstreams');
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
 * @param  {String} moduleType, can be amd,commonjs,cmd,kissy, default is amd;
 * @return {stream}
 */
module.exports = function gulpTransformModule(moduleType) {
    var buildFunc = MODULE_TYPES[moduleType]||MODULE_TYPES['amd'];

    return through.obj(function(file, enc, cb) {
        var that = this;
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        function transformModule(buffer, done){
            var result;
            try{
                var content = buffer.toString();
                var metadata = findMetadata(content);
                var headTail = buildFunc(metadata);
                result = new Buffer(headTail.head + content + headTail.tail);
                done(null, result);
            }
            catch(err){
                done(new PluginError(PLUGIN_NAME, err, {
                    fileName: file.path
                }));
            }
        }

        if(file.isStream()){
            file.contents = file.contents.pipe(new bufferstreams(function(err, buf, done){
                transformModule(buf, function(err, contents){
                    if(err){
                        that.emit('error', err);
                    }
                    else{
                        done(null, contents);
                        that.push(file);
                    }
                    cb();
                });
            }));
            return;
        }

        transformModule(file.contents, function(err, contents){
            if(err){
                that.emit('error', err);
            }
            else{
                file.contents = contents;
                that.push(file);
            }
            cb();
        });
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
};

module.exports.add = function(type, moduleFunction){
    MODULE_TYPES[type] = moduleFunction;
};