const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
// Во время разработки лучше не использовать, так как перезаписываются стили и всё едет
// Не работает sourceMaps так как следовало бы. Полезнее groupMedia в продакшене, когда всё сжимается и оптимизируется
// const groupMedia = require('gulp-group-css-media-queries');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const webpack = require('webpack-stream');

gulp.task('clean', function(done) {
    if(fs.existsSync('./dist/')) {
        return gulp.src('./dist/', { read: false }).pipe(clean());
    }
    done();
})


const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file',
}

// Функция возвращает настройку уведомлений об ошибках
const plumberNotify = (title) => ({
    errorHandler: notify.onError({
        title,
        message: 'Error <%= error.message %>', // вывод сообщения об ошибке. см документацию плагина
        sound: false //Если будет много ошибок, чтобы они не сыпались все
    })
})

gulp.task('html', function() {
    return gulp
        .src('./src/*.html')
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(sass())
        // .pipe(groupMedia())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('copyImg', function() {
    return gulp.src('./src/img/**/*').pipe(gulp.dest('./dist/img/'))
})

// Копирование наших шрифтов в папку dist
gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/fonts/'))
})

// Копирование доп файлов для пользователя в папку dis 
// (например пфки и какие-то документы, чтобы пользовотель их скачивал с сайта)
gulp.task('files', function() {
    return gulp.src('./src/files/**/*').pipe(gulp.dest('./dist/files/'))
})

gulp.task('js', function() {
    return gulp
        .src('./src/js/*.js')
        .pipe(plumber(plumberNotify('JS')))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js'))
});

const serverOption = {
    server: {
        baseDir: './dist/' // Папка, которую нужно обслуживать
    },
    open: true,          // Автоматически открывать браузер
    port: 8000,         // Порт для сервера
    ui: {
        port: 8080      // Порт для интерфейса управления
    }
};

gulp.task('server', function() {
    browserSync.init(serverOption);
})

// Говорим, чтобы gulp отслеживал все изменения в определенных файлах, папках и запускал таски на эти изменения.
gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('copyImg'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'));
    gulp.watch('./src/files/**/*', gulp.parallel('files'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'copyImg', 'fonts', 'files', 'js'),
    gulp.parallel('server', 'watch') 
));