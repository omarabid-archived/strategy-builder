// TODO: cleanup dep and dev-dep in package.json
// TODO: make browsersync snippet only appear on dev, remove on deploy
// TODO: enable dev/prod modes
// TODO: use SaaS + pre-processor
// TODO: import bulma through modules
const { watch, series, parallel, src, dest } = require('gulp');
var clean_css = require('gulp-clean-css');
var post_css = require('gulp-postcss');
var concat = require('gulp-concat');
var minify_js = require('gulp-minify');
var rev = require('gulp-rev');
var rev_rewrite = require('gulp-rev-rewrite');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var browser_sync = require('browser-sync').create();
var argv = require('yargs').argv;
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var assemble = require('assemble');
var app = assemble();

function html(cb) {
    var manifest = src('build/rev-manifest.json',{allowEmpty: true});
    app.pages('src/html/*.html');
    app.partials('src/html/partials/*.html');

    app.toStream('pages')
        .pipe(app.renderFile())
        .pipe(rev_rewrite({manifest}))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(app.dest('build'));

    cb();
}

function css(cb) {
    del.sync(['build/*.css'], {force: true});

    return src(
        [
            'node_modules/bulma/css/bulma.min.css',
            'src/css/style.css'
        ]
    )
        .pipe(concat('style.min.css'))
        .pipe(clean_css())
        .pipe(rev())
        .pipe(dest('build'))
        .pipe(rev.manifest('build/rev-manifest.json', {
            base: 'build',
            merge:true
        }))
        .pipe(dest('build'));
}

function js(cb) {
    del.sync(['build/*.js'], {force: true});

    return src([
        'src/javascript/core.js'
    ])
        .pipe(webpackStream(webpackConfig), webpack)
    //.pipe(minify_js({noSource: true}))
    //.pipe(concat('javascript.min.js'))
        .pipe(rev())
        .pipe(dest('build'))
        .pipe(rev.manifest('build/rev-manifest.json', {
            base: 'build',
            merge:true
        }))
        .pipe(dest('build'));
}

function files(cb) {
    src(['src/images/**/*.*'])
        .pipe(dest('build/images/'));

    src(['src/fonts/**/*.*'])
        .pipe(dest('build/fonts/'));

    cb();
}

function wc() {
    console.info("== Watching Files ==");

    watch('src/html/**/*.*', html);
    watch('build/rev-manifest.json', html);
    watch('src/css/**/*.*', css, html);
    watch('src/javascript/**/*.*', js, html);
    watch(['src/images/**/*.*', 'src/fonts/**/*.*'], files);
}

function browser_reload(cb) {
    console.info("== Launching Browser Reload ==");

    browser_sync.init({
        server: "build",
        open: 'external',
        host: 'derivealpha.com',
        port: 80
    });

    watch('build/*.html').on('change', browser_sync.reload);

    cb();
}

function clean(cb) {
    return del(['build/*'], {force: true});
}

const defaultTask = series(
    browser_reload,
    wc
);

const regenerate = series(
    clean,
    css,
    js,
    files,
    html
);

defaultTask.description = "run the environment";

module.exports = {
    default: defaultTask,
    regenerate: regenerate,
    html,
    css,
    js,
    files,
    clean,
    wc,
    browser_reload,
};
