(function ($, owner, mui) {



    owner.getOrder = function () {

        var orderSn = $.url.param('order_sn');

        var params = {
            table: 'order_info', where: {order_sn: orderSn},
            select: ['order_sn', 'category', 'img1', 'img2', 'status', 'express_no'],
        };


        net.get('app', params, function (data) {

            owner.put(data);
        })

    }


    owner.put = function (data) {

        $('img:eq(0)').attr('src', data.img1);
        $('img:eq(1)').attr('src', data.img2);
        $("#order").html($("#order").attr('data') + data.order_sn);
        $("#express").html($("#express").attr('data') + data.express_no);
        $("#status").html($("#status").attr('data') + net.parseStatus(data.status));
        $("#category").html($("#category").attr('data') + net.category(data.category));


    };


    owner.init = function () {

        owner.getOrder();
    }


    owner.init();

})(jQuery, window.order = {}, mui);
