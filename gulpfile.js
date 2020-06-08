const gulp=require('gulp');
// gulp.src(['./bower.json', './package.json'])
//   .pipe(install());

 const sass=require('gulp-sass');//gulpsass library converts sass ino css
 const cssnano=require('gulp-cssnano');//cssnano converts css into oneline
 const rev=require('gulp-rev');//rename the css file and add hash symbol with it
 const uglify = require('gulp-uglify-es').default;//for js
 const imagemin = require('gulp-imagemin');//for images
 const del = require('del');


 

 gulp.task('css',function(done)
 { //minification

     console.log('minifying css..');
     gulp.src('./assets/sass/**/*.scss')//**,* means any folder or subfolder
     .pipe(sass())
     .pipe(cssnano())
     .pipe(gulp.dest('./assets.css'));

     //rename files
     return gulp.src('./assets/**/*.css')
      .pipe(rev())
      .pipe(gulp.dest('./public/assets'))
      .pipe(rev.manifest({ //manifest add hash code with original file name
        
             cwd:'public',
             merge:true
         }))
      .pipe(gulp.dest('./public/assets'));
      done();  //gulp css command create problem so changr again path in env naraiable remove public

 });

 gulp.task('js', function(done){
  console.log('minifying js...');
   gulp.src('./assets/**/*.js')
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
  done()
});

gulp.task('images', function(done){
  console.log('compressing images...');
  gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
  .pipe(imagemin())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
  done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
  del.sync('./public/assets');
  done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
  console.log('Building assets');
  done();
});