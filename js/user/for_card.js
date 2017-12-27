(function ($, owner, mui) {


    //文件上传
    owner.upload = function () {
        // $("button[type=upload]").click(function () {
        //     // mui.toast("upload", {duration: 'long', type: "div"});
        //     $("input[type=file]").click();
        // });
        var img;
        $('img').click(function () {
            $("input[type=file]").click();
            img = $(this);
        });

        $("input[type=file]").change(function (e) {

            var inputs = $("input[type=file]");
            for (var i = 0; i < inputs.length; i++) {
                //图片转base64上传
                var file = inputs[i].files;
                if (file[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[0]);
                    reader.onload = function (e) {
                        var event = this;
                        // console.log(event.result);
                        if (owner.checkFile(event.result)) {
                            img.attr('src', event.result);
                            img.attr('data', 1);
                        } else {
                            mui.toast('文件格式不正确');
                        }
                    }
                }
            }
        });
    }

    owner.checkFile = function (src) {
        if (src.indexOf('data:image') > -1) {
            //console.log('img');
            return true;
        }

        return false;
    }




    owner.getFileName = function () {
        var file = null == $.url.attr("file") ? "index.html" : $.url.attr("file");

        var position = file.lastIndexOf('.');
        var filePath = file.substr(0, position);

        return filePath;
    }

    owner.submit = function () {
        $("button[type=submit]").click(function () {

            var imgOne = $('img:eq(0)');
            var imgTwo = $('img:eq(1)');

            var expressNo = $('input[type=text]');

            var remark = $('textarea');


            if (imgOne.attr('data') == "0" || imgTwo.attr('data') == "0") {
                mui.toast("请上传两张图片");
                return;
            }

            if (!expressNo.val()) {
                mui.toast("请输入物流单号");
                return;
            }

            if (remark.val() == "")
            {
                remark.val("(无)");
            }

            var params = {
                img1: imgOne.attr('src'), img2: imgTwo.attr('src'), express_no: expressNo.val(), category: owner.getFileName(),
                remark: remark.val(), phone: ['callFunction', 'getPhone'], order_sn: ['callFunction', 'getOrderSn'],
                table:'order_info'
            };


            // var params = {
            //     img1: "00", img2: "111", express_no: expressNo.val(), category: owner.getFileName(),
            //     remark: remark.val(), phone: ['callFunction', 'getPhone'], order_sn: ['callFunction', 'getOrderSn'],
            //     table:'order_info'
            // };

            net.post('app', params, function (data) {

                net.redirect("order_list");
                // if(data.insertId)
                // {
                //     re
                // }
            });

            // net.redirect("order");
        });
    }

    owner.init = function () {
        owner.upload();
        owner.submit();
    }


    owner.init();

})(jQuery, window.card = {}, mui);

