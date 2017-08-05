var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
var songList;   //用来记录ajax请求回来的数据
var controlmanager;
var audioManager = new root.audioManager();
var processor = root.processor;
var playlist = root.playList;

//自定义一个函数(由于都用到了root.render这个函数，就把他提取出来了)
$scope.on("play-change", function (e, index, flag) {
	var curdata = songList[index];
	root.render(curdata);
	audioManager.setAudioSource(curdata.audio);
	if(audioManager.status === "play" || flag) { //调到下一首/上一首开始播放新歌曲
		audioManager.play();
		processor.start();
	}
	processor.render(curdata.duration);
})

//点击事件，上一曲和下一曲
$scope.on("click", ".prev-btn", function () {
	var index = controlmanager.prev();
	$scope.trigger("play-change", [index]); //接收  用数组，传参不用数组
})

$scope.on("click", ".next-btn", function () {
	var index = controlmanager.next();
	$scope.trigger("play-change", [index]);
})
 
//点击事件，播放/暂停
$scope.on("click", ".play-btn", function () {
	if(audioManager.status === "play") {
		processor.stop();
		audioManager.pause();
	}else {
		processor.start();
		audioManager.play();
	}
	//toggleClass,此函数是如果有playing这个class就删除，没有就添加
	$scope.find(".play-btn").toggleClass("playing");
})


//绑定进度条拖拽事件
function bindTouch() {
	var $slidePoint = $scope.find(".slide-point");
	var offset = $scope.find(".pro-wrapper").offset();
	var left = offset.left;
	var width = offset.width;
	$slidePoint.on("touchstart", function (e) {
		processor.stop();	//暂停进度条
	}).on("touchmove", function (e) {
		var x = e.changedTouches[0].clientX;	//获取进度条的初始位置
		var percentage = (x - left) / width;	//求进度条前进的百分比
		if(percentage > 1 || percentage < 0) {
			percentage = 0;
		}
		processor.updata(percentage);	//渲染进度条到当前拖拽到的位置
	}).on("touchend", function (e) {
		var x = e.changedTouches[0].clientX;
		var percentage = (x - left) / width;
		if(percentage > 1 || percentage < 0) {
			percentage = 0;
		}
		processor.start(percentage);	//进度条从拖拽之后的位置继续前进
		var curDuration = songList[controlmanager.index].duration; //获取当前歌曲总时间
		var duration = curDuration * percentage; //求歌曲已经播放了的时间
		audioManager.jumptoPlay(duration);	//让歌曲从拖拽的地方开始播放
		$scope.find(".play-btn").addClass("playing");
	})
}

//点击事件，播放列表
$scope.on("click", ".list-btn", function () {
	playlist.show(controlmanager);
})


//点击事件，喜欢按钮
$scope.find('.like-btn').on('click', function () {
	// $scope.find(this).toggleClass("liked");
	if( songList[controlmanager.index].isLike === false) {
		songList[controlmanager.index].isLike = true;
		$scope.find(this).addClass("liked");
	}else {
		songList[controlmanager.index].isLike = false;
		$scope.find(this).removeClass("liked");
	}
})


function getData(url) {
	$.ajax({
		url: url,
		type: 'GET',
		success: successedFn,
		error: function () {
			console.log("error");
		}
	});
}

//ajax回调函数
function successedFn(data) {
	bindTouch();
	songList = data;
	controlmanager = new root.controlManager(songList.length);
 	$scope.trigger("play-change", 0);
 	playlist.render(songList);
}

getData("/mock/data.json");