    var gulp        = require('gulp'),
        plumber     = require('gulp-plumber'),
        uglify      = require("gulp-uglify"),
        browserify  = require('browserify'),
        babelify    = require('babelify'),
        source      = require('vinyl-source-stream');
        var sourcemaps = require('gulp-sourcemaps');
        var sass = require('gulp-ruby-sass');
        var filename2 = ['./scss/*.scss'];
    // トランスパイル
    gulp.task('browserify', function() {
        browserify('./common/js/jsx/index.jsx', { debug: false  })
            .transform(babelify, { presets: ['es2015', 'react'] })
            .bundle()
            .on("error", function (err) { console.log("Error : " + err.message); })
            .pipe(source('main.js'))
            .pipe(gulp.dest('./common/js/'))
            .on('end',function(){
                gulp.src(["./common/js/main.js"])
                    .pipe(plumber())
                    .pipe(uglify({mangle: false}))
                    .pipe(gulp.dest("./common/js/bild/min"))
            })
    });
     
    gulp.task('sass', function() {
      return sass(filename2, {sourcemap:true,style: 'expanded',compass: true})
        .pipe(sourcemaps.write())    
            .pipe(gulp.dest('./app/css'));
    });
    // watch 
    gulp.task('watch',function(){
        gulp.watch('./common/js/jsx/*.jsx', ['browserify']);
        gulp.watch('./scss/*.scss', ['sass'])
    });
     
    gulp.task("default",['watch']);