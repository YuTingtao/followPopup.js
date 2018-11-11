/*
 * mousefollow v1.0.0
 * author 1224100678@qq.com
 * https://github.com/YuTingtao/mousefollow.js
 */
;(function($, window, document, undefined){
	var methods = {
		init: function(options) {
			var defaults = {
				html: '',                // 插入的html
				speed: 200,              // 淡出速度
				x: 20,                   // 距离鼠标的水平距离
				y: 20,                   // 距离鼠标的垂直距离
				zIndex: 999,            // 插入html的层级   
				onEnter: function(e) {}, // 鼠标进入回调
				onMove: function(e) {},  // 鼠标移动回调
				onOut: function(e) {}    // 鼠标移除回调
			};
			var settings = $.extend({}, defaults, options);

			return this.each(function() {
				var $this = $(this);
				var _html = settings.html,
					_speed = settings.speed,
					_x = settings.x,
					_y = settings.y,
					_index = settings.zIndex,
					onEnter = settings.onEnter,
					onMove = settings.onMove,
					onOut = settings.onOut;
				// 插入DOM
				if ($('.js-follow').length < 1) {
					$('body').append('<div class="js-follow" style="position: fixed; top: 100%; display: none; z-index: '+_index+'"></div>');
				}

				// 鼠标移入插入HTML
				$this.on('mouseenter', function(e) {
					$('.js-follow').html(_html).fadeIn(_speed);
					onEnter && onEnter.call(this,e);
				});

				// 鼠标移动实时改变位置
				$this.on('mousemove', function(e) {
					e = e || window.e;
					var x = e.clientX;
					var y = e.clientY;
					var setCssX = function() {
						if ( x + _x + $('.js-follow').width() < $(window).width() ) {
							$('.js-follow').css({
								left: x + _x,
								right: 'auto'
							});
						} else {
							$('.js-follow').css({
								left: 'auto',
								right: $(window).width() - x + _x -10
							});
						}
					}
					var setCssY = function(){
						if ( y + _y + $('.js-follow').height() < $(window).height() ) {
							$('.js-follow').css({
								top: y + _y,
								bottom: 'auto'
							});
						} else {
							$('.js-follow').css({
								top: 'auto',
								bottom: $(window).height() - y + _y - 20
							});
						}
					}
					setCssX();
					setCssY();
					onMove && onMove.call(this,e);
				});

				// 鼠标移出隐藏DOM
				$this.on('mouseleave', function(e) {
					onOut && onOut.call(this,e);
					$('.js-follow').hide();
				});

			});
		},
		destroy: function() {
			return $(this).each(function() {
				var $this = $(this);
				$('.js-follow').remove();
				$this.off('mouseenter');
				$this.off('mousemove');
				$this.off('mouseleave');
			});
		}
	};

	$.fn.mousefollow = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('method ' + method + ' does not exist on jquery.mousemollow.js');
		}
	}
})(jQuery, window, document);