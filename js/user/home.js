(function($, owner, mui) {

	owner = {
		imgRequestUrl: net.requestUrl + "sms/getCode",
	};

	owner.codeImgClick = function() {
		$("img").click(function(e) {
			$(this).attr("src", owner.imgRequestUrl + "?mt" + Math.random());
		});
	}

	owner.sendSmsCode = function() {
		$("#getSmsCode").click(function() {

			//手机号码
			var phone = $("input[name=phone]");
			//验证码
			var code = $('input[name=imgCode]');

			if(!(/^1[34578]\d{9}$/.test(phone.val()))) {
				mui.toast("手机号码有误，请重填", {
					duration: 'long',
					type: 'div'
				});
				return;
			}
			if(!code.val()) {
				mui.toast("请输入图片验证码", {
					duration: 'long',
					type: 'div'
				});
				return;
			}
			var data = {mobile: phone.val(),captcha: code.val()};
			net.post("sms/send", data, function (data) {
                mui.toast(net.getMessage(), {
							duration: 'long',
							type: 'div'
						});
            });
		});

		owner.login = function() {
			$("#login").click(function(e) {

				var phone = $("input[name=phone]");
				var smsCode = $("input[name=smsCode]");

				if(!smsCode.val()) {
					mui.toast("请输入验证码", {
						duration: 'long',
						type: 'div'
					});
					return;
				}
				var uri = "sms/login/" + phone.val() + "/" + smsCode.val();
				net.get(uri, function (data) {
                    sessionStorage.setItem("token", data.token);
                    mui.toast("登录成功", {
                        duration: 'long',
                        type: 'div'
                    });

                    window.location.href = net.path + "menu.html";
                });

			});
		}
	}

	owner.init = function() {


		owner.codeImgClick();

		owner.sendSmsCode();

		owner.login();

	}

	owner.init();



})($, window.home = {},mui);