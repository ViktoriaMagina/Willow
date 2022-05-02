# Сборка Gulp
## Быстрый старт
Данная сборка Gulp предназначена для верстки как одностраничных, так и многостраничных сайтов. 
На выходе вы получите сжатые JS, CSS, HTML файлы, изображения и шрифты соотвественно. 
Перед тем, как приступить к использованию сборки, Вам необходимо прописать команду ```npm i``` для установки всех npm-пакетов.

В сборке реализованны следующие скрипты:
* ```gulp start``` - запуск gulp в режиме разработки. (Будет запущен модуль Browsersync и все необходимые таски, отслеживающие изменения в файлах)
* ```gulp build``` - запуск gulp в режиме продакшена. (Будет произведена очистка директории public/, после чего запустятся все необходимые таски для повторной сборки проекта)
* ```gulp clean``` - очистка директории public.

## Архитектура директории public
Финальная сборка проекта будет имеет следующую архитектуру:
```
public
|
  font
  |
    Montserrat-Italic-VariableFont_wght.ttf
  css
  |
    style.css 
  js
  |
    main.js
  img
  |
    image.png
  favicon.ico
  index.html
```
>В данном примере приведена простейшая конфигурация проета

## Архитектура директории src
Директория src хранит в себе все файлы, необходимые для реализации проекта
```
src
|
  font
  |
    Montserrat-Regular.ttf
  html
  |
    components //директория, содержащая html компоненты 
    |
      component.html
    pages //директория, содержащая html страницы
    |
      index.html
  img //директория, содержащая изображения
  |
    gulp.png
  pug
  |
    components //директория, содержащая pug компоненты 
    |
      component.pug
    pages //директория, содержащая pug страницы
    |
      index.pug
  scripts
  |
    modules //директория, содержащая js компоненты
    |
      counter.js
    index.js
    second.js
  styles
  |
    modules //директория, содержащая scss модули
    |
      _fonts.scss
      _global.scss
      _vars.scss
      _media.scss
    style.scss
  favicon.ico
```
>second.js добавлен в сборку в качестве примера обработки нескольких файлов js с помощью webpack, при его удалении не забудьте удалить и его точку входа в ```webpack.config.js```.


>counter.js добавлен в сборку в качестве примера импорта одного js файла в другой

## Установленные NPM-Пакеты

Npm-пакеты, установленные в сборку Gulp, распределены по следующим категориям:
 * Npm-пакеты, предназначенные для разнообразных файлов:
   * [gulp-rename](https://www.npmjs.com/package/gulp-rename)
   * [del](https://www.npmjs.com/package/del)
   * [browser-sync](https://www.npmjs.com/package/browser-sync)
   * [gulp-newer](https://www.npmjs.com/package/gulp-newer)
   * [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) 
 * Npm-пакеты, предназначенные для обработки html файлов:
   * [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) 
   * [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) 
 * Npm-пакеты, предназначенные для обработки pug файлов:
   * [gulp-pug](https://www.npmjs.com/package/gulp-pug) 
 * Npm-пакеты, предназначенные для обработки scss файлов:
   * [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) 
   * [gulp-csso](https://www.npmjs.com/package/gulp-csso) 
   * [gulp-sass](https://www.npmjs.com/package/gulp-sass) 
   * [sass](https://www.npmjs.com/package/sass) 
 * Npm-пакеты, предназначенные для обработки js файлов:
   * [webpack](https://www.npmjs.com/package/webpack) 
   * [webpack-stream](https://www.npmjs.com/package/webpack-stream) 
 * Npm-пакеты, предназначенные для обработки изображений:
   * [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) 
 * Npm-пакеты, предназначенные для обработки шрифтов:
   * [gulp-fonter](https://www.npmjs.com/package/gulp-fonter) 
   * [gulp-ttf2woff2](https://www.npmjs.com/package/gulp-ttf2woff2) 

## Индивидуальная настройка webpack.config.js
Js файлы в данной сборке обрабатываются с помощью сборщика модулей webpack и его лоадера "babel-loader". 
Если вам необходимо создать очередной JS файл, который пойдет в директорию public, то добавьте новую точку входа в файле ```webpack.config.js```:
```
module.exports = {
    ...
    entry: {
        index: './src/scripts/index.js', 
        second: './src/scripts/second.js',
        имяТочкиВхода: 'путь до новой точки входа'
    },
    ...
   }
  ```
>Данный файл находится в корне сборки

## Pug и HTML
По умолчанию таск, обрабатывающий Pug, не подключен к скриптам запуска и сборки проекта.
Если вам необходимо работать исключительно на Pug, то в файле ```gulpfile.js``` исправьте скрипты сборки и запуска проекта:
```
exports.start = series(
    //до:
    parallel(html, img, favicon, scss, js, font),
    //после:
    parallel(pug, img, favicon, scss, js, font),
    ...
)

```
> пример удаления таска обработки HTML файлов и дальнейшее подключение таска для обработки Pug файлов в скрипте запуска проекта

Также данные таски могут работать вместе и обрабатывать как Pug, так и HTML файлы: 
```
exports.start = series(
    parallel(pug, html, img, favicon, scss, js, font),
    ...
)

```