var gulp = require('gulp');
var rename = require('gulp-rename');
var transformModule = require('./index');

//custom module define
transformModule.add('standalone', function(metadata){
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
});

var moduleTypes = ['amd', 'commonjs', 'cmd', 'kissy', 'standalone'];
moduleTypes.forEach(function(moduleType){
    gulp.task(moduleType, function(){
        return gulp.src('./test/game.js')
            .pipe(transformModule(moduleType))
            .pipe(rename({suffix:'-' + moduleType}))
            .pipe(gulp.dest('./test/build/'));
    });
});

gulp.task('default', moduleTypes);