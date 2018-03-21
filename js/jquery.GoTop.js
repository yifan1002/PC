/*
2015-12-09
基于jquery的回到顶部：滚动定位
用法：
1、html：ui-gotop  ---->   .ui-gotop>(a.btn-code+a.btn-help+a.btn-top)+.qr-code>(p>img)+p
*/

//回到顶部：滚动定位
var $btnTop=$('.ui-gotop .btn-top');
var $btnCode=$('.ui-gotop .btn-code');
var $qrCode=$('.ui-gotop .qr-code');
function GoTop(){
	var scTop=$(document).scrollTop();
	if(scTop>=500){
		$btnTop.fadeIn(500);
	}else{
		$btnTop.fadeOut(500);
	};
};
GoTop();
$(window).scroll(function(){
	GoTop();
});
//回到顶部
$btnTop.click(function(e){
	e.preventDefault();
	$('html,body').animate({scrollTop:0},500);
});
//二维码
$btnCode.hover(function(){
	$qrCode.show();
},function(){
	$qrCode.hide();
});