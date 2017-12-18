var config = {
    title: {index: "用户登录", menu: "菜单"}
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