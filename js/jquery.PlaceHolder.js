/*
2015-12-09
基于jquery的表单占位提示插件，兼容IE password
用法：
placeholder.init();
*/

var placeholder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
        return 'placeholder' in document.createElement('textarea');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        $('input[placeholder],textarea[placeholder]').each(function(){
            var self = $(this), txt = self.attr('placeholder');
            if(self.attr('type') == 'password'){
            	self.val(txt).attr('title',txt);
            }else{
	    		self.val(txt).css('color','#757575');
	    		self.focus(function(){
	    			var myVal=self.val();
	    			if(myVal==txt){
	    				self.val('').css('color','#000');
					};
	    		});
	    		self.blur(function(){
	    			var myVal=self.val();
	    			if(myVal==''){
	    				self.val(txt).css('color','#757575');
					};
	    		});
            };
        });
        
    }
};