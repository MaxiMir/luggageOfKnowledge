/* #@ GULP @# */

/**
 $ npm init
 $ npm i --save-dev gulp
 $ npm i --save-dev gulp-sass
 $ npm i --save-dev browser-sync
 $ npm i -g bower
 $ npm i --save-dev gulp-concat gulp-uglifyjs
 $ npm i --save-dev gulp-cssnano gulp-rename
 $ npm i --save-dev del
 $ npm i --save-dev gulp-imagemin imagemin-pngquant
 $ npm i --save-dev gulp-cache
 $ npm i --save-dev gulp-autoprefixer

 // TREE:
 - app (исходники)
 - css
 - js
 - common.js
 - fonts
 - img
 - libs - библиотеки
 - sass
 - _part.sass - не компилиться как отдельный файл
 - main.sass
 - libs.sass - css для библиотек
 - index.html
 - dist (продакшн)
 gulpfile.js
 package.json
 .bowerrc
 */

// FILE: .bowerrc
{
    'directory': 'app/libs' // директория для установки пакетов
}

// $ bower i jquery magnific-popup # установка библиотек с помощью bower


// FILE: /app/sass/_part.sass:
/*
    body
        font-size: 22pxjquery
*/

// FILE: /app/sass/main.sass:
/*
    @import "part"

    body
        background-color: #000;
*/

// FILE: /app/sass/libs.sass:
/*
    @import "app/libs/magnific-popup/dist/magnific-popup" # если файл css расширение можно не указывать
*/

// FILE: gulpfile.js
const gulp = require('Gulp.md');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => { // создание таска sass
    return gulp
        .src('app/sass/*.sass') // gulp.src - выборка файлов для работы (все файлы с расширением sass)
        // .src(['!app/sass/main.sass', 'app/sass/*.sass']) - все sass файлы кроме app/sass/main.sass
        // .src('app/sass/**/.*+(scss|sass)) - выбор нескольких расширений scss|sass в директориях и поддиректорияx app/sass/
        .pipe(sass()) // pipe - запуск плагина sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // добавление префиксов для браузеров
        .pipe(gulp.dest('app/css')) // gulp.dest - путь назначения для результирующих файлов
        .pipe(browserSync.reload({stream: true})) // инжектим
});

gulp.task('scripts', () => {
    return gulp
        .src([
            'app/libs/jquery/dist/jquery.min.js',
            'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        ])
        .pipe(concat('libs.min.js')) // объединяем все файлы в libs.min.js
        .pipe(uglify()) // сжатие файла
        .pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['sass'], () => {
    return gulp
        .src('app/css/libs.css')
        .pipe(cssnano()) // сжимаем css файл
        .pipe(rename({suffix: 'min'})) // переименовываем
        .pipe(gulp.dest('app/css'))
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "app" // запуск сервера (c указанием папки)
        },
        notify: false // отключение уведомлений
    })
});

gulp.task('clean', () => {
    return del.sync('dist'); // удаление папки dist
});

gulp.task('clear', () => {
    return cashe.clearAll(); // удаление кэша
});


gulp.task('img', () => {
    return gulp.src('app/img/**/*') // выбираем абсолютно все
        .pipe(cache(imagemin({ // сжимаем|оптимизацируем картинки + кэшируем изображения
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], () => { // в массиве список тасков, которые запустятся до таска watch
    gulp.watch('app/sass/**/*.sass', ['sass']); // при изменении файлов .sass будет перезапущен таск sass
    gulp.watch('app/*.html', browserSync.reload); // вотчим за html файлами и при изменении перезапускаем сервер
    gulp.watch('app/js/*.js', browserSync.reload); // вотчим за js файлами и при изменении перезапускаем сервер
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], () => {
    const buildCss = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css'
    ]).pipe(gulp.dest('dist/css')); // переносим css файлы в dist/css

    const buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/css')); // перенос шрифтов в dist/css
    const buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js')); // перенос шрифтов в dist/js
    const buildHtml = gulp.src('app/*.html').pipe(gulp.dest('dist')); // перенос шрифтов в dist
});


// $ gulp sass  # запуск таска sass
// $ gulp scripts  # запуск таска scripts
