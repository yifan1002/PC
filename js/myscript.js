//取消链接点击外部虚线框
$('a').attr('hideFocus','true');

//表格奇偶行背景色分隔、鼠标滑过变色效果
function interval(obj){
	$(obj).each(function(){
        var mod=$(this).index()%2;
		if(mod==1){$(this).addClass('even')};
    });
	$(obj).hover(function(){
		$(this).addClass('hover').siblings('tr').removeClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
};
interval('.ui-table-list tbody tr');

//tab选项卡
function tabcut(tab,model,even){
	if(even=='hover'){//鼠标滑过切换，其他全部为点击
		$(tab).hover(function(){
			$(this).addClass('current').siblings().removeClass('current');
			$(model).eq($(this).index()).show().siblings().hide();
		});
	}else{
		$(tab).click(function(e){
			e.preventDefault();
			$(this).addClass('current').siblings().removeClass('current');
			$(model).eq($(this).index()).show().siblings().hide();
		});
	};
};
tabcut('.ui-tab-list li','.ui-tab-wrap .ui-tab-module','hover');

//筛选信息
$('.ui-filter .item span').click(function(){
	var $inner=$(this).parents('.ui-filter-inner');
	if($inner.hasClass('ui-filter-checkbox')){
		if(!$(this).hasClass('current')){
			$(this).addClass('current');
		}else{
			$(this).removeClass('current');
		};
	}else{
		$(this).addClass('current').siblings('span').removeClass('current');
	};
});
//下拉筛选信息
$('.ui-droplist').hover(function(){
	$(this).addClass('active');
},function(){
	$(this).removeClass('active');
});
$('.ui-droplist ul li').click(function(e){
	e.preventDefault();
	$(this).parents('.ui-droplist').removeClass('active').find('.trigger .txt').text($(this).text());
});
	
//图片滑过透明度变化
$('.loadimg').hover(function(){
	$(this).animate({opacity:0.5});
},function(){
	$(this).animate({opacity:1});
});

//明文密码切换
$('.password-wrap i').click(function(){
	if(!$(this).hasClass('open')){
		$(this).addClass('open').siblings('input').attr('type','text');
	}else{
		$(this).removeClass('open').siblings('input').attr('type','password');
	};
});

//-----百度文件上传webuploader-----//
//删除
$('.webuploader-list .delete-btn').click(function(e){
	e.preventDefault();
	$(this).parents('li').remove();
});
//编辑
$('.webuploader-list .edti-btn').click(function(e){
	e.preventDefault();
	var val=$(this).parent('p').siblings('.file-name').text();
	$(this).hide().siblings('.fa-check').show().siblings('.per-txt').hide().parent('p').siblings('.file-name').hide().siblings('.file-name-edit').show().children('.input-txt').val(val);
});
//保存
$('.webuploader-list .save-btn').click(function(e){
	e.preventDefault();
	var val=$(this).parent('p').siblings('.file-name-edit').children('.input-txt').val();
	$(this).hide().siblings('.fa-edit').show().siblings('.per-txt').show().parent('p').siblings('.file-name-edit').hide().siblings('.file-name').show().text(val);
});
//-----百度文件上传webuploader-----//

//步骤导航
$('.js-prev,.js-next').click(function(e){
	e.preventDefault();
	var $item=$(this).parents('.step-item');
	var index=$item.index();
	$('.ui-step li').removeClass('current done');
	if ($(this).hasClass('js-prev')) {
		index--;
		$item.hide().prev('.step-item').show();
		$('.ui-step li:eq('+index+')').addClass('current');
		$('.ui-step li:lt('+index+')').addClass('done');
	} else{
		index++;
		$item.hide().next('.step-item').show();
		$('.ui-step li:eq('+index+')').addClass('current');
		$('.ui-step li:lt('+index+')').addClass('done');
	}
});

//placeholder：兼容IE password
$.getScript('js/jquery.PlaceHolder.js',function(){
	placeholder.init();
});
