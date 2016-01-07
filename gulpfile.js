var gulp = require('gulp');
var rename = require('gulp-rename');
var transformModule = require('./index');

var moduleTypes = {
    kissy:'kissy',
    cmd:'cmd',
    requirejs:'requirejs',
    standalone:function(metadata){
        var head = '(function(window){\n';
        var tail = '\n})(window);';

        var module = metadata.moduleName;
        var requireModules = metadata.requireClasses;

        if(module === 'Hilo'){
            tail = '\nwindow.Hilo = Hilo;' + tail;
        }
        else{
            tail =  '\nHilo.' + module + ' = ' + module + ';' + tail;

            head += 'var Hilo = window.Hilo;\n';
            requireModules.forEach(function(requireModule){
                if(requireModule !== 'Hilo'){
                    head += 'var ' + requireModule + ' = Hilo.' + requireModule + ';\n';
                }
            });
        }

        return {
            head:head,
            tail:tail
        };
    }
};

for(var moduleType in moduleTypes){
    (function(moduleType){
        gulp.task(moduleType, function(){
            return gulp.src('./test/game.js')
                .pipe(transformModule(moduleTypes[moduleType]))
                .pipe(rename({suffix:'-' + moduleType}))
                .pipe(gulp.dest('./test/build/'));
        });
    })(moduleType);
}

gulp.task('test', ['kissy', 'cmd', 'requirejs', 'standalone']);