/*
2017-03-30
基于jquery的页面滚动导航定位
用法：
不受结构控制：需要生成导航的节点，增加class="fixed-menu-from"，导航文字取值data-text="导航1"
导航分级：若导航需要分级，增加data-tier属性，属性值“1、2、3”
*/

//初始化
var $menu='';
var $list='';
var itemIndex=0;
$('body').find('.fixed-menu-from').each(function(){
	itemIndex++;
	var itemId='scrollFixed-item'+itemIndex;
	$(this).attr('id',itemId)
	var off_top=parseInt($(this).offset().top);
	$list=$list+'<li class="fixed-menu-tier'+$(this).attr('data-tier')+'" data-scroll="'+off_top+'"><a href="#'+itemId+'"><i class="fa fa-circle"></i>'+$(this).attr('data-text')+'</a></li>';
});
$menu='<ul class="fixed-menu">'+$list+'</ul>';
$('body').append($menu);
$('body').find('.fixed-menu li:eq(0)').addClass('active');

//点击导航定位
$('body').on('click','.fixed-menu li',function(){
	$(this).addClass('active').siblings('li').removeClass('active');
	//$('html,body').animate({scrollTop:$(this).attr('data-scroll')},500);
});

//滚动导航切换
scrollFixed();
$(window).scroll(function(){
	scrollFixed();
});
function scrollFixed(){
	var $menu_li=$('.fixed-menu li');
	var sTop=$(this).scrollTop();
	var i=0;
	$menu_li.each(function(){
		var dataScroll=$(this).attr('data-scroll');
		if (sTop > dataScroll) {
			i++;
		};
	});
	if (i == 0) {
		i==0;
	} else{
		i--;
	};
	$menu_li.eq(i).addClass('active').siblings('li').removeClass('active');
	//判断是否滚动到底部
	var canTop=$(document).height()-$(window).height();
	if (sTop == canTop) {
		$menu_li.last().addClass('active').siblings('li').removeClass('active');
	}
};