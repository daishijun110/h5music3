var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less");

//转移index.html文件到dist文件夹中
gulp.task("html", function () {
	gulp.src("./src/index.html")  
		.pipe(gulp.dest("./dist"))	
		.pipe(connect.reload());  
})


//监听src文件夹中index.html中的变化，一旦有变化就会触发html这个任务
gulp.task("watch", function () {
	gulp.watch("./src/index.html", ["html"]);
	gulp.watch("./src/css/*.less", ["less"]);
	gulp.watch("./src/js/*.js", ["js"]);
})



//开启服务器
gulp.task("server", function () {
	connect.server({
		port: 8080,	
		livereload: true 
	})
})



//转换less到css
gulp.task("less", function () {
	gulp.src("./src/css/*.less")
		.pipe(less())
		.pipe(gulp.dest("./dist/css"))
		.pipe(connect.reload());
})




//转移js
gulp.task("js", function () {
	gulp.src("./src/js/*.js")
		.pipe(gulp.dest("./dist/js"))
		.pipe(connect.reload());
})


gulp.task("default", ["html", "less", "js", "watch", "server"], function () {
	//default任务代码
});