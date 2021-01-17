import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import ghPages from "gulp-gh-pages";

//JS
import bro from "gulp-bro";
import babelify from "babelify";

sass.compiler = require("node-sass");

//matching
const routes = {
  // pug: {
  //   watch: "views/**/*.pug",
  //   src: "views/*.pug",
  //   //최상단에서 모든 pug
  //   dest: "static",
  // },
  img: {
    src: "assets/img/*",
    dest: "static/img",
  },
  scss: {
    watch: "assets/scss/**/*.scss",
    src: "assets/scss/styles.scss",
    dest: "static/css/",
  },
  js: {
    watch: "assets/js/**/*.js",
    src: "assets/js/main.js",
    dest: "static/js",
  },
};

// Tasks

// const pug = () =>
//   gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));
// // src => pipe(pug) => dest
const clean = () => del(["static"]);

const webserver = () =>
  gulp.src("static").pipe(ws({ livereload: true, open: false, port: 8000 }));

const img = () =>
  gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const gh = () => gulp.src("static/**/*").pipe(ghPages());

const watch = () => {
  // gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([styles, js]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);
