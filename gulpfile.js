const   gulp        = require('gulp')
        browserSync = require('browser-sync')
        sass        = require('gulp-sass');

//Compile Sass & inject to browser

gulp.task('sass', function () {
   return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
       .pipe(sass())
       .pipe(gulp.dest("src/css"))
       .pipe(browserSync.stream());
});


// Move JS file to src/js
gulp.task('script', function () {
   return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/popper.js/dist/umd/popper.min.js'])
       .pipe(gulp.dest("src/js"))
       .pipe(browserSync.stream());
});

// Watch Sass & server
gulp.task('serve', ['sass'], function () {
   browserSync.init({
       server: "./"
   });
   gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
   gulp.watch("./*.html").on('change', browserSync.reload);
});

// Move fonts folder to src
gulp.task('fa', function () {
   return gulp.src('node_modules/font-awesome/fonts/*')
       .pipe(gulp.dest("src/fonts"));
});

gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("src/css"));
});
gulp.task('default', ['script', 'serve', 'fa', 'fonts']);