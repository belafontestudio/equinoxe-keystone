var BatchStream = require('batch-stream2')
var gulp = require('gulp')
var uglify = require('gulp-uglify')
var cssmin = require('gulp-minify-css')
var bower = require('main-bower-files')
var stylus = require('gulp-stylus')
var livereload = require('gulp-livereload')
var include = require('gulp-include')
var concat = require('gulp-concat')
var browserify = require('browserify');
var filter = require('gulp-filter')
var watch = require('gulp-watch')
var rename = require('gulp-rename')
var jeet = require('jeet');
var nib = require('nib');
var rupture = require('rupture');

var src = {
  styl: ['public/styles/application.styl'],
  print: ['public/styles/print.styl'],
  css: ['public/**/*.css'],
  js: ['public/js/*.js'],
  bower: ['bower.json', '.bowerrc']
}
src.styles = src.styl.concat(src.css)


var publishdir = 'public'
var dist = {
  all: [publishdir + '/**/*'],
  css: publishdir + '/static/',
  js: publishdir + '/static/',
  vendor: publishdir + '/static/'
}

//
// concat *.js to `vendor.js`
// and *.css to `vendor.css`
// rename fonts to `fonts/*.*`
//
gulp.task('bower', function() {
  const jsFilter = filter('**/*.js', {restore: true})
  const cssFilter = filter('**/*.css', {restore: true})
  return gulp.src(bower({
    paths: {
        bowerDirectory: './bower_components',
        bowerrc: './.bowerrc',
        bowerJson: './bower.json'
    }
}))
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dist.js))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(dist.css))
    .pipe(cssFilter.restore)
    .pipe(rename(function(path) {
      if (~path.dirname.indexOf('fonts')) {
        path.dirname = '/fonts'
      }
    }))
    .pipe(gulp.dest(dist.vendor))
})

function buildCSS() {
  return gulp.src(src.styl)
    .pipe(stylus({use: [jeet(),nib(), rupture()]}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(dist.css))
}

function printCSS() {
  return gulp.src(src.print)
    .pipe(stylus({use: [jeet(),nib()]}))
    .pipe(concat('print.css'))
    .pipe(gulp.dest(dist.css))
}

function buildJS() {
  return gulp.src(src.js)
    .pipe(include())

    .pipe(concat('app.js'))
    .pipe(gulp.dest(dist.js))
}

gulp.task('css', buildCSS)
gulp.task('print', printCSS)
gulp.task('js', buildJS)

// gulp.task('watch', function() {
//   gulp.watch(src.bower, ['bower'])
//   watch({ glob: src.styles, name: 'app.css' }, buildCSS)
//   watch({ glob: src.scripts, name: 'app.js' }, buildJS)
// })
// //
// // live reload can emit changes only when at lease one build is done
// //
// gulp.task('livereload', ['bower', 'css', 'js', 'watch'], function() {
//   var server = livereload()
//   var batch = new BatchStream({ timeout: 100 })
//   gulp.watch(dist.all).on('change', function change(file) {
//     // clear directories
//     var urlpath = file.path.replace(__dirname + '/' + publishdir, '')
//     // also clear the tailing index.html
//     urlpath = urlpath.replace('/index.html', '/')
//     batch.write(urlpath)
//   })
//   batch.on('data', function(files) {
//     server.changed(files.join(','))
//   })
// })
gulp.task('compress-css', ['css'], function() {
  return gulp.src(dist.css)
    .pipe(cssmin())
    .pipe(gulp.dest(dist.css))
})
gulp.task('compress-js', ['js'], function() {
  return gulp.src(dist.js)
    .pipe(uglify())
    .pipe(gulp.dest(dist.js))
})
gulp.task('compress', ['compress-css', 'compress-js'])

gulp.task('default', ['bower', 'css', 'js']) // development
gulp.task('build', ['bower', 'compress']) // build for production
