'use strict';
const json = require('./package.json');
const version = JSON.parse(JSON.stringify(json.version));
import gulp from "gulp";
import gulpUtil from "gulp-util";
import replace from "gulp-replace";
import ftp from "vinyl-ftp";
import gulpWatch from 'gulp-watch';
import env from "gulp-env";
import autoprefixer from "gulp-autoprefixer";
import browserSync, { reload } from 'browser-sync';
import stylus from 'gulp-stylus';
import injectString from 'gulp-inject-string';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import cssmin from 'gulp-cssmin';
import postcssSalad from 'postcss-salad';
import changed  from 'gulp-changed';
const salad = postcssSalad(require('./salad.config.element-ui.json'));
import toolsDev from './build/dev-server'
import toolsBuild from './build/build'
let toolsWebsite = './';
gulp.task('plugin:element-ui', function () {
    return gulp.src(['node_modules/element-ui/packages/theme-default/src/**/*'])
        /*.pipe(rename(function (path) {
            path.basename = path.basename.replace('_','');
        }))*/
        .pipe(gulp.dest(toolsWebsite+'src/styles/elementUI/src/'))
});
gulp.task('dev:stylus', function () {
    return gulp.src([toolsWebsite+'src/styles/index.styl'])
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(rename("index.css"))
        .pipe(gulp.dest(toolsWebsite+'src/assets/styles/'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('dev:element-ui-css', function() {
    return gulp.src(toolsWebsite+'src/styles/elementUI/src/**/*.css')
        /*.pipe(changed(toolsWebsite+'src/styles/elementUI/dist/'))*/
        .pipe(postcss([salad]))
        .pipe(gulp.dest(toolsWebsite+'src/styles/elementUI/dist/'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('dev:element-ui-font', function() {
    return gulp.src(toolsWebsite+'src/styles/elementUI/src/fonts/**')
        .pipe(cssmin())
        .pipe(gulp.dest(toolsWebsite+'src/styles/elementUI/dist/fonts/'));
});
gulp.task('dev:index', function () {
    return  gulp.src(toolsWebsite+'tpl.html').
        pipe(injectString.before('</body>',
            `<script type="text/javascript" src="/vendor.js"></script><script type="text/javascript" src="/app.js"></script>\n`
        ))
        .pipe(rename("index.html"))
        .pipe(gulp.dest(toolsWebsite+''));
});
gulp.task("dev:serve",gulp.series('dev:stylus',"dev:index",'dev:element-ui-css','dev:element-ui-font',
    (done)=>{
        env.set({
            NODE_ENV: 'development'
        });
        browserSync(toolsDev().serveConfig);
        gulp.watch([toolsWebsite+'index.html']).on('change',reload);
        gulp.watch([toolsWebsite+'tpl.html'],gulp.parallel('dev:index'));
        gulpWatch([
            toolsWebsite+'src/styles/**/*.styl',
        ],{events:['add', 'change', 'unlink']},gulp.parallel("dev:stylus"));
        gulpWatch([
            toolsWebsite+'src/styles/elementUI/src/**/*.css',
        ],{events:['add', 'change', 'unlink']},gulp.parallel("dev:element-ui-css"));
        done();
    }
));

gulp.task('build:styles', function() {
    return gulp.src(toolsWebsite+'dist/styles/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(toolsWebsite+'dist/styles/'));
});
gulp.task("build",gulp.parallel("dev:stylus",'dev:element-ui-css',
    (done)=>{
        env.set({
            NODE_ENV: 'production'
        });
        toolsBuild();
        done();
    }
),'build:styles');
gulp.task("build:serve",()=>{
    browserSync({
        server: {
            baseDir: toolsWebsite+'dist/',
            routes: {
                "/node_modules": "node_modules"
            }
        }
    });
});