/*
2015-12-09
基于jquery的幻灯片播放插件
用法：
1、html：ui-slideplay  ---->   .ui-slideplay>ul>li>a>img
2、js必须分开写
sideplay('#focuSlide1');
sideplay('#floorSlide2');
*/

function sideplay(obj,mode){
	//mode 展示效果，1-左右滑动；2-淡入淡出
	var sWidth = $(obj).width(); //获取焦点图的宽度（显示面积）
	var len = $(obj).find("ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮，以及页码
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div><span class='prevNext prev'></span><span><font class='num'>1</font>/"+len+"</span><span class='prevNext next'></span>";
	$(obj).append(btn);

	//以下代码添加标题
	var tit="<p class='tit'></p>";
	$(obj).append(tit);
	
	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$(obj).find(".btn span").mouseenter(function() {
		index = $(obj).find(".btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//上一页按钮
	//var hammertime = new Hammer(document.getElementById("focuSlide1"));	//移动端效果：创建一个新的hammer对象并且在初始化时指定要处理的dom元素
	$(obj).find(".prev").click(function() {	//PC端效果
	//hammertime.on("swiperight", function (e) {	//移动端效果：绑定事件-右滑动切换
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});

	//下一页按钮
	$(obj).find(".next").click(function() {	//PC端效果
	//hammertime.on("swipeleft", function (e) {	//移动端效果：绑定事件-左滑动切换
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$(obj).find("ul").css("width",sWidth * (len)).children("li").css("width",sWidth);
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$(obj).hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},5000); //此5000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		if(mode==1){
			//mode==1 切换方式：左右滑动
			$(obj).find("ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		}else{
			//mode==2 切换方式：淡入淡出
			$(obj).find("ul li").hide();
			$(obj).find("ul li:eq("+index+")").fadeIn(500);
		};
		$(obj).find(".btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$(obj).find(".num").text(index+1); //切换当前页码
		$(obj).find(".tit").text($(obj).find("ul li:eq("+index+")").attr("data-title"));	//为当前图片切换标题
	};
};