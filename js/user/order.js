(function ($, owner, mui) {



    owner.getOrder = function () {

        var orderSn = $.url.param('order_sn');

        var params = {
            table: 'order_info', where: {order_sn: orderSn},
            select: ['order_sn','phone', 'category', 'express_no','remark', 'img1', 'img2',
                'created_at', 'status','updated_at','message',
            ],
        };


        net.get('app', params, function (data) {

            owner.put(data);
        })

    }


    owner.put = function (data) {

        $('img:eq(0)').attr('src', data.img1);
        $('img:eq(1)').attr('src', data.img2);

        $('img').show();


        $("#order").html($("#order").attr('data') + data.order_sn);
        $("#phone").html($("#phone").attr('data') + data.phone);
        $("#category").html($("#category").attr('data') + net.category(data.category));
        $("#express").html($("#express").attr('data') + data.express_no);
        $("#remark").html($("#remark").attr('data') + data.remark);
        $("#created_at").html($("#created_at").attr('data') + data.created_at);
        $("#status").html($("#status").attr('data') + net.parseStatus(data.status));
        $("#updated_at").html($("#updated_at").attr('data') + data.updated_at);
        if (data.message)
        {
            if(owner.checkUrl(data.message))
            {
                $("#result_message").html( $("#result_message").attr('data') + '<a href='+data.message+'>' + '【请点击】 '+ '</a>');
            }else
            {
                $("#result_message").html( $("#result_message").attr('data') + data.message);
            }
        }


    };


    owner.checkUrl = function (str) {

            var RegUrl = new RegExp();
            RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");//jihua.cnblogs.com
            if (!RegUrl.test(str)) {
                return false;
            }
            return true;

    }


    owner.init = function () {

        owner.getOrder();
    }


    owner.init();

})(jQuery, window.order = {}, mui);
