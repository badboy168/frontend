(function ($, owner, mui) {


    owner = {
        page: 0
    };




    owner.getOrderList = function () {

        owner.page ++;

        var params = {
            table: 'order_info', where: {phone: ['callFunction', 'getPhone']},
            select: ['order_sn', 'category', 'img1', 'img2', 'status'],
            page: owner.page
        };

        net.get('app', params, function (data) {

            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html += owner.createOrderItemHtml(data.data[i]);
            }

            $(html).appendTo($('.mui-table-view'));
        })

    }



    owner.createOrderItemHtml = function (data) {


        var status =  net.parseStatus(data.status);
        var html = "";
        html += '<li class="mui-table-view-cell mui-media" data='+ data.order_sn +'>';
        html += "<img class='mui-media-object mui-pull-left' src=" + data.img1 + ">";
        html += "<img class='mui-media-object mui-pull-left' src=" + data.img2 + ">";
        html += '<div class="mui-media-body">';
        html += "订单号：" + data.order_sn;
        html += "<p class='mui-ellipsis'>状态：" + status + " 【 " + net.category(data.category) +"】</p>";
        html += "</div>";
        html += "</li>";

        return html;
    }



    owner.more = function () {

        $(document).on('click', "li", function () {
            var orderSn = $(this).attr('data');
            net.redirect('order', {order_sn:orderSn})
        });
    }



    owner.init = function () {

        owner.getOrderList();
        owner.more();
    }


    owner.init();

})(jQuery, window.orderList = {}, mui);