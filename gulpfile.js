const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default; // this is used to minified to javascript
const imagemin = require('gulp-imagemin');   
const del = require('del');

gulp.task('css',function(done){
    console.log('minifiying css...');
    gulp.src('./assets/sass/**/*.css')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));
    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})
// for miniging javascript file
gulp.task('js',function(done){
    console.log('minifing js file ...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});
// minifing image statc file
gulp.task('images',function(done){
    console.log('compressing image file...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});
// empty the public/assets directory
// whenever we are building the project we need to create from scratch..
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});
