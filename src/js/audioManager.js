//管理歌曲模块
(function ($, root) {
	$scope = $(document.body);
	function audioManager() {
		this.audio = new Audio();
		this.status = "pause";
		this.bindEvent();
	}
	audioManager.prototype = {
		//绑定事件
		bindEvent: function () {
			$(this.audio).on("ended", function () { //audio的ended事件，当歌曲结束时会触发
				$scope.find('.next-btn').trigger('click');
			})
		},
		//歌曲播放功能
		play: function () {
			this.audio.play();
			this.status = "play";
		},
		//歌曲暂停功能
		pause: function () {
			this.audio.pause();
			this.status = "pause";
		},
		//切换歌曲音频路径
		setAudioSource: function (src) {
			this.audio.src = src;
			this.audio.load();
		},
		//跳转到进度条拖拽的位置播放
		jumptoPlay: function (duration) {
			this.audio.currentTime = duration;	//currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）
			this.play();
		}
	}
	root.audioManager = audioManager;
}(window.Zepto, window.player || (window.player = {}))) 