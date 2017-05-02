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
import toolsDev from './build/dev-server'
import toolsBuild from './build/build'
let toolsWebsite = './';
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
gulp.task('dev:index', function () {
    return  gulp.src(toolsWebsite+'tpl.html').
        pipe(injectString.before('</body>',
            `<script type="text/javascript" src="/vendor.js"></script><script type="text/javascript" src="/app.js"></script>\n`
        ))
        .pipe(rename("index.html"))
        .pipe(gulp.dest(toolsWebsite+''));
});
gulp.task("dev:serve",gulp.series('dev:stylus',"dev:index",
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
        done();
    }
));

gulp.task("build",gulp.parallel("dev:stylus",
    (done)=>{
        env.set({
            NODE_ENV: 'production'
        });
        toolsBuild();
        done();
    }
));
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