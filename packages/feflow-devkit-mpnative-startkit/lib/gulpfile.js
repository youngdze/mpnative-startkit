const path = require('path');
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const tap = require('gulp-tap');
const image = require('gulp-image');
const cache = require('gulp-cache');
const del = require('del');

const babelConfig = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};

const noop = function () {};
const IS_PROD = process.env.MODE === 'PROD';
const basePath = process.env.GULP_BASE_PATH || __dirname;
process.chdir(basePath);

const srcPath = 'src';
const distPath = 'dist';

const globs = {
  ts: `${srcPath}/**/*.ts`,
  js: `${srcPath}/**/*.js`,
  less: `${srcPath}/**/*.less`,
  image: `${srcPath}/**/*.{png,jpg,jpeg,gif,svg}`,
};
globs.copy = [
  `${srcPath}/**`,
  `!${globs.ts}`,
  `!${globs.js}`,
  `!${globs.less}`,
  `!${globs.image}`,
];

const getSrcOpt = () => ({
  base: path.resolve(basePath, srcPath),
  allowEmpty: true,
});

const resolvePath = (p) => path.resolve(basePath, p);

const clear = () => del(distPath);
const clearCache = () => cache.clearAll();

function lessCompile() {
  return src(globs.less, { ...getSrcOpt(), since: lastRun(lessCompile) })
    .pipe(less())
    .pipe(postcss([autoprefixer]))
    .pipe(rename((path) => (path.extname = '.wxss')))
    .pipe(dest(resolvePath(distPath)));
}

function tsCompile() {
  const tsProject = ts.createProject(resolvePath('tsconfig.json'));
  return src(globs.ts, { ...getSrcOpt(), since: lastRun(tsCompile) })
    .pipe(IS_PROD ? tap(noop) : sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(babel(babelConfig))
    .pipe(IS_PROD ? tap(noop) : sourcemaps.write())
    .pipe(dest(resolvePath(distPath)));
}

function jsCompile() {
  return src(globs.js, { ...getSrcOpt(), since: lastRun(jsCompile) })
    .pipe(IS_PROD ? tap(noop) : sourcemaps.init())
    .pipe(babel(babelConfig))
    .pipe(IS_PROD ? tap(noop) : sourcemaps.write())
    .pipe(dest(resolvePath(distPath)));
}

function imageCompile() {
  return src(globs.image, { ...getSrcOpt(), since: lastRun(imageCompile) })
    .pipe(cache(image()))
    .pipe(dest(resolvePath(distPath)));
}

function copy() {
  return src(globs.copy, { ...getSrcOpt(), since: lastRun(copy) })
    .pipe(dest(resolvePath(distPath)));
}

function watchFile() {
  const watchOpts = {
    cwd: basePath,
    events: ['add', 'change'],
  };
  watch(globs.less, watchOpts, series(lessCompile));
  watch(globs.ts, watchOpts, series(tsCompile));
  watch(globs.js, watchOpts, series(jsCompile));
  watch(globs.image, watchOpts, series(imageCompile));
  watch(globs.copy, watchOpts, series(copy));
}

exports.clean = parallel(clear, clearCache);
exports.default = exports.build = series(
  exports.clean,
  parallel(copy, lessCompile, tsCompile, jsCompile, imageCompile),
);
exports.watch = series(watchFile);
exports.dev = series(
  parallel(copy, lessCompile, tsCompile, jsCompile, imageCompile),
  watchFile,
);
