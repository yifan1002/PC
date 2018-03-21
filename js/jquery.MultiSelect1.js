/*
2015-12-09
基于jquery的多级联动菜单，如省市区三级联动
用法：
1、html：不做任何改变，只需有一个id或是class
2、js根据id或class来控制，所有参数必填
multiselect('.test','#multi-select');
*/

function multiselect(btn,obj) {
	//初始化
	$(obj).append('<ul id="province1" class="multi-select1"></ul><ul id="city1" class="multi-select1"></ul><ul id="district1" class="multi-select1"></ul>');
	
	//省市选择下级
	$('body').on('click','#province1 li,#city1 li,#district1 li',function(){
		$(this).addClass('current').siblings('li').removeClass('current');
	});
	
	//获取省数据
	$(btn).click(function(e){
		e.preventDefault();
		$.getJSON('js/data.json', function(data1) {
	        $(obj).children('ul').html('');//清空省、市、区列表
	        $.each(data1, function(x, item1) {
	            //插入省列表
	            $('#province1').append(
                    '<li pro-sort="'+ x +'">' + item1.name + '</li>' 
                );
	        });
        });
	});
	
	//获取市数据
	$('#province1').on('click','li',function(){
		var proSort=$(this).attr('pro-sort');
		$.getJSON('js/data.json', function(data2) {
	        $('#city1,#district1').html('');//清空市、区列表
	        $.each(data2[proSort].city, function(y, item2) {
	        	//插入市列表
	            $('#city1').append(
                    '<li pro-sort="'+ proSort +'" city-sort="'+ y +'">' + item2.name + '</li>' 
                );
	        });
        });
	});
	
	//获取区数据
	$('#city1').on('click','li',function(){
		var proSort=$(this).attr('pro-sort');
		var citySort=$(this).attr('city-sort');
		$.getJSON('js/data.json', function(data3) {
	        $('#district1').html('');//清空区列表
	        $.each(data3[proSort].city[citySort].area, function(z, item3) {
	        	//插入区列表
	            $('#district1').append(
                    '<li>' + item3 + '</li>' 
                );
	        });
        });
	});
	
};