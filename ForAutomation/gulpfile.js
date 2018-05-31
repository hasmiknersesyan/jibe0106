global.$ = require('gulp-load-plugins')({
  pattern: [
    '*',
    '!jscs'
  ],
  replaceString: /^gulp(-|\.)(protractor)/
});

global.gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var webdriverUpdate = require('gulp-protractor').webdriver_update_specific;

gulp.task('webdriver-update', webdriverUpdate);

gulp.task('protractor', function () {
  var suite = '';
  var browserName = 'chrome';

  if ($.yargs.argv.suite) {
    suite = $.yargs.argv.suite;
  }
  if ($.yargs.argv.browserName) {
    browserName = $.yargs.argv.browserName;
  }
  return gulp.src(['../*.js'])
    .pipe(protractor({
      configFile: './config/protractor.conf.js',
      args: [
        '--suite', suite,
        '--browser', browserName
      ]
    }))
    .on('error', function (e) {
      throw e;
    });
});

gulp.task('e2e', function () {
  $.runSequence(['webdriver-update', 'protractor']);
});
