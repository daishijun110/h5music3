//管理index索引
(function ($, root) {
	function controlManager(length) {
		this.index = 0;
		this.length = length;
	}
	controlManager.prototype = {
		//下一首
		next: function () {
			return this.getIndex(1);
		},
		//上一首
		prev: function () {
			return this.getIndex(-1);
		},
		//处理歌曲边界问题
		getIndex: function (val) {
			var index = this.index;
			var len = this.length;
			//用一个算法，实现从第一首到最后一首和从最后一首到第一首
			var curIndex = (index + len + val) % len;
			this.index = curIndex;
			return curIndex;
		}
	}
	root.controlManager = controlManager;
}(window.Zepto, window.player || (window.player = {})))