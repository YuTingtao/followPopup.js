/*
 * jquery.mousefollow v1.0.0
 * author 735126858@qq.com
 * https://github.com/YuTingtao/mousefollow.js
 */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($){
    var methods = {
        init: function(options) {
            var defaults = {
                html: '', // 插入的html
                speed: 200, // 淡出速度
                x: 20, // 距离鼠标的水平距离
                y: 20, // 距离鼠标的垂直距离
                zIndex: 999, // 插入html的层级
                onEnter: function(e) {}, // 鼠标进入回调
                onMove: function(e) {}, // 鼠标移动回调
                onOut: function(e) {} // 鼠标移除回调
            };
            var opt = $.extend({}, defaults, options);

            return this.each(function() {
                var $this = $(this);
                var _html = opt.html,
                    _speed = opt.speed,
                    _x = opt.x,
                    _y = opt.y,
                    _index = opt.zIndex,
                    onEnter = opt.onEnter,
                    onMove = opt.onMove,
                    onOut = opt.onOut;
                // 插入DOM
                if ($('.js-mousefollow').length < 1) {
                    $('body').append('<div class="js-mousefollow" style="display: none; position: fixed; top: 100%; z-index: ' + _index + '"></div>');
                }

                // 鼠标移入插入HTML
                $this.on('mouseenter', function(e) {
                    $('.js-mousefollow').html(_html).fadeIn(_speed);
                    onEnter && onEnter.call(this, e);
                });

                // 鼠标移动实时改变位置
                $this.on('mousemove', function(e) {
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
                    onMove && onMove.call(this, e);
                });

                // 鼠标移出隐藏DOM
                $this.on('mouseleave', function(e) {
                    onOut && onOut.call(this, e);
                    $('.js-mousefollow').hide();
                });

            });
        },
        destroy: function() {
            return $(this).each(function() {
                var $this = $(this);
                $('.js-mousefollow').remove();
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
}));