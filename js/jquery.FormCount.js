/*
2015-12-09
基于jquery的文本框/域字符数计算功能
用法：
1、html：不做任何改变，只需有一个id或是class
2、js根据id或class来控制
formcount('#area',100);
*/

//带字符数计算功能的文本域
function formcount(obj,count){
	//obj：需要计算的对象；count：最大字符数
	//初始化
	$(obj).wrap('<div class="form-count-wrap"></div>');
	$(obj).parent('.form-count-wrap').prepend('<p><span class="form-num">0</span>/<span class="form-count">'+count+'</span></p>');
	var $num=$(obj).parent('.form-count-wrap').find('.form-num');
	//计算字符
	$(obj).bind('focus keydown keyup',function(){
		var num=$(obj).val().length; 
		if(num>count){
			var moreCount=parseInt(num-count);
			$num.css('color','#f00').text('超过'+moreCount);
		}else{
			$num.removeAttr('style').text(num);
		};
	});
};