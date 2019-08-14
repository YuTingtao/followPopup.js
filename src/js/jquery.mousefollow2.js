/*
 * mousefollow v1.0.0
 * author 735126858@qq.com
 * https://github.com/YuTingtao/mousefollow.js
 */
;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($){
    // 定义MouseFollow构造函数
    var mouseFollow = function(el, options) {
        this.el = el;
        this.defaults = {
            html: '',                // 插入的html
            speed: 200,              // 淡出速度
            x: 20,                   // 距离鼠标的水平距离
            y: 20,                   // 距离鼠标的垂直距离
            zIndex: 999,             // 插入html的层级   
            afterEnter: function($this) {}, // 鼠标进入回调
            onMove: function($this) {},     // 鼠标移动回调
            beforeOut: function($this) {}   // 鼠标移除回调
        };
        this.opt = $.extend({}, this.defaults, options);
        this.init();
    }

    // 定义MouseFollow的方法
    mouseFollow.prototype = {
        // 插入DOM
        appendDOM: function(){
            var _index = this.opt.zIndex;
            if ($('.js-mousefollow').length < 1) {
                $('body').append('<div class="js-mousefollow" style="display: none; position: fixed; top: 100%; z-index: '+_index+'"></div>');
            }
        },

        // 鼠标移入插入HTML
        mouseEnter: function(e) {
            var $this = this,
                _class = this.opt.className,
                _html = this.opt.html,
                _speed = this.opt.speed;
            $this.el.mouseenter(function() {
                $('.js-mousefollow').html(_html).fadeIn(_speed);
                $this.opt.afterEnter && $this.opt.afterEnter.call(this, e);
            });
        },

        // 鼠标移动改变位置
        mouseMove: function() {
            var $this = this,
                _class = this.opt.className,
                _html = this.opt.html,
                _speed = this.opt.speed,
                _x = this.opt.x,
                _y = this.opt.y;

            $this.el.mousemove(function(e) {
                e = e || window.e;
                var x = e.clientX;
                var y = e.clientY;
                setTimeout(function() {
                    if ( x + _x + $('.js-mousefollow').width() < $(window).width() ) {
                        $('.js-mousefollow').css({
                            left: x + _x,
                            right: 'auto'
                        });
                    } else {
                        $('.js-mousefollow').css({
                            left: 'auto',
                            right: $(window).width() - x + _x -10
                        });
                    }
                    if ( y + _y + $('.js-mousefollow').height() < $(window).height() ) {
                        $('.js-mousefollow').css({
                            top: y + _y,
                            bottom: 'auto'
                        });
                    } else {
                        $('.js-mousefollow').css({
                            top: 'auto',
                            bottom: $(window).height() - y + _y - 20
                        });
                    }
                }, 0);
                $this.opt.onMove && $this.opt.onMove.call(this, e);
            });
        },

        // 鼠标移出删除
        mouseOut: function(e) {
            var $this = this,
                _class = this.opt.className;
            $this.el.mouseleave(function(e) {
                $('.js-mousefollow').hide();
                $this.opt.beforeOut && $this.opt.beforeOut.call(this, e);
            });
        },

        // 初始化
        init: function() {
            this.appendDOM();
            this.mouseEnter();
            this.mouseMove();
            this.mouseOut();
        }
    }

    $.fn.mousefollow = function(opt) {
        // 创造MouseFollow实例
        var mousefollow = new mouseFollow(this, opt);
        // 调用其方法
        return mousefollow;
    }
}));