import gulp from 'gulp';
import download from 'gulp-download';
import config from '../../wwwroot/config/config.json';
import rename from 'gulp-rename';

const oauth2 = config.authentication;

const url = `https://${oauth2.tenantName}.b2clogin.com/${oauth2.tenantName}.onmicrosoft.com/${oauth2.b2cPolicy}/discovery/v2.0/keys`;

export default function getKeys() {
  return download(url)
    .pipe(rename('keys.json'))
    .pipe(gulp.dest('wwwroot/config'));
}
