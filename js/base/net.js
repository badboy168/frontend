
//http://127.0.0.1/returns/webservice/public/index.php/api/
//http://develop.webservice.longyaonet.com/api/
    net = {
        requestUrl: "http://webservice.longyaonet.com/api/",
        // requestUrl:'http://127.0.0.1/returns/webservice/public/index.php/api/',
        path: $.url.attr("path"),
        urlDirectory: $.url.attr("directory"),
        uri: null, //http host后面的参数
        data: {},//请求时要带的参数
        callback: null,//请求成功的回调
        successCode: 200,
        notLogin: 403,
        arguments: null,
        token: sessionStorage.getItem("token"),
        message: "",
    };

    net.getMessage = function () {

        return net.message;
    }


    net.back = function () {
        var num = undefined == arguments[0]?0:arguments[0];
        if(num == 0)
        {
            window.history.back();
        }else
        {
            window.history.go(num);
        }

    }

    /**
     * URL跳转
     * @param uri
     * @param params
     */
    net.redirect = function (uri) {
        var args = "";
        var params = arguments[1];

        if (undefined != params) {
            args += "?";
            Object.keys(params).forEach(function (key) {
                args  += key + "=" + params[key] + "&";
            });
        }
        //message=请登录&type=notlogin&
        args = args.substr(0, args.length - 1);
        var url = $.url.attr("directory") + uri + ".html" + args;
        window.location.href = url;
        // setInterval(function () {
        //     window.location.href = url;
        // }, 500);

    }

    net.parseArgs = function () {

        if (net.arguments.length <= 0) {
            alert("至少需要一个参数");
            return false;
        } else if (net.arguments.length == 1 && typeof(net.arguments[0]) == "string") {
            net.uri = net.arguments[0];
            net.data = {};
            net.callback = net.success;

            return true;
        } else if (net.arguments.length == 2) {
            net.uri = net.arguments[0];
            net.data = {};
            net.callback = net.arguments[1];

            return true;
        } else if (net.arguments.length == 3) {
            net.uri = net.arguments[0];
            net.data = net.arguments[1];
            net.callback = net.arguments[2];

            return true;
        } else {
            return false;
        }

    }

    net.error = function (err) {
        console.log(err);
        mui.toast("服务器繁忙", {duration: 'long', type: 'div'});
    }

    net.success = function (data) {

        net.message = data.message;
        if (data.status == net.successCode) {
            net.callback(data.data);
        } else if (data.status == net.notLogin) {
            mui.toast("您未登录", {duration: 'long', type: 'div'});
        } else {
            mui.toast(data.message, {duration: 'long', type: 'div'});
        }
    }

    net.http = function (requestType) {

        requestType = requestType || "get";
        var newData = net.data;
        newData.token = net.token;

        $.ajax({
            type: requestType,
            url: net.requestUrl + net.uri,
            data: newData,
            async: true,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType:"json",
            success: function (data) {
                net.success(data);
                // net.callback(data);
            },
            error: function (error) {
                net.error(error);
            }
        });
    }

    net.get = function () {

        net.arguments = arguments;
        //解析参数并给全局变量赋值
        if (net.parseArgs()) {
            net.http("get");
        }
    }


    net.post = function () {

        net.arguments = arguments;

        //解析参数并给全局变量赋值
        if (net.parseArgs()) {
            net.http("post");
        }

    }

    net.put = function () {

        net.arguments = arguments;

        //解析参数并给全局变量赋值
        if (net.parseArgs()) {
            net.http("put");
        }

    }


