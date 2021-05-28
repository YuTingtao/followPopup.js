/*
 * followPopup v1.0.0
 * author 735126858@qq.com
 * https://github.com/YuTingtao/followPopup.js
 */
;(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory();
    } else {
        global.FollowPopup = factory();
    }
}(this, (function() {
    var defaults = {
        html: '',                // 插入的html
        x: 20,                   // 距离鼠标的水平距离
        y: 20,                   // 距离鼠标的垂直距离
        zIndex: 999,             // 插入html的层级
        throttleTime: 30,        // 节流时间间隔：鼠标移动时该段时间内只触发一次执行程序
        afterEnter: function(el, popup) {}, // 鼠标进入钩子 el:鼠标移入的对象，popup:弹出层对象
        onMove: function(el, popup) {},     // 鼠标移动钩子
        beforeOut: function(el, popup) {}   // 鼠标移除钩子
    }
    // 对象合并
    function extend(defaults, options) {
        for(var key in defaults){
            if(defaults.hasOwnProperty(key) && (!options.hasOwnProperty(key))){
                options[key] = defaults[key];
            }
        }
        return options;
    }
    // 构造函数
    function FollowPopup(el, options) {
        this.el = el;
        this.opt = extend(defaults, options);
        this.init();
    }

    // 初始化
    FollowPopup.prototype.init = function() {
        var $this = this,
            _el = this.el,
            _html = this.opt.html,
            _x = this.opt.x,
            _y = this.opt.y,
            _zIndex = this.opt.zIndex,
            _throttleTime = this.opt.throttleTime,
            _afterEnter = this.opt.afterEnter,
            _onMove = this.opt.onMove,
            _beforeOut = this.opt.beforeOut;
        // 插入DOM
        var _popup = document.getElementById('js-followPopup');
        if (!_popup) {
            _popup = document.createElement('div');
            _popup.id = 'js-followPopup';
            _popup.style.display = 'none';
            _popup.style.position = 'fixed';
            _popup.style.top = '100%';
            _popup.style.zIndex = _zIndex;
            document.body.appendChild(_popup);
        }
        // 鼠标移入
        _el.onmouseenter = function(e) {
            _popup.innerHTML = _html;
            _popup.style.display = 'block';
            // 进入之后钩子函数
            _afterEnter && _afterEnter.call(this, _el, _popup);
            var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var popupWidth = _popup.offsetWidth;
            var popupHeight = _popup.offsetHeight;
            // 鼠标移动
            _el.onmousemove = function(e) {
                e = e || window.event;
                var x = parseInt(e.clientX);
                var y = parseInt(e.clientY);
                var timeout = null;
                if (!timeout) {
                    setTimeout(function() {
                        if ( x + _x + popupWidth < winWidth ) {
                            _popup.style.left = x + _x + 'px';
                            _popup.style.right = 'auto';
                        } else {
                            _popup.style.left = 'auto';
                            _popup.style.right = winWidth - x + _x - 10 + 'px';
                        }
                        if ( y + _y + popupHeight < winWidth ) {
                            _popup.style.top = y + _y + 'px';
                            _popup.style.bottom = 'auto';
                        } else {
                            _popup.style.top = 'auto';
                            _popup.style.bottom = winWidth - y + _y - 20 + 'px';
                        }
                    }, _throttleTime);
                    timeout = null;
                }
                // 移动钩子函数
                _onMove && _onMove.call(this, _el, _popup);
            };
            // 鼠标移除
            _el.onmouseleave = function() {
                _popup.style.display = 'none';
                // 鼠标移出钩子函数
                _beforeOut && _beforeOut.call(this, _el, _popup);
            };
        };
    }

    return FollowPopup;
})));

// for jQuery
if(window.jQuery && window.FollowPopup){
    (function ($, FollowPopup) {
        if (!$ || !FollowPopup) {
            return;
        }
        $.fn.followPopup = function(options) {
            options = $.extend({}, options, {'$': $});
            this.each(function(index, el) {
                var instance = new FollowPopup(el, options);
            });
        };
    })(window.jQuery, window.FollowPopup);
}
