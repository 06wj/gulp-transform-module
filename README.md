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
	        .pipe(transformModule('kissy'))
	        .pipe(rename({suffix:'-kissy'}))
	        .pipe(gulp.dest('build/'));
	});
	```
* example  
see [gulpfile.js](./gulpfile.js), [game.js](./test/game.js), [build](./test/build/)
