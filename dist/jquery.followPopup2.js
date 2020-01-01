/*
 * followPopup v1.0.0
 * author 735126858@qq.com
 * https://github.com/YuTingtao/followPopup.js
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
    // 构造函数
    var FollowPopup = function(el, options) {
        this.el = el;
        this.defaults = {
            html: '',                // 插入的html
            fade: false,             // 是否淡入淡出:可传入int类型
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

    // 定义followPopup的方法
    FollowPopup.prototype = {
        // 插入DOM
        appendDOM: function(){
            var _index = this.opt.zIndex;
            if ($('.js-followPopup').length < 1) {
                $('body').append('<div class="js-followPopup" style="display: none; position: fixed; top: 100%; z-index: '+_index+'"></div>');
            }
        },

        // 鼠标移入插入HTML
        mouseEnter: function() {
            var $this = this,
                _html = this.opt.html,
                _fade = this.opt.fade;
            $this.el.mouseenter(function() {
                $('.js-followPopup').html(_html);
                if (_fade) {
                    $('.js-followPopup').fadeIn(_fade);
                } else {
                    $('.js-followPopup').show();
                }
                $this.opt.afterEnter && $this.opt.afterEnter.call(this, $this.el);
            });
        },

        // 鼠标移动改变位置
        mouseMove: function() {
            var $this = this,
                _html = this.opt.html,
                _speed = this.opt.speed,
                _x = this.opt.x,
                _y = this.opt.y;

            $this.el.mousemove(function(e) {
                e = e || window.e;
                var x = e.clientX;
                var y = e.clientY;
                setTimeout(function() {
                    if ( x + _x + $('.js-followPopup').width() < $(window).width() ) {
                        $('.js-followPopup').css({
                            left: x + _x,
                            right: 'auto'
                        });
                    } else {
                        $('.js-followPopup').css({
                            left: 'auto',
                            right: $(window).width() - x + _x -10
                        });
                    }
                    if ( y + _y + $('.js-followPopup').height() < $(window).height() ) {
                        $('.js-followPopup').css({
                            top: y + _y,
                            bottom: 'auto'
                        });
                    } else {
                        $('.js-followPopup').css({
                            top: 'auto',
                            bottom: $(window).height() - y + _y - 20
                        });
                    }
                }, 0);
                $this.opt.onMove && $this.opt.onMove.call(this, $this.el);
            });
        },

        // 鼠标移出删除
        mouseOut: function(e) {
            var $this = this;
            $this.el.mouseleave(function(e) {
                $('.js-followPopup').hide();
                $this.opt.beforeOut && $this.opt.beforeOut.call(this, $this.el);
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

    $.fn.followPopup = function(opt) {
        // 创造followPopup实例
        this.each(function() {
            var $this = $(this);
            var followPopup = new FollowPopup($this, opt);
            // 调用其方法
            return followPopup;
        });
    }
}));