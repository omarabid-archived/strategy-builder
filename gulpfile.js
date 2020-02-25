// TODO: cleanup dep and dev-dep in package.json
// TODO: make browsersync snippet only appear on dev, remove on deploy
// TODO: enable dev/prod modes
// TODO: use SaaS + pre-processor
// TODO: import bulma through modules
// TODO: documentation
const { watch, series, parallel, src, dest } = require('gulp');
const clean_css = require('gulp-clean-css');
const post_css = require('gulp-postcss');
const concat = require('gulp-concat');
const minify_js = require('gulp-minify');
const rev = require('gulp-rev');
const rev_rewrite = require('gulp-rev-rewrite');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const browser_sync = require('browser-sync').create();
const argv = require('yargs').argv;
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const hostile = require('hostile');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const app = require('assemble')();

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
            'src/sass/style.scss'
        ]
    )
        .pipe(sass().on('error', sass.logError))
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
        'src/javascript/index.ts'
    ])
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(minify_js({noSource: true}))
        .pipe(concat('javascript.min.js'))
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
    watch('src/sass/**/*.*', css, html);
    watch('src/javascript/**/*.*', js, html);
    watch(['src/images/**/*.*', 'src/fonts/**/*.*'], files);
}

function set_hostname(cb) {
    hostile.set('127.0.0.1', 'frontroot.com', function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log('set /etc/hosts successfully!')
        }
    });

    cb();
}

function browser_reload(cb) {
    console.info("== Launching Browser Reload ==");

    browser_sync.init({
        server: "build",
        host: 'frontroot.com',
        port: 80
    });

    watch('build/*.html').on('change', browser_sync.reload);

    cb();
}

function clean(cb) {
    return del(['build/*'], {force: true});
}

const defaultTask = series(
    set_hostname,
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
