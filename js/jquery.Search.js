/*
2015-12-09
基于jquery的搜索功能
*/

//搜索框
$('.ui-search .input-txt').bind('focus keyup',function(e){
	var max_len=5;	//最多显示5行出滚动条
	var $txt=$('.ui-search .input-txt');
	var $list=$('.ui-search-list');
	var $ul=$list.children('ul');
	var $li=$ul.children('li');
	var ul_height=$ul.height();
	var li_height=$li.height();
	$ul.css('max-height',li_height*max_len);
	//输入显示隐藏
	if($txt.val().length){
		$list.show();
	}else{
		$list.hide();
	};
	//点击选中
	$ul.children('li').click(function(){
		var val=$(this).text();
		$(this).addClass('current').siblings('li').removeClass('current');
		$list.hide();
		$txt.val(val);
	});
	//键盘上下、回车
	var index=parseInt($ul.children('li.current').index());
	var len=$ul.children('li').length-1;
	if(e.keyCode == 38){//上
		$li.removeClass('current');
		if(index<=0){
			$ul.children('li:last').addClass('current');
		}else{
			index=index-1;
			$ul.children('li:eq('+index+')').addClass('current');
		};
	}else if(e.keyCode == 40){//下
		$li.removeClass('current');
		if(index==-1 || index==len){
			$ul.children('li:first').addClass('current');
		}else{
			index=index+1;
			$ul.children('li:eq('+index+')').addClass('current');
		};
	}else if(e.keyCode == 13){//回车选中
		var val=$ul.children('li.current').text();
		$list.hide();
		$txt.val(val).trigger('blur');
	}else{
		//$li.removeClass('current');
	};
	//键盘上下滚动条
	if(e.keyCode == 38 || e.keyCode == 40){
		var cur_index=$ul.children('li.current').index()+1;
		if(cur_index>max_len){
			ul_sTop=li_height*(cur_index-max_len);
		}else{
			ul_sTop=0;
		};
		$ul.attr({'a':ul_sTop});
		$ul.scrollTop(ul_sTop);
	};
	//关闭
	$(document).click(function(event){
		var eo=$(event.target);
		if($list.is(':visible') && !eo.parents('.ui-search').length){
			$list.hide();
		};
	});
});