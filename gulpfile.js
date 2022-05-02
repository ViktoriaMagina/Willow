//Плагины----------------------------------------
const {src , dest, watch, series, parallel} = require('gulp')
const rename = require("gulp-rename");
const del = require('del');
const browserSync = require('browser-sync').create();
const newer = require('gulp-newer')
const sourcemaps = require('gulp-sourcemaps');

//html
const includeFile = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin');

//pug
const pugs = require('gulp-pug')

//styles
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const sass = require('gulp-sass')(require('sass'));


//webpack
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js'); //webpack.config.js

//img
const imagemin = require('gulp-imagemin');

//fonts
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
//Плагины----------------------------------------


//Пути для различных типов файлов
const paths = {
    html: {
        watching: 'src/html/**/*.html',
        src: 'src/html/pages/*.html',
        dest: 'public/',
    },
    pug: {
        watching: 'src/pug/**/*.pug',
        src: 'src/pug/pages/*.pug',
        dest: 'public/',
    },
    styles: {
        watching: 'src/styles/**/*.scss',
        src: 'src/styles/*.scss',
        dest: 'public/css/',
    },
    scripts: {
        watching: 'src/scripts/**/*.js',
        src: 'src/scripts/*.js',
        dest: 'public/js/',
    },
    img: {
        src: 'src/img/**/*.+(png|svg|jpg|jpeg|gif|ico)',
        dest: 'public/img/',
    },
    favicon: {
        src: 'src/favicon.+(ico|png|svg)',
        path: 'public/',
    },
    fonts: {
        src: 'src/font/**/*',
        dest: 'public/font/',
    },
}

//Обработка html
const html = () => {
    return src(paths.html.src)
        .pipe(includeFile())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream())
}
//Обработка PUG
const pug = () => {
    return src(paths.pug.src)
        .pipe(pugs({
            pretty: true
        }))
        .pipe(includeFile())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest(paths.pug.dest))
        .pipe(browserSync.stream())
}
//Обработка SCSS-SASS
const scss = () => {
    return src(paths.styles.src)
    .pipe(sourcemaps.init('.'))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(rename({suffix: ".min" }))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
}
//Обработка JS с помощью webpack
const js = () => {
    return src(paths.scripts.src)
        .pipe(sourcemaps.init('.'))
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(dest(paths.scripts.dest));
}
//Обработка Изображений
const img = () => {
    return src(paths.img.src)
        .pipe(newer(paths.img.dest))
        .pipe(imagemin())
        .pipe(dest(paths.img.dest))
        .pipe(browserSync.stream())
}

//Обработка favicon
const favicon = () => {
    return src(paths.favicon.src)
        .pipe(dest(paths.favicon.path))
}
//Обработка Шрифтов
const font = () => {
    return src(paths.fonts.src)
        .pipe(newer(paths.fonts.src))
        .pipe(fonter({
            formats: ["ttf","woff","eot","svg"]
        }))
        .pipe(dest(paths.fonts.dest))
        .pipe(ttf2woff2())
        .pipe(dest(paths.fonts.dest))
        .pipe(browserSync.stream())
}

//Функция для наблюдения за изменениями
const watcher = () => {
    watch(paths.pug.watching ,pug).on("change", browserSync.reload);
    watch(paths.html.watching , html).on("change", browserSync.reload);
    watch(paths.styles.watching, scss).on("change", browserSync.reload);
    watch(paths.scripts.watching, js).on("change", browserSync.reload);
    watch(paths.img.src, img).on("change", browserSync.reload);
    watch(paths.fonts.src, font).on("change", browserSync.reload);
}

//Функция очистки директории public
const clear = () => {
    return del("./public")
}


const server = () =>{
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    })
}

//Задачи
exports.html = html;
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.favicon = favicon;
exports.font = font;
exports.watch = watcher;
exports.clear = clear;
exports.server = server;

//Сборка в режиме разработки
exports.start = series(
    parallel(pug, img, favicon, scss, js, font),
    parallel(watcher, server)
)

//Сборка в режиме production
exports.build = series(
    clear,
    parallel(pug, scss, js, img, favicon, font),
)

//Очистка в директории public
exports.clean = series(
    clear
)