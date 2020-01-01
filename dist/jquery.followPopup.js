/*
 * jquery.followPopup v1.0.0
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
    var methods = {
        init: function(options) {
            var defaults = {
                html: '',    // 插入的html
                fade: false, // 是否淡入淡出:可传入int类型
                x: 20,       // 距离鼠标的水平距离
                y: 20,       // 距离鼠标的垂直距离
                zIndex: 999, // 插入html的层级
                afterEnter: function($this) {}, // 鼠标进入回调
                onMove: function($this) {},     // 鼠标移动回调
                beforeOut: function($this) {}   // 鼠标移除回调
            };
            var opt = $.extend({}, defaults, options);

            return this.each(function() {
                var $this = $(this);
                var _html = opt.html,
                    _fade = opt.fade,
                    _x = opt.x,
                    _y = opt.y,
                    _index = opt.zIndex,
                    afterEnter = opt.afterEnter,
                    onMove = opt.onMove,
                    beforeOut = opt.beforeOut;
                // 插入DOM
                if ($('.js-followPopup').length < 1) {
                    $('body').append('<div class="js-followPopup" style="display: none; position: fixed; top: 100%; z-index: ' + _index + '"></div>');
                }

                // 鼠标移入插入HTML
                $this.on('mouseenter', function() {
                    $('.js-followPopup').html(_html);
                    if (_fade) {
                        $('.js-followPopup').fadeIn(_fade);
                    } else {
                        $('.js-followPopup').show();
                    }
                    afterEnter && afterEnter.call(this, $this);
                });

                // 鼠标移动实时改变位置
                $this.on('mousemove', function(e) {
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
                    onMove && onMove.call(this, $this);
                });

                // 鼠标移出隐藏DOM
                $this.on('mouseleave', function() {
                    beforeOut && beforeOut.call(this, $this);
                    $('.js-followPopup').hide();
                });

            });
        },
        destroy: function() {
            return $(this).each(function() {
                var $this = $(this);
                $('.js-followPopup').remove();
                $this.off('mouseenter mousemove mouseleave');
            });
        }
    };

	$.fn.followPopup = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('method ' + method + ' does not exist on jquery.followPopup.js');
        }
    }
}));