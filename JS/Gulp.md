```shell script
$ mkdir gulp-html
$ npm init -y // инициализируем package.json
$ npm i -D gulp gulp-file-include gulp-sass gulp-csso browser-sync del gulp-htmlmin gulp-autoprefixer gulp-concat // сохраняем список зависимостей для разработки

$ mkdir src
$ cd src
$ touch index.html
$ touch about.html
$ mkdir parts
$ cd parts
$ touch header.html
$ touch footer.html
$ cd ..
$ mkdir scss
$ cd scss
$ touch index.scss
$ touch second.scss
$ cd ../..
$ touch gulpfile.js
$ code . // открыть текущую директорию в VSC


$ gulp build // запуск задачи
$ gulp сlear // запуск задачи
```

> FILE gulpfile.js:

```js
const {src, dest, series, watch} = require('gulp'); // series - позволяет вызывать последовательно несколько задач
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include'); // пакет отвечает за соединение данных файлов
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat'); // cоединяет множество файлов в один
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();

const html = () => {
    return src('src/**.html') // указываем какие файлы обрабатываем (все .html файлы в папке /src)
        .pipe(include({ // добавляем модуль include
            prefix: '@@' // префикс (*1)       
        }))
        .pipe(htmlmin({ // минификация html
            collapseWhitespace: true // удаляет пробелы        
        }))
        .pipe(dest('dist')) // dest - переносит результирующий стрим в папку dist и создает новый файл
}

const scss = () => {
    return src('src/scss/**.scss') // указываем какие файлы обрабатываем (все .scss файлы в папке /src/scss/)
        .pipe(sass()) // компилируем файлы с помощью sass
        .pipe(autoprefixer({ // добавляем префиксы
            browsers: ['last 2 versions'] 
        }))
        .pipe(csso()) // минифицируем файлы 
        .pipe(concat('index.css')) // соединяем файлы в один
        .pipe(dest('dist')) // dest - переносит результирующий стрим в папку dist и создает новый файл
}

const clear = () => {
    return del('dist') // очищаем папку dist
}

const serve = () => { 
    sync.init({ // организуем сервер
        server: './dist' // указываем в какую папку смотреть серверу
    })

    watch('src/**.html', series(html)) // смотрит за изменением файлов и при изменении запускает задачу
        .on('change', sync.reload) // затем перезагружаем сервер

    watch('src/scss/**.scss', series(scss))
        .on('change', sync.reload)        
}

exports.build = series(clear, scss, html) // регистрируем задачу 
exports.serve = series(clear, scss, html, serve) // регистрируем задачу 
exports.clear = clear // регистрируем задачу
```

> FILE: /src/index.html:

```html
    @@include('parts/header.html) // префикс (*1)
        
    <h1>Home page</h1>
    
    @@include('parts/footer.html) 
```

> FILE: /src/about.html:

```html
    @@include('parts/header.html) // префикс (*1)

    <h1>About page</h1>

    @@include('parts/footer.html)
```

> FILE: /src/parts/header.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
```

> FILE: /src/parts/footer.html:

```html
</body>
</html>
```

> FILE: /src/scss/index.scss:

```scss
$red: red;

h1 {
    color: $red;
}
```

> FILE: /src/scss/second.scss:

```scss
@mixin clear-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

ul {
    @include clear-list();
    display: flex;    
}
```
