(function ($, owner, mui) {

    owner = {
        token:"",
        timer:null,
        second:5
    };

    /**
     * 发送短信验证码
     */
    owner.sendSmsCode = function () {
        $("#getSmsCode").click(function () {

            //手机号码
            var phone = $("input[name=phone]");
            //正则验证
            if (!(/^1[34578]\d{9}$/.test(phone.val()))) {
                mui.toast("手机号码格式不正确", {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }

            // owner.countDow($(this));

            //发送短信验证码
            net.post("app/sms", {phone: phone.val()}, function (data) {
                // sessionStorage.setItem("token", data.token);
                owner.token = data.token;

                mui.toast(net.getMessage(), {
                    duration: 'long',
                    type: 'div'
                });
            });

        });

        owner.login = function () {
            $("#login").click(function (e) {

                var phone = $("input[name=phone]");
                var smsCode = $("input[name=smsCode]");

                if (!smsCode.val()) {
                    mui.toast("请输入验证码", {
                        duration: 'long',
                        type: 'div'
                    });
                    return;
                }

                // var uri = "app/login";
                net.post("app/login", {phone:phone.val(), code:smsCode.val(), sms:owner.token}, function (data) {
                    // console.log(data);
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.removeItem('sms');
                    mui.toast("登录成功", {
                        duration: 'long',
                        type: 'div'
                    });

                    net.redirect("menu");
                    //window.location.href = net.path + "menu.html";
                });

            });
        }
    }


    owner.countDow = function (obj) {

        obj.attr('disabled', true);

        owner.timer = setInterval(function () {
            var data = obj.attr('data');
            obj.html(data + "("+ owner.second +")" );
            owner.second -- ;
            if(owner.second <= 0)
            {
                obj.removeAttr('disabled');
                obj.html(data);
                // obj.html(data);
                clearInterval(owner.timer);
            }
        }, 1000)
    }


    owner.init = function () {


        owner.sendSmsCode();

        owner.login();

        // net.post("app", {user:"mark"}, function (data) {
        //     console.log(data);
        // })
    }

    owner.init();


})($, window.home = {}, mui);