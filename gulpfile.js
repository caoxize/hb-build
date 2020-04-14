const gulp = require('gulp');
const {
  clean,
  copy,
  include,
  replace,
  rev,
} = require('hb-build/gulp.config.js');
const path = require('path');
// const config = require('@lattebank/build/config');
// const gulpUpload = require('@lattebank/build/upload/gulp-upload');

gulp.task('_clean', clean);

gulp.task('_copy', copy);

gulp.task('_include', include);

gulp.task('_replace', replace);

gulp.task('_rev', rev);

// gulp.task('_upload:vjs', function () {
//   const APP_ENV = process.env.APP_ENV || 'prod';
//   const srcPath = path.resolve(config.PROJECT_PATH, config.SOURCE_DIR, 'js');
//   const cdnprefix = 'web/common';
//   return gulp.src([
//     srcPath + '/**/*.js'
//   ]).pipe(gulpUpload({
//     env: APP_ENV,
//     prefix: cdnprefix
//   }));
// });

gulp.task('default', function (done) {
  console.log(
    '[!]    前端开发规范-新手上路    http://cf.caijj.net:8090/pages/viewpage.action?pageId=1541776'
  );
  done();
});
