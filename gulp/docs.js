const gulp = require('gulp');

// HTML
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-html');

// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');

const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
// Во время разработки лучше не использовать, так как перезаписываются стили и всё едет
// Не работает sourceMaps так как следовало бы. Полезнее groupMedia в продакшене, когда всё сжимается и оптимизируется
const groupMedia = require('gulp-group-css-media-queries');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const webpackConfig = require('./../webpack.config');
const babel = require('gulp-babel');

// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// gulp-changed позволяет gulp обновляет только те файлы, кот. изменились 
const changed = require('gulp-changed');

gulp.task('clean:docs', function(done) {
    if(fs.existsSync('./docs/')) {
        return gulp.src('./docs/', { read: false }).pipe(clean());
    }
    done();
});


const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file',
}

// Функция возвращает настройку уведомлений об ошибках
const plumberNotify = (title) => {
    return {
        errorHandler: notify.onError({
            title,
            message: 'Error <%= error.message %>', // вывод сообщения об ошибке. см документацию плагина
            sound: false //Если будет много ошибок, чтобы они не сыпались все
        })
    }
};

gulp.task('html:docs', function() {
    return gulp
    // **/*.html - первый и второй уровень вложенности файлов
    // '!./src/html/blocks/*.html' - маска. Все html файлы из папки blocks включать не нужно. ! - отрицание.
        .src(['./src/html/**/*.html', '!./src/html/blocks/*.html']) 
        .pipe(changed('./docs/'))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(webpHTML())
        .pipe(htmlclean()) // Минификация html
        .pipe(gulp.dest('./docs/'))
});

// Работает, но есть ошибки
gulp.task('sass:docs', function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(changed('./docs/css/'))
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./docs/css/'))
        .pipe(webpCss())
        .pipe(groupMedia())
        .pipe(csso()) // Минификация scss
        .pipe(gulp.dest('./docs/css/'));
});

// Оригинал
// gulp.task('sass:docs', function() {
//     return gulp
//         .src('./src/scss/*.scss')
//         .pipe(changed('./docs/css/'))
//         .pipe(plumber(plumberNotify('SCSS')))
//         .pipe(sourceMaps.init())
//         .pipe(autoprefixer())
//         .pipe(sassGlob())
//         .pipe(webpCss())
//         .pipe(groupMedia()) // Запускать лучше перед sass, тогда исходные карты ломаться не будут.
//         .pipe(sass()).on('error', sass.logError)
//         .pipe(csso()) 
//         .pipe(sourceMaps.write())
//         .pipe(gulp.dest('./docs/css/'))
// })

gulp.task('copyImg:docs', function() {
    return gulp
        .src('./src/img/**/*')
        .pipe(changed('./docs/img/'))
        .pipe(webp())
        .pipe(gulp.dest('./docs/img/'))
        .pipe(gulp.src('./src/img/**/*'))
        .pipe(changed('./docs/img/'))
        //verbose: true - это настройка, благодаря кот. при оптимизации мы увидем,
        // какие файлы оптимизированны и сколько место оптимизир.
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./docs/img/'))
})

// Копирование наших шрифтов в папку dist
gulp.task('fonts:docs', function() {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(changed('./docs/fonts/'))
        .pipe(gulp.dest('./docs/fonts/'))
})

// Копирование доп файлов для пользователя в папку dis 
// (например пфки и какие-то документы, чтобы пользовотель их скачивал с сайта)
gulp.task('files:docs', function() {
    return gulp
        .src('./src/files/**/*')
        .pipe(changed('./docs/files/'))
        .pipe(gulp.dest('./docs/files/'))
})

gulp.task('js:docs', function() {
    return gulp
        .src('./src/js/*.js')
        .pipe(changed('./docs/js'))
        .pipe(plumber(plumberNotify('JS')))
        .pipe(babel())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./docs/js'))
});

const serverOption = {
    server: {
        baseDir: './docs/' // Папка, которую нужно обслуживать
    },
    open: true,          // Автоматически открывать браузер
    port: 8000,         // Порт для сервера
    ui: {
        port: 8080      // Порт для интерфейса управления
    }
};

gulp.task('server:docs', function() {
    browserSync.init(serverOption);
})
