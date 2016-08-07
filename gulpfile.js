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
var filename = ['./scss/*.scss'];
var filename2 = ['./scss/*.scss'];
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
        .pipe(gulp.dest('./app/css'));
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
            data: {"parts": 8}
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

var getFolders = function(dir_path) {
  return fs.readdirSync(dir_path).filter(function(file) {
    return fs.statSync(path.join(dir_path, file)).isDirectory();
  });
};
var path = require('path');
var fs   = require('fs');
var folders = getFolders('./app/img/sprite/');


var option = [".png",".jpg"];
gulp.task('sprite', function() {
  console.log(folders);
    folders.forEach(function(folder){
        var spriteData = gulp.src('./app/img/sprite/'+ folder +'/*' + option[0])
            .pipe(spritesmith({
                imgName: 'sprite'+option[0],                        // スプライト画像
                cssName: '_sprite.scss',                      // 生成される CSS テンプレート
                imgPath: './img/sprite'+option[0], // 生成される CSS テンプレートに記載されるスプライト画像パス
                cssFormat: 'scss',                            // フォーマット拡張子
                cssVarMap: function(sprite) {
                    sprite.name = "sprite-" + sprite.name;      // 生成される CSS テンプレートに変数の一覧を記述
                }
        }));
        spriteData.img
            .pipe(gulp.dest('./public/assets/images/'+ folder));     // imgName で指定したスプライト画像の保存先
        return spriteData.css
            .pipe(gulp.dest('./app/styles/commons'+ folder));    

    });
});
gulp.task('babel', function() {
  gulp.src('./es6/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./app/js/'))
});

gulp.task('watch', function() {
  gulp.watch('./es6/*.js', ['babel'])
  gulp.watch('./scss/*.scss', ['sass'])
  gulp.watch('./temp/*.jade', ['jade'])
});

gulp.task('default', ['watch']);