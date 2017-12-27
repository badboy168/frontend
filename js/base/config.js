var config = {

    //
    // title: {index: "用户登录", menu: "菜单", for_card:"兑换现金券", for_new:"旧品换新", for_mend:"商品维修", order_list:"我的订单", order:"订单详情"}

};

config.getTitle = function () {

    var file = null == $.url.attr("file") ? "index.html" : $.url.attr("file");

    var position = file.lastIndexOf('.');
    var filePath = file.substr(0, position);

    Object.keys(config.title).forEach(function (key) {
        if (filePath == key) {
            return config.title[key]
        }
    });
    return config.title["index"];
}


window.onload = function () {

}