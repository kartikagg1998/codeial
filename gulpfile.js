const gulp=require('gulp');
// gulp.src(['./bower.json', './package.json'])
//   .pipe(install());

 const sass=require('gulp-sass');//gulpsass library converts sass ino css
 const cssnano=require('gulp-cssnano');//cssnano converts css into oneline
 const rev=require('gulp-rev');//rename the css file and add hash symbol with it

 

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

 })
