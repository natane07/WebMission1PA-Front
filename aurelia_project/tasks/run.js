import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback/lib';
import project from '../aurelia.json';
import { CLIOptions } from 'aurelia-cli';
import build from './build';
import watch from './watch';
import path from 'path';

const sslPath = path.join(project.platform.baseDir, '../aurelia_project/ssl');

let serve = gulp.series(
  build,
  done => {
    browserSync({
      online: true,
      open: 'external',
      port: CLIOptions.getFlagValue('port') || project.platform.port,
      host: project.platform.hostname,
      https: {
        key: path.join(sslPath, 'lvh.me.key'),
        cert: path.join(sslPath, 'lvh.me.crt')
      },
      browser: ['chrome'],
      //proxy: `https://${project.platform.hostname}:44443`,
      logLevel: 'silent',
      server: {
        baseDir: [project.platform.baseDir],
        middleware: [historyApiFallback(), (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }]
      }
    }, (err, cb) => {
      if (err) return done(err);
      let urls = cb.options.get('urls').toJS();
      log(`Application Available At: ${urls.external}`);
      log(`BrowserSync Available At: ${urls.ui}`);
      done();
    });
  }
);

function log(message) {
  console.log(message); //eslint-disable-line no-console
}

function reload() {
  log('Refreshing the browser');
  browserSync.reload();
}

let run = gulp.series(
  serve,
  done => { watch(reload); done(); }
);

export default run;
