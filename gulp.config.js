const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const { NAME, PROJECT_PATH, TARGET_DIR, SOURCE_DIR } = require('./config.js');


const FTL_PATH = path.resolve(PROJECT_PATH, TARGET_DIR, 'WEB-INF/ftl');


module.exports.clean = function () {
  return del([
    path.resolve(PROJECT_PATH, TARGET_DIR, SOURCE_DIR, '*'),
    path.resolve(FTL_PATH, 'rsrc/*'),
  ]);
};


module.exports.copy = function () {
  return gulp
    .src([
      path.resolve(PROJECT_PATH, SOURCE_DIR, '**/*'),
      '!' + path.resolve(PROJECT_PATH, SOURCE_DIR, 'src/**/*'),
    ])
    .pipe(gulp.dest(path.resolve(PROJECT_PATH, TARGET_DIR, 'rsrc')));
};


module.exports.replace = function () {
  const assetsMap = JSON.parse(fs.readFileSync(path.resolve(PROJECT_PATH, 'webpack-assets.json')));

  const REG = new RegExp('([0-9a-z]*)-stamp4hash\.(css|js)', 'ig');

  return gulp.src(path.resolve(FTL_PATH, '**/*.ftl'))
    .pipe(replace(REG, function (match, p1, p2) {
      return assetsMap[p1][p2];
    }))
    .pipe(gulp.dest(FTL_PATH));
};


module.exports.include = function () {
  return gulp.src(path.resolve(PROJECT_PATH, TARGET_DIR, 'rsrc/**/*'))
             .pipe(gulp.dest(path.resolve(FTL_PATH + '/rsrc')));
};


module.exports.rev = function () {
  const DIR = path.resolve(PROJECT_PATH, './src/main/java/cn/caijiajia/' + NAME + '/constant/');
  const FILE = path.resolve(DIR, './WebConstants.java');

  const TODAY = (new Date()).toISOString().replace(/-|(T.+$)/g, '');
  const GIT_HEAD = execSync('git rev-parse --short HEAD').toString().trim();
  const REV = TODAY + '-' + GIT_HEAD;

  return gulp
    .src(FILE)
    .pipe(replace('GENERATE_BY_JENKINS', REV))
    .pipe(gulp.dest(DIR));
};
