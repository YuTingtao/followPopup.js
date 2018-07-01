/*
 * mousefollow v0.1.0
 * author 1224100678@qq.com
 * https://github.com/YuTingtao/mousefollow.js
 */
;(function($, window, document, undefined){
	// 定义MouseFollow构造函数
	var mouseFollow = function(el, opt){
		var _ = this;
		_.el = el,
		_.defaults = {
			className: 'js-follow',  // 插入的div的class
			html: '',                // 插入的html
			speed: 200,              // 淡出速度
			x: 20,                   // 距离鼠标的水平距离
			y: 20                    // 距离鼠标的垂直距离
		},
		_.settings = $.extend({}, _.defaults, opt);
	}

	// 定义MouseFollow的方法
	mouseFollow.prototype = {
		// 初始化
		init: function() {
			var _ = this;
			_.addDOM();
			_.mouseEnter();
			_.mouseMove();
			_.mouseOut();
		},

		// 插入DOM
		addDOM: function(){
			var _ = this;
			if (!$('.'+_.settings.className).length) {
				$('body').append('<div class="'+_.settings.className+'" style="position: fixed; top: 100%; display: none;"></div>');
			}
		},

		// 鼠标移入插入HTML
		mouseEnter: function() {
			var _ = this;
			_.el.mouseenter(function() {
				$('.'+_.settings.className).html(_.settings.html).fadeIn(_.settings.speed);
			});
		},

		// 鼠标移动改变位置
		mouseMove: function() {
			var _ = this;
			var _class = _.settings.className,
				_html = _.settings.html,
				_speed = _.settings.speed,
				_x = _.settings.x,
				_y = _.settings.y;

			_.el.mousemove(function(event) {
				event = event || window.event;
				var x = event.clientX;
				var y = event.clientY;
				var setCssX = function() {
					if ( x + _x + $('.'+_class).width() < $(window).width() ) {
						$('.'+_class).css({
							left: x + _x,
							right: 'auto'
						});
					} else {
						$('.'+_class).css({
							left: 'auto',
							right: $(window).width() - x + _x -10
						});
					}
				}
				var setCssY = function(){
					if ( y + _y + $('.'+_class).height() < $(window).height() ) {
						$('.'+_class).css({
							top: y + _y,
							bottom: 'auto'
						});
					} else {
						$('.'+_class).css({
							top: 'auto',
							bottom: $(window).height() - y + _y - 20
						});
					}				
				}
				setCssX();
				setCssY();
			});
		},

		// 鼠标移出删除
		mouseOut: function() {
			var _ = this;
			_.el.mouseleave(function() {
				$('.'+_.settings.className).hide();
			});
		}
	}

	$.fn.mousefollow = function(option){
		// 创造MouseFollow实体
		var mousefollow = new mouseFollow(this, option);
		// 调用其方法
		return mousefollow.init();
	}
})(jQuery, window, document);