/*
2015-12-09
基于jquery的密码强度验证功能
用法：
1、html：不做任何改变，只需有一个id或是class
2、js根据id或class来控制
checkpassword('#pwd');
*/

function checkpassword(obj){
	$(obj).keyup(function () {
		var __th = $(this);
		if (!__th.val()) {
			$('.ui-acc span').show().text('6-16位，由字母（区分大小写）、数字、符号组成');
			return;
		};
		if (__th.val().length < 6) {
			$('.ui-acc span').show().text('密码太过简单，请修改！');
			$('.ui-acc').removeClass('ui-acc-middle ui-acc-high').addClass('ui-acc-low');
			return;
		};
		var _r = verifycode(__th);
		if (_r < 1) {
			$('.ui-acc span').show().text('6-16位，由字母（区分大小写）、数字、符号组成');
			return;
		};
		if (_r > 0 && _r < 2) {
			$('.ui-acc span').show().text('密码太过简单，请修改！');
			$('.ui-acc').removeClass('ui-acc-middle ui-acc-high').addClass('ui-acc-low');
		}else if (_r >= 2 && _r < 4) {
			$('.ui-acc span').hide();
			$('.ui-acc').removeClass('ui-acc-low ui-acc-high').addClass('ui-acc-middle');
		} else if (_r >= 4) {
			$('.ui-acc span').hide();
			$('.ui-acc').removeClass('ui-acc-low ui-acc-middle').addClass('ui-acc-high');
		};
		$('.ui-acc span').hide();
	});
};

function verifycode(pwdinput) {
	var maths, smalls, bigs, corps, cat, num;
	var str = $(pwdinput).val()
	var len = str.length;
	var cat = /.{16}/g
	if (len == 0) return 1;
	if (len > 16) { $(pwdinput).val(str.match(cat)[0]); };
	cat = /.*[\u4e00-\u9fa5]+.*$/
	if (cat.test(str)) {
		return -1;
	};
	cat = /\d/;
	var maths = cat.test(str);
	cat = /[a-z]/;
	var smalls = cat.test(str);
	cat = /[A-Z]/;
	var bigs = cat.test(str);
	var corps = corpses(pwdinput);
	var num = maths + smalls + bigs + corps;
	if (len < 6) { return 1; };
	if (len >= 6 && len <= 8) {
		if (num == 1) return 1;
		if (num == 2 || num == 3) return 2;
		if (num == 4) return 3;
	};
	if (len > 8 && len <= 11) {
		if (num == 1) return 2;
		if (num == 2) return 3;
		if (num == 3) return 4;
		if (num == 4) return 5;
	};
	if (len > 11) {
		if (num == 1) return 3;
		if (num == 2) return 4;
		if (num > 2) return 5;
	};
};

function corpses(pwdinput) {
	var cat = /./g
	var str = $(pwdinput).val();
	var sz = str.match(cat)
	for (var i = 0; i < sz.length; i++) {
		cat = /\d/;
		maths_01 = cat.test(sz[i]);
		cat = /[a-z]/;
		smalls_01 = cat.test(sz[i]);
		cat = /[A-Z]/;
		bigs_01 = cat.test(sz[i]);
		if (!maths_01 && !smalls_01 && !bigs_01) { return true; };
	};
	return false;
};
