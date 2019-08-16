# mousefollow.js

#默认参数：

	html: '',                // 插入的html
	speed: 200,              // 淡出速度
	x: 20,                   // 距离鼠标的水平距离
	y: 20,                   // 距离鼠标的垂直距离
	zIndex: 999,             // 插入html的层级
	afterEnter: function($this) {}, // 鼠标进入回调
	onMove: function($this) {},  // 鼠标移动回调
	beforeOut: function($this) {}    // 鼠标移除回调

#demo：
![image](https://github.com/YuTingtao/mousefollow.js/blob/master/dist/images/eg-1.gif)

html：

	<ul class="demo-1">
		<li data-imgurl="images/1.jpg"><a href="#"></a></li>
		<li data-imgurl="images/2.jpg"><a href="#"></a></li>
		<li data-imgurl="images/1.jpg"><a href="#"></a></li>
		<li data-imgurl="images/2.jpg"><a href="#"></a></li>
		<li data-imgurl="images/1.jpg"><a href="#"></a></li>
		<li data-imgurl="images/2.jpg"><a href="#"></a></li>
		<li data-imgurl="images/1.jpg"><a href="#"></a></li>
		<li data-imgurl="images/2.jpg"><a href="#"></a></li>
		<li data-imgurl="images/1.jpg"><a href="#"></a></li>
		<li data-imgurl="images/2.jpg"><a href="#"></a></li>
	</ul>
  
	<ul class="demo-2">
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
	</ul>
  
  js：
  
	<script src="js/jquery-1.8.3.min.js"></script>
	<script src="js/jquery.mousefollow.js"></script>
	<script tpye="text/javascript">
    	$(function(){
		    $('.demo-1 li').mousefollow({
                html: '<img src="" alt="">',
                zIndex: 10,
                afterEnter: function($this, index) {
                    console.log($this, index);
                    var url = $this.data('imgurl');
                    $('.js-mousefollow').find('img').attr('src', url);
                },
                onMove: function($this, index) {
                    // console.log($this, index);
                },
                beforeOut: function($this, index) {
                    // console.log($this, index);
                }
            });
        
            $('.demo-2 li').mousefollow({
                html: '<div class="hidden-box"><img src="images/2.jpg" alt=""><p>图片1</p></div>',
                speed: 300,
                zIndex: 100
            });
	    });
	</script>

