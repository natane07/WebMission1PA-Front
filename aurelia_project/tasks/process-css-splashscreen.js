import gulp from 'gulp';
import path from 'path';
import changedInPlace from 'gulp-changed-in-place';
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import project from '../aurelia.json';

const sourcePath = path.join(project.platform.baseDir, '../src/splash-screen/splash-screen.less');
const destinationPath = path.join(project.platform.baseDir, '../src/splash-screen/');

export default function processCSSSplashscreen() {
  return gulp.src(sourcePath, {base: 'src/splash-screen/'})
    .pipe(changedInPlace({firstPass: true}))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(less())
    .pipe(gulp.dest(destinationPath));
}
