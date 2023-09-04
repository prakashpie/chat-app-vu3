const { src, dest, task, watch } = require('gulp')
const sass = require('gulp-dart-sass')
const config = require('./gulp/config')

function css(done) {
  src(config.src.sass + '/*.scss')
    .pipe(
      sass({
        outputStyle: config.production ? 'compact' : 'expanded',
        precision: 5,
      })
    )
    .on('error', config.errorHandler)
    .pipe(dest(config.dest.css))
  done()
}

function watchFiles() {
  watch(config.src.sass + '/**/*.scss', css)
}

task('css', css)

task('watch', watchFiles)

task('default', css)
