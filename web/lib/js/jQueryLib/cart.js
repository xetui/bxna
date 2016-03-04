﻿var cart = {
    url: domain + '/lib/ajax/datHang/Default.aspx',
    urlBl: domain + '/lib/ajax/comment/Default.aspx',
    setup: function () {
        $('.buybtn').click(function () {
            var item = $(this);
            var _id = item.attr('_id');
            item.html('&nbsp;&nbsp;Đang xử lý...');
            item.addClass('btn-loading');
            var pItem = item.parent().prev();
            pItem.effect('transfer', { to: '.cart-body', className: 'ui-effects-transfer' }, 500, function () { })
            $.ajax({
                url: cart.url,
                dataType: 'SCRIPT',
                type: 'POST',
                data: { 'ref': Math.random(), 'act': 'add', 'ID': _id },
                success: function (_dt) {
                    cart.get(function () {
                        item.html('Đặt hàng');
                        item.removeClass('btn-loading');
                    });
                }
            });
        });
        cart.get();
        //cart.getBl();

        var car_info = $('.cart-info');
        $('.cart-checkOut').click(function () {
            //            if (!car_info.hasClass('cart-info-active')) { car_info.addClass('cart-info-active'); }
            //            else { car_info.removeClass('cart-info-active'); }
            common.fbJquery('Thanh toán', car_info, 400, 'thanh-toan', function (b) {
                $('.cart-send', b).click(function () {
                    var item = $(this);
                    var Ten = b.find('.Ten');
                    var Email = b.find('.Email');
                    var Mobile = b.find('.Mobile');
                    var DiaChi = b.find('.DiaChi');
                    var GhiChu = b.find('.GhiChu');
                    var _Ten = Ten.val();
                    var _Email = Email.val();
                    var _Mobile = Mobile.val();
                    var _DiaChi = DiaChi.val();
                    var _GhiChu = GhiChu.val();
                    var err = '';
                    if (_Ten == '') err += 'Nhập tên\n';
                    if (_Mobile == '') err += 'Nhập điện thoại\n';
                    if (_DiaChi == '') err += 'Nhập địa chỉ\n';
                    if (err != '') {
                        alert('Lỗi\n' + err + '\nBạn vui lòng hoàn thành nhé :P');
                        return false;
                    }
                    item.html('&nbsp;&nbsp;Đang xử lý...');
                    item.addClass('btn-loading');
                    $.ajax({
                        url: cart.url,
                        dataType: 'SCRIPT',
                        type: 'POST',
                        data: {
                            'ref': Math.random(),
                            'act': 'save',
                            'Ten': _Ten,
                            'Email': _Email,
                            'Mobile': _Mobile,
                            'DiaChi': _DiaChi,
                            'GhiChu': _GhiChu
                        },
                        success: function (_dt) {
                            var cart_box = $('.cart-box');
                            item.html('Gửi đặt hàng');
                            item.removeClass('btn-loading');
                            alert('cám ơn bạn đã đặt hàng, chúng tôi sẽ gọi lại cho bạn ngay lập tức');
                            cart_box.html('');
                            b.find('input, textarea').val('');
                            b.removeClass('cart-info-active');
                            $(document).trigger('close.facebox','thanh-toan');
                        }
                    });
                });
            });
        });
        

        var bl_bot = $('.bl-bot');
        $('.bl-send').click(function () {
            var item = $(this);
            var Ten = bl_bot.find('.Ten');
            var Email = bl_bot.find('.Email');
            var Mobile = bl_bot.find('.Mobile');
            var GhiChu = bl_bot.find('.GhiChu');
            var _Ten = Ten.val();
            var _Email = Email.val();
            var _Mobile = Mobile.val();
            var _GhiChu = GhiChu.val();
            var err = '';
            if (_Ten == '') err += 'Nhập tên\n';
            if (_Mobile == '') err += 'Nhập điện thoại\n';
            if (_Mobile == '') err += 'Nhập mobile\n';
            if (err != '') {
                alert('Lỗi\n' + err + '\nBạn vui lòng hoàn thành nhé :P');
                return false;
            }
            item.html('&nbsp;&nbsp;Đang xử lý...');
            item.addClass('btn-loading');
            $.ajax({
                url: cart.urlBl,
                dataType: 'SCRIPT',
                type: 'POST',
                data: {
                    'ref': Math.random(),
                    'act': 'add',
                    'Ten': _Ten,
                    'Email': _Email,
                    'Mobile': _Mobile,
                    'GhiChu': _GhiChu
                },
                success: function (_dt) {
                    item.html('Gửi ý kiến');
                    item.removeClass('btn-loading');
                    cart.get();
                    alert('cám ơn bạn đã góp ý, chúng tôi chân thành cảm ơn và sẽ phản hồi lại bạn trong thời gian sớm nhất');
                    bl_bot.find('input, textarea').val('');
                }
            });
        });
    },
    getBl: function () {
        $.ajax({
            url: cart.urlBl,
            dataType: 'SCRIPT',
            type: 'POST',
            data: { 'ref': Math.random(), 'act': 'get' },
            success: function (_dt) {
                $('.bl-box').html(_dt);
            }
        });
    },
    get: function (fn) {
        var cart_box = $('.cart-box');
        cart_box.html('&nbsp;&nbsp;Đang cập nhật...');
        cart_box.addClass('btn-loading');
        $.ajax({
            url: cart.url,
            dataType: 'SCRIPT',
            type: 'POST',
            data: { 'ref': Math.random(), 'act': 'get' },
            success: function (_dt) {
                var dt = eval(_dt);
                cart_box.removeClass('btn-loading');
                cart.xuLyGet(dt, function () {
                    if (typeof (fn) == 'function') { fn(); }
                });
            }
        });
    },
    xuLyGet: function (_dt, fn) {
        var dt = eval(_dt);
        var cart_body = $('.cart-body');
        var cart_tong = cart_body.find('.cart-tong');
        if (dt.Total < 80) {
            if (dt.Total == '0') {
                cart_body.find('.cart-ship').removeClass('cart-ship-active');
                cart_tong.hide();
            }
            else {
                cart_body.find('.cart-ship').addClass('cart-ship-active');
                cart_tong.show();
            }
        }
        else {
            cart_body.find('.cart-ship').removeClass('cart-ship-active');
            cart_tong.show();
        }
        cart_body.find('.cart-tong-label').html(dt.Total + dt.ShipCost + '.000đ');
        var l = '';
        var cart_box = cart_body.find('.cart-box');
        cart_box.html('');
        $.each(dt.List, function (i, v) {
            l = '<div class="cart-item">';
            l += '<span class="cart-item-gia">' + (v.Gia * v.SoLuong) + '.000đ</span>';
            l += '<img src="' + domain + '/lib/up/i/' + v.Img + '" class="cart-item-img" />';
            l += '<span class="cart-item-ten">' + v.Ten + '</span><br />';
            l += cart.buildSoLuong(v.SoLuong);
            l += '<a _id="' + i + '" href="javascript:;" class="cart-item-xoa">xóa</a>';
            l += '</div>';
            var nItem = $(l).appendTo(cart_box);
            nItem.find('a').click(function () {
                var aItem = $(this);
                var con = confirm('Bạn muốn BỎ món này?');
                if (con) {
                    $.ajax({
                        url: cart.url,
                        dataType: 'SCRIPT',
                        type: 'POST',
                        data: { 'ref': Math.random(), 'act': 'del', 'ID': aItem.attr('_id') },
                        success: function (_dt) {
                            cart.xuLyGet(_dt);
                        }
                    });
                }
            });

            nItem.find('select').change(function () {
                var sItem = $(this);
                var _v = sItem.val();
                var _vRef = _v;
                if (_v == '0') {
                    var p = prompt('Số lượng của bạn :*');
                    if (p) {
                        if (cart.isInt(p)) {
                            nItem.find('option[selected="selected"]').removeAttr('selected');
                            $('<option value="' + p + '" selected="selected">' + p + '</option>').insertBefore(nItem.find('option:last'));
                            _v = p;
                        }
                        else {
                            alert('Số lượng là kiểu số bạn nhé ^_^');
                        }
                    }
                }
                if (cart.isInt(v)) {
                    if (parseInt(_v) > 0) {
                        $.ajax({
                            url: cart.url,
                            dataType: 'SCRIPT',
                            type: 'POST',
                            data: { 'ref': Math.random(), 'act': 'UpSl', 'ID': sItem.parent().find('.cart-item-xoa').attr('_id'), 'SoLuong': _v },
                            success: function (_dt) {
                                cart.xuLyGet(_dt);
                            }
                        });
                    }
                }
            });
        });
        if (typeof (fn) == 'function') { fn(); }
    },
    buildSoLuong: function (SoLuong) {
        var l = '';
        l += '<select _value="' + SoLuong + '" class="cart-item-soLuong">';
        for (i = 1; i < 10; i++) {
            l += '<option value="' + i + '" ' + (i == SoLuong ? ' selected="selected"' : '') + '>' + i + '</option>';
        }
        if (SoLuong > 10) {
            l += '<option value="' + SoLuong + '" selected="selected">' + SoLuong + '</option>';
        }
        l += '<option value="0">Số khác</option>';
        l += '</select>';
        return l;
    },
    isInt: function (s) {
        var isInteger = function (s) {
            var i;
            if (isEmpty(s))
                if (isInteger.arguments.length == 1) return false;
                else return (isInteger.arguments[1] == true);

            for (i = 0; i < s.length; i++) {
                var c = s.charAt(i);

                if (!isDigit(c)) return false;
            }

            function isEmpty(s) {
                return ((s == null) || (s.length == 0))
            }

            function isDigit(c) {
                return ((c >= "0") && (c <= "9"))
            }
            return true;
        }
        return isInteger(s);
    }
}