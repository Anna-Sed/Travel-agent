const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const webpackConfig = require('./../webpack.config');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
// gulp-changed позволяет gulp обновляет только те файлы, кот. изменились 
const changed = require('gulp-changed');

gulp.task('clean:dev', function(done) {
    if(fs.existsSync('./build/')) {
        return gulp.src('./build/', { read: false }).pipe(clean());
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

gulp.task('html:dev', function() {
    return gulp
    // **/*.html - первый и второй уровень вложенности файлов
    // '!./src/html/blocks/*.html' - маска. Все html файлы из папки blocks включать не нужно. ! - отрицание.
        .src(['./src/html/**/*.html', '!./src/html/blocks/*.html']) 
        .pipe(changed('./build/', { hasChanged: changed.compareContents }))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(gulp.dest('./build/'))
});

gulp.task('sass:dev', function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(changed('./build/css/'))
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./build/css/'))
})

gulp.task('copyImg:dev', function() {
    return gulp
        .src('./src/img/**/*')
        .pipe(changed('./build/img/'))
        //verbose: true - это настройка, благодаря кот. при оптимизации мы увидем,
        // какие файлы оптимизированны и сколько место оптимизир.
        // .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./build/img/'))
})

// Копирование наших шрифтов в папку dist
gulp.task('fonts:dev', function() {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(changed('./build/fonts/'))
        .pipe(gulp.dest('./build/fonts/'))
})

// Копирование доп файлов для пользователя в папку dis 
// (например пфки и какие-то документы, чтобы пользовотель их скачивал с сайта)
gulp.task('files:dev', function() {
    return gulp
        .src('./src/files/**/*')
        .pipe(changed('./build/files/'))
        .pipe(gulp.dest('./build/files/'))
})

gulp.task('js:dev', function() {
    return gulp
        .src('./src/js/*.js')
        .pipe(changed('./build/js'))
        .pipe(plumber(plumberNotify('JS')))
        // .pipe(babel()) Нужен для старых браузеров
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./build/js'))
});

const serverOption = {
    server: {
        baseDir: './build/' // Папка, которую нужно обслуживать
    },
    open: true,          // Автоматически открывать браузер
    port: 8000,         // Порт для сервера
    ui: {
        port: 8080      // Порт для интерфейса управления
    }
};

gulp.task('server:dev', function() {
    browserSync.init(serverOption);
})

// Говорим, чтобы gulp отслеживал все изменения в определенных файлах, папках и запускал таски на эти изменения.
gulp.task('watch:dev', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
    gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('./src/img/**/*', gulp.parallel('copyImg:dev'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
    gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
})
