/*
2015-12-09
基于jquery的倒计时插件
用法：
1、html：不做任何改变，只需有一个id或是class
2、js根据id或class来控制
countdown('#countdown1','2016/08/20 16:01:00');
*/

//带字符数计算功能的文本域
function countdown(obj,mytime){
	var InterValObj; 
	var startDate = new Date(mytime);  //开始时间
    var nowDate = new Date();     //当前时间
 	var SysSecond = startDate.getTime() - nowDate.getTime();   //时间差的毫秒数
 	SysSecond = SysSecond / 1000;
	InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行 
	//将时间减去1秒，计算天、时、分、秒 
	function SetRemainTime() { 
		if (SysSecond > 0) { 
			SysSecond = SysSecond - 1; 
			var second = Math.floor(SysSecond % 60);             // 计算秒     
			if (second < 10) {
				second = '0' + second;
			};
			var minite = Math.floor((SysSecond / 60) % 60);      //计算分 
			if (minite < 10) {
				minite = '0' + minite;
			};
			var hour = Math.floor((SysSecond / 3600) % 24);      //计算小时 
			if (hour < 10) {
				hour = '0' + hour;
			};
			var day = Math.floor((SysSecond / 3600) / 24);        //计算天
			if (day < 10) {
				day = '0' + day;
			};
			$(obj).html('距开始还有<span>' + day + '</span>天<span>' + hour + '</span>时<span>' + minite + '</span>分<span>' + second + '</span>秒');
		}else{//剩余时间小于或等于0的时候，就停止间隔函数 
			window.clearInterval(InterValObj); 
		}; 
	};
};