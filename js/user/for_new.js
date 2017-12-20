(function ($, owner, mui) {

    owner.upload = function () {
        $("button[type=upload]").click(function () {
            // mui.toast("upload", {duration: 'long', type: "div"});
            $("input[type=file]").click();
        });

        $("input[type=file]").change(function (e) {
            mui.toast("change", {duration: 'long', type: "div"});
        });
    }

    owner.submit = function () {
        $("button[type=submit]").click(function () {
            // mui.toast("submit", {duration: 'long', type: "div"});
            net.redirect("order");
        });
    }

    owner.init = function () {
        owner.upload();
        owner.submit();

    }


    owner.init();
})(jQuery, window.newGoods = {}, mui);

