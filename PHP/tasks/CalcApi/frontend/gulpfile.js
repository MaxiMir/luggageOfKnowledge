const gulp = require('gulp');
const ts = require('gulp-typescript');
const minify = require('gulp-minify');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', () => {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest('./'));
});