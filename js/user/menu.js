(function ($, owner, mui) {

    owner.init = function () {
        $("button").click(function () {
            net.redirect(""+$(this).attr('target'));
        });
    }

    owner.init();

})(jQuery, window.menu = {}, mui);
