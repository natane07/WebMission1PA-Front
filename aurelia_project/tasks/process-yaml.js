import path from 'path';
import gulp from 'gulp';
import project from '../aurelia.json';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import yaml from 'gulp-yaml';

const destinationPath = path.join(project.platform.baseDir, 'locales/');

export default function processYaml() {
  return gulp
    .src(project.yamlProcessor.source, { base: 'src/locales/', sourcemaps: false, since: gulp.lastRun(processYaml) })
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(yaml())
    .pipe(gulp.dest(destinationPath));
}
