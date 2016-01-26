# gulp-transform-module
> transform code to multiple module define

## usage


* use code comment define module and requires

    ```
    /**
     * @module    a/b/moduleName
     * @requires  a/b/requireModule1
     * @requires  a/b/requireModule2
     */
     var moduleName = {
        foo:function(){
            requireModule1.foo();
            requireModule2.foo();
        }
     };
    ```

* gulpfile.js

    ```javascript
    var gulp = require('gulp');
    var rename = require('gulp-rename');
    var transformModule = require('gulp-transform-module');

    gulp.task('transform', function(){
        return gulp.src('**/*.js')
            .pipe(transformModule('amd'))//transform to amd
            .pipe(rename({suffix:'-amd'}))
            .pipe(gulp.dest('build/'));
    });
    ```

## api
* get transformModule

    ```javascript
    var transformModule = require('gulp-transform-module');
    ```
* transform module define

    ```javascript
    /**
    * transform module define
    * @param  {String} moduleType, can be amd,commonjs,cmd,kissy, default is amd
    * @return {steam}
    */
    transformModule(moduleType)
    ```

* add custom module define

    ```
    /**
    * add custom module define
    * @param {String} moduleType
    * @oaram {Function} transformModuleFunction
    *                   see #transformModuleFunction for example
    */
    transformModule.add(moduleType, transformModuleFunction)
    ```

* transformModuleFunction example

    ```javascript
        /**
         * @param  {Object} moduleData
         * @param {String} moduleData.module, eg:'a/b/moduleA'
         * @param {String} moduleData.moduleName, eg:'moduleA'
         * @param {Array} moduleData.requireModules, eg:['a/b/requireModuleB','a/b/requireModuleC']
         * @param {Array} moduleData.requireClasses, eg:['requireModuleB','requireModuleC']
         * @return {Object} result {head:head, tail:tail}
         */
        function(moduleData){
            var head = '(function(window){\n';
            var tail = '\n})(window);';

            var module = moduleData.moduleName;
            var requireModules = moduleData.requireClasses;

            tail =  '\nwindow.' + module + ' = ' + module + ';' + tail;

            head += 'var Hilo = window.Hilo;\n';
            requireModules.forEach(function(requireModule){
                if(requireModule !== 'Hilo'){
                    head += 'var ' + requireModule + ' = window.' + requireModule + ';\n';
                }
            });

            return {
                head:head,
                tail:tail
            };
        }
    ```

## example
see [gulpfile.js](./gulpfile.js), [game.js](./test/game.js), [build](./test/build/)
