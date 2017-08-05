//管理进度条功能
(function ($, root) {
	$scope = $(document.body);
	var startTime;
	var curDuration;
	var frameId;
	var lastPercentage = 0;
	//把时间转换成分钟
	function formatTime(time) {
		time = Math.round(time);
		var minute = Math.floor(time / 60);
		var second = time - minute * 60;
		if(minute < 10) {
			minute = "0" + minute;
		}
		if(second < 10) {
			second = "0" + second;
		}
		return minute + ":" + second;
	}
	//渲染总时间
	function render(duration) {
		curDuration = duration;
		lastPercentage = 0;
		updata(0);
		var allTime = formatTime(duration);
		$scope.find(".all-time").text(allTime);
	}
	//渲染进度条
	function setProcessor(percentage) {
		var percent = (percentage - 1) * 100 + "%";
		$scope.find(".pro-top").css({
			transform: "translateX(" + percent + ")"
		})
	}
	//渲染当前时间和进度条(执行函数)
	function updata(percentage) {
		var curTime = formatTime(percentage * curDuration);
		$scope.find(".cur-time").text(curTime);
		setProcessor(percentage);
	}
	//渲染当前时间和进度条(开始函数)
	function start(percent) {
		if(percent === undefined) {
			lastPercentage = lastPercentage;
		}else {
			lastPercentage = percent; 
		}
		cancelAnimationFrame(frameId);
		startTime = new Date().getTime();
		function frame() {
			var curTime = new Date().getTime();
			var percentage = lastPercentage + (curTime - startTime) / (curDuration * 1000);
			if(percentage < 1) {
				updata(percentage);
				frameId = requestAnimationFrame(frame); //获取进度条的百分比
			}else {
				cancelAnimationFrame(frameId);
			}
		} 
		frame();
	}
	//停止进度条
	function stop() {
		var curTime = new Date().getTime();
		lastPercentage = lastPercentage + (curTime - startTime) / (curDuration * 1000);
		cancelAnimationFrame(frameId);
	}


	root.processor = {
		render: render,
		start: start,
		stop: stop,
		updata: updata
	};
}(window.Zepto, window.player || (window.player = {})))