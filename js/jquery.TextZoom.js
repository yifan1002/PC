/*
2015-12-09
基于jquery的文字输入放大功能
用法：
1、html：不做任何改变，只需有一个id或是class
2、js根据id或class来控制，所有参数必填
textzoom('.ui-zoom-txt','top',4,'-');
*/

function textzoom(obj,position,splitType,connector){
	//obj：需要放大的对象；position：位置；splitType：分割长度；connector：连接符
	//动态修改html结构
	$(obj).parent().append('<span class="ui-zoom-wrap" style="display:inline-block;position:relative;"><span class="ui-zoom-layer" style="display:none;position:absolute;top:0;left:0;border:1px solid #ffa55c;background:#fefae1;height:28px;padding:0 5px;white-space:nowrap;font:100 18px/28px Microsoft YaHei;color:#ff7200;"></span></span>');
	var $wrap=$(obj).siblings('.ui-zoom-wrap');
	var $layer=$wrap.children('.ui-zoom-layer');
	$(obj).appendTo($wrap);
	//定位放大层
	if(position=='top'){
		var top='-'+parseInt($(obj).height()+10)+'px';
	}else{
		var top=parseInt($(obj).height()+5)+'px';
	};
	$layer.css('top',top);
	
	// 实时监听输入框值的变化
	$(obj).keyup(function(){
		$layer.css('display','inline-block').text(splitStr());
	});
	$(obj).focus(function(){
		var val=$(obj).val().length;
		if(val>0){
			$layer.css('display','inline-block').text(splitStr());
		};
	});
	
	//点击其他地方关闭放大层
	$(document).click(function(event){
		var eo=$(event.target);
		if($layer.is(":visible") && eo.attr("class")!="ui-zoom-txt" && !eo.parent(".ui-zoom-wrap").length)
		$layer.hide();  
	});
	
	//分割字符串方法
	function splitStr(){
		var txtStr=$(obj).val();
		var txtLen=txtStr.length;
		var txtMax=Math.ceil(txtLen/splitType);
		var splitTxt='';
		for(i=0;i<txtMax;i++){
			var splitStart=i*splitType;
			splitTxt=splitTxt+txtStr.substr(splitStart,splitType)+connector;
		};
		splitTxt=splitTxt.substring(0,splitTxt.length-1);
		return splitTxt;
	};
};