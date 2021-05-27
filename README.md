# mouseFollow.js
轻量级原生js插件，跟随鼠标移动的弹出层插件

```javascript
// 原生用法：
new FollowPopup(document.getElementById('demo1'), {
  html: '<div>隐藏的内容跟随鼠标一起动...</div>',
  afterEnter: function(el, popup) {
    console.log(el, popup);
  }
});
```
```javascript
// 使用jQuery：
$('.demo').followPopup({
  html: '<div>隐藏的内容跟随鼠标一起动...</div>',
  afterEnter: function(el, popup) {
    console.log(el, popup);
  }
})
```
