(function ($, owner, mui) {

    owner = {
        title: {
            index: "用户登录",
            menu: "菜单",
            for_card: "兑换现金券",
            for_new: "旧品换新",
            for_mend: "商品维修",
            order_list: "订单管理",
            order: "订单详情"
        }
    };

    owner.mui = function () {
        mui.init({
            swipeBack: true //启用右滑关闭功能
        });
    };


    owner.getTitle = function () {

        var file = null == $.url.attr("file") ? "index.html" : $.url.attr("file");

        var position = file.lastIndexOf('.');
        var filePath = file.substr(0, position);
        var titleName = owner.title.index;

        Object.keys(owner.title).forEach(function (key) {

            if (filePath == key) {
                titleName = owner.title[key]
                return false;
            }
        });

        return titleName;
    }


    owner.initWithTitle = function () {
        //初始化html 标题
        var title = owner.getTitle();
        $(document).attr('title', title);
        var muiTitle = $(".mui-title");
        if (null != muiTitle) {
            $(".mui-title").html(title);
        }
    }


    owner.checkLogin = function () {

        var file = $.url.attr("file");
        if (null == net.token) {
            //
            if (file != "index.html" && null != file) {
                net.redirect('index', {message: "请登录"});
            }
        }
    }


    owner.init = function () {

        //初始化MUI
        owner.mui();
        owner.initWithTitle();
        owner.checkLogin();

        var message = $.url.param("message");
        if (null != message) {
            mui.toast(message, {duration: 'long', type: "div"});
        }
    }

    owner.init();

})(jQuery, window.initialization = {}, mui);


