/*
 * mousefollow v0.1.0
 * author 735126858@qq.com
 * https://github.com/YuTingtao/mousefollow.js
 */
;(function($, window, document, undefined){
    // 定义MouseFollow构造函数
    var mouseFollow = function(el, options){
        this.el = el,
        this.defaults = {
            html: '',                // 插入的html
            speed: 200,              // 淡出速度
            x: 20,                   // 距离鼠标的水平距离
            y: 20,                   // 距离鼠标的垂直距离
            zIndex: 999,             // 插入html的层级   
            onEnter: function(e) {}, // 鼠标进入回调
            onMove: function(e) {},  // 鼠标移动回调
            onOut: function(e) {}    // 鼠标移除回调
        },
        this.opt = $.extend({}, this.defaults, options),
        this.init();
    }

    // 定义MouseFollow的方法
    mouseFollow.prototype = {
        // 插入DOM
        appendDOM: function(){
            var _index = this.opt.zIndex;
            if ($('.js-follow').length < 1) {
                $('body').append('<div class="js-follow" style="display: none; position: fixed; top: 100%; z-index: '+_index+'"></div>');
            }
        },

        // 鼠标移入插入HTML
        mouseEnter: function() {
            var $this = this,
                _class = this.opt.className,
                _html = this.opt.html,
                _speed = this.opt.speed;
            $this.el.mouseenter(function(e) {
                $('.js-follow').html(_html).fadeIn(_speed);
                $this.opt.onEnter && $this.opt.onEnter.call(this,e);
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

            $this.el.mousemove(function(event) {
                event = event || window.event;
                var x = event.clientX;
                var y = event.clientY;
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
                $this.opt.onMove && $this.opt.onMove.call(this,event);
            });
        },

        // 鼠标移出删除
        mouseOut: function() {
            var $this = this,
                _class = this.opt.className;
            $this.el.mouseleave(function(e) {
                $('.js-follow').hide();
                $this.opt.onOut && $this.opt.onOut.call(this,e);
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
})(jQuery, window, document);