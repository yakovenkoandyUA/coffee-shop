
import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('babelTest', async function () {
	return gulp
		.src('./client/*.js')
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(gulp.dest('dist/js'))
})


// task('build', series('babelTest'));