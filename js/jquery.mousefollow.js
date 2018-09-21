/*
 * mousefollow v0.1.0
 * author 1224100678@qq.com
 * https://github.com/YuTingtao/mousefollow.js
 */
;(function($, window, document, undefined){
    // 定义MouseFollow构造函数
    var mouseFollow = function(el, opt){
        this.el = el,
        this.defaults = {
            html: '',                // 插入的html
            speed: 200,              // 淡出速度
            x: 20,                   // 距离鼠标的水平距离
            y: 20,                   // 距离鼠标的垂直距离
            className: 'js-follow',  // 插入的div的class
            onEnter: function(e) {}, // 鼠标进入回调
            onMove: function(e) {},  // 鼠标移动回调
            onOut: function(e) {}    // 鼠标移除回调
        },
        this.vars = $.extend({}, this.defaults, opt),
        this.init();
    }

    // 定义MouseFollow的方法
    mouseFollow.prototype = {
        // 插入DOM
        appendDOM: function(){
            var _class = this.vars.className;
            if ($('.'+_class).length == 0) {
                $('body').append('<div class="'+_class+'" style="position: fixed; top: 100%; display: none;"></div>');
            }
        },

        // 鼠标移入插入HTML
        mouseEnter: function() {
            var $this = this,
                _class = this.vars.className,
                _html = this.vars.html,
                _speed = this.vars.speed;
            $this.el.mouseenter(function(e) {
                $('.'+_class).html(_html).fadeIn(_speed);
                $this.vars.onEnter && $this.vars.onEnter.call(this,e);
            });
        },

        // 鼠标移动改变位置
        mouseMove: function() {
            var $this = this,
                _class = this.vars.className,
                _html = this.vars.html,
                _speed = this.vars.speed,
                _x = this.vars.x,
                _y = this.vars.y;

            $this.el.mousemove(function(event) {
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
                $this.vars.onMove && $this.vars.onMove.call(this,event);
            });
        },

        // 鼠标移出删除
        mouseOut: function() {
            var $this = this,
                _class = this.vars.className;
            $this.el.mouseleave(function(e) {
                $('.'+_class).hide();
                $this.vars.onOut && $this.vars.onOut.call(this,e);
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

    $.fn.mousefollow = function(opt){
        // 创造MouseFollow实体
        var mousefollow = new mouseFollow(this, opt);
        // 调用其方法
        return mousefollow;
    }
})(jQuery, window, document);