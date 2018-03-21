/*
2015-12-09
基于jquery的鼠标滑进、滑出、点击title模拟提示效果
用法：
1、html：不做任何改变，只需有一个id或是class
2、js根据id或class来控制，所有参数必填
mouseTips('click','#mouseTips1','内容1',100,0);
mouseTips('hover','#mouseTips1','内容2',-100,0);
*/

function mouseTips(e,obj,txt,top,left){
	//e：事件；obj：需要转换的对象；top和left：上左定位，支持负值
	//初始化
	var top=top+'px';
	var left=left+'px';
	$(obj).addClass('ui-mouse').css('position','relative');
	$(obj).append('<span class="ui-mouse-tips" style="display:none;position:absolute;top:'+top+';left:'+left+';z-index:999;width:280px;max-height:120px;line-height:24px;padding:5px 10px;background:#f3f3f3;border:1px solid #dedede;color:#444;overflow-x:hidden;overflow-y:auto;">'+txt+'</span>');
	//事件绑定
	if(e=='click'){
		$(obj).click(function(){
			$('.ui-mouse-tips').hide();
			$(this).children('.ui-mouse-tips').show();
			//关闭提示层
			$(document).click(function(event){
				var eo=$(event.target);
				if($('.ui-mouse-tips').is(':visible') && eo.attr('class')!='ui-mouse' && !eo.parent('.ui-mouse').length){
					$('.ui-mouse-tips').hide();
				};
			});
		});
	}else{
		$(obj).hover(function(){
			$('.ui-mouse-tips').hide();
			$(this).children('.ui-mouse-tips').show();
		},function(){
			$(this).children('.ui-mouse-tips').hide();
		});
	};
};