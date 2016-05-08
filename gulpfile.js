'use strict';

var gulp = require('gulp');
var _ = require('underscore');
var sass = require('gulp-ruby-sass');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var data = require('gulp-data');
var path = require('path');
var jaden = require('jade');
var fs = require('fs');
var filename = ['./*.scss'];
var filename2 = ['./car/*.scss'];
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");
var browserify = require('browserify');

var filters = jaden.filters;
filters.some = function (block) {
    return block.replace(/</g,'&lt;')
                .replace(/>/g,'&gt;');
};


gulp.task('sass', function() {
  return sass(filename2, {sourcemap:true,style: 'expanded',compass: true})
    .pipe(sourcemaps.write())    
        .pipe(gulp.dest('./car/css'));
});


gulp.task('sass2', function() {
  return sass(filename2, {style: 'expanded',compass: true,sourcemap: true})
  .pipe(gulp.dest('./css/web'));
});


gulp.task("ejs", function() {
    var json_file = "./json/page2.json";
    var json = JSON.parse(fs.readFileSync(json_file));
    gulp.src(
        ["./temp/*.ejs",'!' + "./temp/**/_*.ejs"] //注1
    )
        .pipe(plumber())
        .pipe(ejs({ jsonData : json}))
        .pipe(rename(json.pages[0].id + ".html"))
        .pipe(gulp.dest(json.pages[0].dir)) //注2
});


gulp.task('d', function () {
  gulp.watch('./car/*.scss', ['sass']);
  //gulp.watch('./temp/**/*.jade', ['jade']);
});




gulp.task('jade', function () {
  gulp.src(
      ["./temp/*.jade"]
  )
      .pipe(plumber())
      .pipe(jade({
            pretty: true,
      }))
      .pipe(gulp.dest("./html"))//注2
});

gulp.task('json-temp', function() {
    var tmp_file = "./temp/template.ejs"; // テンプレート用EJSファイル
    var arr = JSON.parse(fs.readFileSync(json_file));
    var json = JSON.parse(fs.readFileSync(json_file)); // JSONの読み込み
    var pages = json.pages;

    for (var i = 0; i < pages.length; i++) { // ページの数だけループ
        var id = pages[i].id;

        gulp.src(tmp_file)
            .pipe(ejs({
                jsonData: pages[i],
                un: "_" // JSONのデータをejsに渡す
            }))
            .pipe(rename(id + ".html")) // (id).htmlにファイル名を変更
            .pipe(gulp.dest(pages[i%pages.length].dir)); // 指定したフォルダに出力
    }
});



gulp.task('babel', function() {
  gulp.src('./src/_*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./app/dest/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/_*.js', ['babel'])
});

gulp.task('default', ['babel', 'watch']);