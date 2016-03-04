﻿var pmLatestLoadedTimer;
var pmLatestLoadedTimeOut = 2000;
var _lastXhr;
var dangCapPhoi = false;
var globalTimeout = 1000;
var xeLenPhoiHolder = false;
jQuery(function () {
    $('#__VIEWSTATE').remove();
    window.defaultOnError = window.onerror;
    window.onerror = function(errorMeaage, fileName, lineNumber) {
        console.log('Lỗi  00x014 MSG:' + errorMeaage + '<br/>FILE:' + fileName + ' <br/>LINE:<br/>' + lineNumber);
        return true;
    };
    bxVinhFn.init();
    
});

var bxVinhFn = {
    init:function () {
        bxVinhFn.normalFormFn.init();
    }
    , utils: {
        msg: function (tit, txt, fn, time) {
            var body = $('#DoneModal').find('.modal-body');
            var title = $('#DoneModal').find('.modal-title');
            body.html('');
            title.html('');
            if (tit == '') tit = 'Thông báo';
            title.html(tit);
            body.html(txt);
            $('#DoneModal').modal('show');
            if (time == null) time = 2000;
            setTimeout(function () {
                $('#AlertModal').modal('hide');
            }, time);
        }
        , loader:function (title, show) {
            if (show) {
                bxVinhFn.utils.msg(title, 'Đang lưu');
            } else {
                $('#DoneModal').modal('hide');
            }
        }
        , normalizeStr: function (term) {
            var ret = "";
            for (var i = 0; i < term.length; i++) {
                ret += adm.inorgeCaseMap[term.charAt(i)] || term.charAt(i);
            }
            return ret;
        }
        , convertNumberToMoney:function(_num) {
            if (_num == '') {
                return 0;
            }
            var num = parseInt(_num);
            var p = num.toFixed(2).split(".");
            return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
                return num + (i && !(i % 3) ? "," : "") + acc;
            }, "");
        }
        , getNumberFormMoney: function (tien) {
            if (tien == '') return 0;
            function escapeRegExp(string) {
                return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            }
            function replaceAll(string, find, replace) {
                return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
            }

            return parseInt(replaceAll(tien, ',', ''));
        }
        , formatTien: function (obj) {
            // Format while typing & warn on decimals entered, no cents
            obj.formatCurrency({ colorize: true, negativeFormat: '-%s%n', roundToDecimalPlace: 0, symbol: '' });
            obj.blur(function () {
                obj.html(null);
                $(this).formatCurrency({ colorize: true, negativeFormat: '-%s%n', roundToDecimalPlace: 0, symbol: '' });
            })
            .keyup(function (e) {
                var e = window.event || e;
                var keyUnicode = e.charCode || e.keyCode;
                if (e !== undefined) {
                    switch (keyUnicode) {
                        case 16: break; // Shift
                        case 27: this.value = ''; break; // Esc: clear entry
                        case 35: break; // End
                        case 36: break; // Home
                        case 37: break; // cursor left
                        case 38: break; // cursor up
                        case 39: break; // cursor right
                        case 40: break; // cursor down
                        case 78: break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
                        case 110: break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
                        case 190: break; // .
                        default: $(this).formatCurrency({ colorize: true, negativeFormat: '-%s%n', roundToDecimalPlace: -1, eventOnDecimalsEntered: true, symbol: '' });
                    }
                }
            })
            .bind('decimalsEntered', function (e, cents) {
                //var errorMsg = 'Please do not enter any cents (0.' + cents + ')';
                //$('#formatWhileTypingAndWarnOnDecimalsEnteredNotification').html(errorMsg);
                //log('Event on decimals entered: ' + errorMsg);
            });

        }
        , autoCompleteSearch: function (el, url, cache, fn, fn2, fn1) {
            if (typeof (fn1) != "function") {
                fn1 = function (ul, item) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a href=\"javascript:;\">" + item.label + "</a>")
                        .appendTo(ul);
                };
            }

            $(el).autocomplete({
                source: function (request, response) {
                    var term = cache + request.term;
                    _lastXhr = $.ajax({
                        url: url,
                        dataType: 'script',
                        data: { 'subAct': 'search', 'q': request.term },
                        success: function (dt, status, xhr) {
                            var data = eval(dt);
                            _cache[term] = data;
                            if (xhr === _lastXhr) {
                                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                                response($.map(data, function (item) {
                                    return fn2(matcher, item);
                                }));
                            }
                        }
                    });
                },
                minLength: 0,
                select: function (event, ui) {
                    fn(event, ui);
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        if ($(this).val() == '') {
                            $(this).attr('_value', '');
                        }
                    }
                },
                delay: 0,
                selectFirst: true
            }).data("autocomplete")._renderItem = fn1;
            $(el).autocomplete("option", "appendTo", el.parent());

        }
        , autoCompleteSearchCache: function (el, url, cache, fn, fn2, fn1) {
            if (typeof (fn1) != "function") {
                fn1 = function (ul, item) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a href=\"javascript:;\">" + item.label + "</a>")
                        .appendTo(ul);
                };
            }

            $(el).autocomplete({
                source: function (request, response) {
                    var term = cache + request.term;
                    _lastXhr = $.ajax({
                        url: url,
                        dataType: 'script',
                        data: { 'subAct': 'search', 'q': request.term },
                        success: function (dt, status, xhr) {
                            var data = eval(dt);
                            _cache[term] = data;
                            if (xhr === _lastXhr) {
                                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                                response($.map(data, function (item) {
                                    return fn2(matcher, item);
                                }));
                            }
                        }
                    });
                },
                minLength: 0,
                select: function (event, ui) {
                    fn(event, ui);
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        if ($(this).val() == '') {
                            $(this).attr('_value', '');
                        }
                    }
                },
                delay: 0,
                selectFirst: true
            }).data("autocomplete")._renderItem = fn1;
            $(el).autocomplete("option", "appendTo", el.parent());

        }
        , convertToDate:function (str) {

            var dateArr = str.split("/");

            var date = new Date(parseInt(dateArr[2], 10),
                               parseInt(dateArr[1], 10) - 1,
                               parseInt(dateArr[0], 10));

            return date;
        }
        , imgfinder: function (el, _startupPath, fn) {
            var item = $(el);
            item.on('click', function () {
                CKFinder.popup({
                    BasePath: '/ckfinder/'
                , startupPath: _startupPath
                , selectActionFunction: function (fileUrl, data) {
                    fn(item, fileUrl);
                }
                , callback: function (api) { //api.openMsgDialog("", "Almost ready to go!");
                }
                , startupFolderExpanded: true
                , rememberLastFolder: true
                });
                return false;
            });
        }

    }
    ,url : {
        login: '/lib/ajax/login/default.aspx'
        , donVi: '/lib/ajax/DonVi/default.aspx'
        , chamCong: '/lib/ajax/ChamCong/default.aspx'
        , xeVaoBen: '/lib/ajax/XeVaoBen/default.aspx'
        , giaoCa: '/lib/ajax/GiaoCa/default.aspx'
        , ghe: '/lib/ajax/Ghe/default.aspx'
        , xeDiemDung: '/lib/ajax/XeDiemDung/default.aspx'
    }
    , normalFormFn: {
        init: function () {
            
            bxVinhFn.normalFormFn.commonFn();
            bxVinhFn.normalFormFn.add();
            bxVinhFn.normalFormFn.headerFn();
            bxVinhFn.normalFormFn.addPhoi();
            bxVinhFn.normalFormFn.XeVaoBenTodayList();
            bxVinhFn.normalFormFn.XeChoThanhToanList();
            bxVinhFn.normalFormFn.XeDaThanhToanList();
            bxVinhFn.normalFormFn.addTruyThuFn();
            bxVinhFn.normalFormFn.addThuCapPhoiFn();
            bxVinhFn.normalFormFn.truyThuKetQuaView();
            bxVinhFn.normalFormFn.addThuNoFn();
            bxVinhFn.normalFormFn.addGheSoDoChoFn();
            bxVinhFn.normalFormFn.addXeDiemDungFn();
        }
        , commonFn:function() {
            var logout = $('.logoutbtn');
            logout.click(function () {
                var data = { act: 'Logout' };
                $.ajax({
                    url: '/lib/ajax/Default.aspx'
                    , data: data
                    , success: function () {
                        document.location.reload();
                    }
                });
            });

            $('[data-toggle="tooltip"]').tooltip();

            var giaoCaLbl = $('.GiaoCa-Label');
            if($(giaoCaLbl).length > 0) {
                var timerGiaoca;
                var ajaxGiaoCa = function () {
                    if (xeLenPhoiHolder) {
                        if (timerGiaoca) clearTimeout(timerGiaoca);
                        timerGiaoca = setTimeout(function () {
                            ajaxGiaoCa();
                        }, globalTimeout * 5);
                        return;
                    }
                    xeLenPhoiHolder = true;
                    $.ajax({
                        url: bxVinhFn.url.giaoCa,
                        data: {
                            subAct: 'Detail'
                        },
                        success: function (rs) {
                            giaoCaLbl.html('');
                            $(rs).prependTo(giaoCaLbl);
                        }
                        , complete: function () {
                            xeLenPhoiHolder = false;
                            if (timerGiaoca) clearTimeout(timerGiaoca);
                            timerGiaoca = setTimeout(function () {
                                ajaxGiaoCa();
                            }, globalTimeout * 5);
                        }
                    });
                };
                ajaxGiaoCa();
            }
        }
        , add: function () {
            /// Format các thành phần cơ bản
            var moneyInputs = $('.money-input');
            $.each(moneyInputs, function (i, j) {
                var itemEl = $(j);
                bxVinhFn.utils.formatTien(itemEl);
            });

            var datePickerElements = $('.datepicker-input');
            $.each(datePickerElements, function (i, j) {
                var itemEl = $(j);
                itemEl.datetimepicker({
                    language: 'vi-Vn'
                });
                var input = itemEl.find('input');
                input.focus(function () {
                    input.next().click();
                });
            });
            
            var timePickerElements = $('.timePicker-input');
            $.each(timePickerElements, function (i, j) {
                var itemEl = $(j);
                itemEl.timepicker({
                    minuteStep: 15,
                    showMeridian: false,
                    defaultTime: false
                });
            });

            var pnl = $('.Normal-Pnl-Add');
            if ($(pnl).length < 1) return;
            var url = pnl.attr('data-url');
            var urlSuccess = pnl.attr('data-success');
            var urlList = pnl.attr('data-list');
            
            var btn = pnl.find('.savebtn');
            var xoaBtn = pnl.find('.xoaBtn');
            var txt = pnl.find('.Ten');

            var alertErr = pnl.find('.alert-danger');
            var alertOk = pnl.find('.alert-success');

            btn.click(function () {


                alertErr.hide();
                alertOk.hide();
                var val = txt.val();
                if (val == '') {
                    alertErr.show();
                    alertErr.html('Nhập nội dung');
                    return;
                }
                var data = pnl.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'save' });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') { // E-mail or username is not avaiable
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           setTimeout(function () {
                               document.location.href = urlSuccess + rs;
                           }, 1000);
                       }
                   }
                });
            });
            
            xoaBtn.click(function () {
                var con = confirm('Bạn có thực sự muốn xóa?');
                if (!con) return;

                var data = pnl.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'remove' });
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       if (rs == '0') {
                           window.history.back();
                           document.location.href = urlList;
                       }
                       else {
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập chỉ người tạo ra mới có quyền xóa bỏ');
                       }
                   }
                });
            });

            var btnDatVeThanhToan = pnl.find('.btn-datVeThanhToan');
            btnDatVeThanhToan.click(function () {
                var data = pnl.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'thanhtoan' });
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       if (rs == '0') {
                           document.location.reload();
                       }
                       else {
                           alertErr.fadeIn();
                           alertErr.html('Lỗi');
                       }
                   }
                });
            });

            var autoCompleteElements = $('.form-autocomplete-input');
            $.each(autoCompleteElements, function (i, j) {
                var itemEl = $(j);
                var parentEl = itemEl.parent();
                var btnAutocomplete = parentEl.find('.autocomplete-btn');
                var refId = itemEl.attr('data-refId');
                var refEl = parentEl.find('.' + refId);
                var src = itemEl.attr('data-src');
                btnAutocomplete.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                itemEl.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                bxVinhFn.utils.autoCompleteSearch(itemEl, src, refId
                    , function (event, ui) {
                        refEl.val(ui.item.id);
                    }
                    , function (matcher, item) {
                        if (matcher.test(item.Hint.toLowerCase()) || matcher.test(bxVinhFn.utils.normalizeStr(item.Hint.toLowerCase()))) {
                            return {
                                label: item.Ten,
                                value: item.Ten,
                                id: item.ID,
                                hint: item.Hint
                            };
                        }
                    }
                );
            });

            $('.imgfinder-box').each(function (i, j) {
                var imgBox = $(j);
                var imgChange = imgBox.find('.imgfinder-changeBtn');
                var imgRemove = imgBox.find('.imgfinder-removeBtn');
                bxVinhFn.utils.imgfinder(imgChange, 'Images:/', function (item, _url) {
                    imgBox.find('.Anh').val(_url);
                    imgBox.find('.imgfinder-img').attr('src', _url);
                });
                imgRemove.click(function () {
                    imgBox.find('.Anh').val('');
                    imgBox.find('.imgfinder-img').attr('src', '');
                });
            });
        }
        , headerFn: function () {

            var pnl = $('.ModuleHeader');

            if ($(pnl).length < 1) return;

            var autoCompleteElements = $('.form-autocomplete-input');
            $.each(autoCompleteElements, function (i, j) {
                var itemEl = $(j);
                var parentEl = itemEl.parent();
                var btnAutocomplete = parentEl.find('.autocomplete-btn');
                var refId = itemEl.attr('data-refId');
                var refEl = parentEl.find('.' + refId);
                var src = itemEl.attr('data-src');
                btnAutocomplete.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                itemEl.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                bxVinhFn.utils.autoCompleteSearch(itemEl, src, refId
                    , function (event, ui) {
                        refEl.val(ui.item.id);
                    }
                    , function (matcher, item) {
                        if (matcher.test(item.Hint.toLowerCase()) || matcher.test(bxVinhFn.utils.normalizeStr(item.Hint.toLowerCase()))) {
                            return {
                                label: item.Ten,
                                value: item.Ten,
                                id: item.ID,
                                hint: item.Hint
                            };
                        }
                    }
                );
            });

            var txt = pnl.find('[name="q"]');
            var searchBtn = pnl.find('.searchBtn');

            searchBtn.click(function () {
                var data = pnl.find(':input').serialize();
                document.location.href = '?' + data;
            });
            txt.focus(function () {
                txt.unbind('keypress').bind('keypress', function (evt) {
                    if (evt.keyCode == 13) {
                        evt.preventDefault();
                        var data = pnl.find(':input').serialize();
                        document.location.href = '?' + data;
                        return false;
                    }
                });
            });

        }
        , phepTinh:function (pnl) {
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            // FORM THU
            ////////////////////////////////////////////////////////////////////////////////////////////////////////

            // Giá vé
            var PhoiThuPhiPnl = pnl.find('.Phoi-ThuPhi-Pnl');
            var GiaVe = PhoiThuPhiPnl.find('.GiaVe');
            var HoaHongBanVe = PhoiThuPhiPnl.find('.HoaHongBanVe');
            var PhiTrenMotVe = PhoiThuPhiPnl.find('.PhiTrenMotVe');
            var PHI_BenBai = PhoiThuPhiPnl.find('.PHI_BenBai');
            var Ve = PhoiThuPhiPnl.find('.Ve');
            var PHI_HoaHongBanVe = PhoiThuPhiPnl.find('.PHI_HoaHongBanVe');
            // Truy thu khách
            var KhachTruyThu = PhoiThuPhiPnl.find('.KhachTruyThu');
            var ChuyenTruyThu = PhoiThuPhiPnl.find('.ChuyenTruyThu');
            var PHI_KhachTruyThu = PhoiThuPhiPnl.find('.PHI_KhachTruyThu');
            var PHI_TruyThuGiam = PhoiThuPhiPnl.find('.PHI_TruyThuGiam');
            var PHI_ChuyenTruyThu = PhoiThuPhiPnl.find('.PHI_ChuyenTruyThu');
            // Tổng
            var PHI_Tong = PhoiThuPhiPnl.find('.PHI_Tong');
            var PHI_Nop = PhoiThuPhiPnl.find('.PHI_Nop');
            var PHI_ConNo = PhoiThuPhiPnl.find('.PHI_ConNo');
            
            var PHI_ChiThuBenBai = PhoiThuPhiPnl.find('.PHI_ChiThuBenBai');

            var isChiThuBenBai = PHI_ChiThuBenBai.is(':checked');
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            // HÀM TÍNH TOÁN FORM THU
            ////////////////////////////////////////////////////////////////////////////////////////////////////////

            // HÀM TÍNH TOÁN TRÊN CLIENT
            var thuPhiInputs = PhoiThuPhiPnl.find('.ThuPhi-Input-Item');
            var phiMotChuyenInputs = PhoiThuPhiPnl.find('.ThuPhiMotChuyen-Input-Item');
            var tong = 0;
            

            var chuyenTruyThu = bxVinhFn.utils.getNumberFormMoney(ChuyenTruyThu.val());
            var pHI_BenBai = bxVinhFn.utils.getNumberFormMoney(PHI_BenBai.val());

            var phiMotChuyen = 0;
            $.each(phiMotChuyenInputs, function (i1, i2) {
                var thuPhiItem = $(i2);
                var phi = bxVinhFn.utils.getNumberFormMoney(thuPhiItem.val());
                phiMotChuyen += parseInt(phi);
            });

            var phiBiTruyThu = isChiThuBenBai ? pHI_BenBai : phiMotChuyen;
            var pHI_ChuyenTruyThu = parseInt(chuyenTruyThu) * parseInt(phiBiTruyThu);
            
            PHI_ChuyenTruyThu.val(bxVinhFn.utils.convertNumberToMoney(pHI_ChuyenTruyThu));
            
            $.each(thuPhiInputs, function (i1, i2) {
                var thuPhiItem = $(i2);
                var phi = bxVinhFn.utils.getNumberFormMoney(thuPhiItem.val());
                tong += parseInt(phi);
            });
            

            var pHI_TruyThuGiam = bxVinhFn.utils.getNumberFormMoney(PHI_TruyThuGiam.val());
            var tongSauTru = parseInt(tong) - parseInt(pHI_TruyThuGiam);
            PHI_Tong.val(bxVinhFn.utils.convertNumberToMoney(tongSauTru));
            
            var pHI_NopAll = bxVinhFn.utils.getNumberFormMoney(PHI_Nop.val());
            var pHI_ConNoAll = parseInt(tongSauTru) - parseInt(pHI_NopAll);
            PHI_ConNo.val(bxVinhFn.utils.convertNumberToMoney(pHI_ConNoAll));
            


            bxVinhFn.utils.formatTien(pnl.find('.money-input'));
            

            var thuPhiAllInputs = PhoiThuPhiPnl.find('.money-input');
            thuPhiAllInputs.unbind('keyup').keyup(function () {
                var giaVe = bxVinhFn.utils.getNumberFormMoney(GiaVe.val());
                var hoaHongBanVe = bxVinhFn.utils.getNumberFormMoney(HoaHongBanVe.val());

                var phiTrenMotVe = parseInt(giaVe) * parseInt(hoaHongBanVe) / 100;
                PhiTrenMotVe.val(bxVinhFn.utils.convertNumberToMoney(phiTrenMotVe));

                var isChiThuBenBai1 = PHI_ChiThuBenBai.is(':checked');

                var ve = bxVinhFn.utils.getNumberFormMoney(Ve.val());
                var pHiHoaHongBanVe = parseInt(ve) * parseInt(phiTrenMotVe);
                PHI_HoaHongBanVe.val(bxVinhFn.utils.convertNumberToMoney(pHiHoaHongBanVe));

                var chuyenTruyThu1 = bxVinhFn.utils.getNumberFormMoney(ChuyenTruyThu.val());
                var pHI_BenBai1 = bxVinhFn.utils.getNumberFormMoney(PHI_BenBai.val());

                var phiMotChuyen1 = 0;
                $.each(phiMotChuyenInputs, function (i1, i2) {
                    var thuPhiItem2 = $(i2);
                    var phi2 = bxVinhFn.utils.getNumberFormMoney(thuPhiItem2.val());
                    phiMotChuyen1 += parseInt(phi2);
                });

                var phiBiTruyThu1 = isChiThuBenBai1 ? pHI_BenBai1 : phiMotChuyen1;

                var pHiChuyenTruyThu1 = parseInt(chuyenTruyThu1) * parseInt(phiBiTruyThu1);
                PHI_ChuyenTruyThu.val(bxVinhFn.utils.convertNumberToMoney(pHiChuyenTruyThu1));


                var khachTruyThu = bxVinhFn.utils.getNumberFormMoney(KhachTruyThu.val());
                var pHiKhachTruyThu = parseInt(khachTruyThu) * parseInt(phiTrenMotVe);
                PHI_KhachTruyThu.val(bxVinhFn.utils.convertNumberToMoney(pHiKhachTruyThu));

                var tong1 = 0;
                $.each(thuPhiInputs, function (i3, i4) {
                    var thuPhiItem1 = $(i4);
                    var phi1 = bxVinhFn.utils.getNumberFormMoney(thuPhiItem1.val());
                    tong1 += parseInt(phi1);
                });
                var pHiTruyThuGiam1 = bxVinhFn.utils.getNumberFormMoney(PHI_TruyThuGiam.val());
                var tongSauTru1 = parseInt(tong1) - parseInt(pHiTruyThuGiam1);

                PHI_Tong.val(bxVinhFn.utils.convertNumberToMoney(tongSauTru1));

                var pHiNop = bxVinhFn.utils.getNumberFormMoney(PHI_Nop.val());
                var pHiConNo = parseInt(tongSauTru1) - parseInt(pHiNop);
                PHI_ConNo.val(bxVinhFn.utils.convertNumberToMoney(pHiConNo));

            });
        }
        , addPhoi:function () {
            var pnl = $('.Phoi-ThongTinXe-Pnl');
            if ($(pnl).length < 1) return;
            var draff = pnl.attr('data-draff');
            if (draff == 'true') {
                bxVinhFn.normalFormFn.clearPhoiForm();
                bxVinhFn.normalFormFn.addPhoiCurrent();
            }
            else {
                pnl.find('.panel-footer').show();
                pnl.find('.panel-footer-saved').show();
                pnl.find('.panel-footer-insert').hide();
                bxVinhFn.normalFormFn.addPhoiValidatorFn();
            }
            var PHI_ChiThuBenBai = pnl.find('.PHI_ChiThuBenBai');

            var pnlTruyThuChamCongBodyPnl = pnl.find('.Phoi-TruyThuNgayChamCongPnl-Body');

            PHI_ChiThuBenBai.unbind('click').click(function() {
                bxVinhFn.normalFormFn.phepTinh(pnl);
            });

            var url = pnl.attr('data-url');
            var urlSuccess = pnl.attr('data-success');
            var urlList = pnl.attr('data-list');
            
            var btn = pnl.find('.saveBtn');
            var truyThuBtn = pnl.find('.truyThuBtn');
            var restoreBtn = pnl.find('.restoreBtn');
            
            var editBtn = pnl.find('.editBtn');
            var newBtn = pnl.find('.newBtn');
            var printBtn = pnl.find('.printBtn');


            var alertErr = pnl.find('.alert-danger');
            var alertOk = pnl.find('.alert-success');
            var truyThuChamCongPnl = pnl.find('.Phoi-TruyThuPnl-ChamCongPnl');
            var phoiNghiepVuHanPnl = pnl.find('.Phoi-NghiepVu-HanPnl');
            var phoiThuPhiPnl = pnl.find('.Phoi-ThuPhi-Pnl');
            
            // Phục hồi trạng thái yêu cầu xử lý
            restoreBtn.unbind('click').click(function() {
                var xvbId = pnl.find('.XVB_ID');
                var id = xvbId.val();
                if(id=='0' || id=='') {
                    return;
                }
                var urlXeVaoBen = '/lib/ajax/XeVaoBen/Default.aspx';
                $.ajax({
                    url: urlXeVaoBen,
                    data: {
                        subAct: 'RestoreXeChuaXuLy'
                        , Id : id
                    },
                    success: function (rs) {
                        $('.Phoi-NghiepVu-Pnl').removeClass('Phoi-NghiepVuActive-Pnl');
                        bxVinhFn.normalFormFn.clearPhoiForm();
                        restoreBtn.hide();
                    }
                });
            });

            // Lưu dữ liệu phơi
            btn.unbind('click').click(function () {
                
                var laixeTen = pnl.find('.LAIXE_Ten');
                var xeBienSo = pnl.find('.XE_BienSo');
                
                if (laixeTen.val() == '' ) {
                    alertErr.show();
                    alertErr.html('Nhập lái xe');
                    laixeTen.focus();
                    setTimeout(function() {
                        alertErr.hide();
                    }, 2000);
                    return;
                }
                
                if ( xeBienSo.val() == '') {
                    alertErr.show();
                    alertErr.html('Nhập xe');
                    xeBienSo.focus();
                    setTimeout(function () {
                        alertErr.hide();
                    }, 2000);
                    return;
                }
                
                var hanPnl = pnl.find('.Phoi-NghiepVu-HanPnl');
                var xeKhoa = hanPnl.find('.E_Khoa');
                var isKhoa = xeKhoa.is(':checked');

                var totalValidator = hanPnl.find('.DateValidator-Fail');

                var hopLe = false;
                if ($(totalValidator).length < 1 && !isKhoa) {
                    hopLe = true;
                }
                var hopLeStr = hopLe ? "1" : "0";

                alertErr.hide();
                alertOk.hide();

                var disabled = pnl.find(':input:disabled').removeAttr('disabled');

                // serialize the form
                var data = pnl.find(':input').serializeArray();

                // re-disabled the set of inputs that you previously enabled
                disabled.attr('disabled', 'disabled');
                
                data.push({ name: 'subAct', value: 'save' });
                data.push({ name: 'hopLe', value: hopLeStr });
                bxVinhFn.utils.loader('Đang lưu', true);
                xeLenPhoiHolder = true;
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') { // E-mail or username is not avaiable
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           setTimeout(function() {
                               alertOk.hide();
                           },1000);
                           bxVinhFn.utils.loader('Đang lưu', false);
                           pnl.find('.panel-footer-saved').show();
                           pnl.find('.panel-footer-saved').find('.btn').attr('data-id', rs);
                           printBtn.attr('href', printBtn.attr('data-url') + '?ID=' + rs);
                           editBtn.attr('href', editBtn.attr('data-url') + '?ID=' + rs);
                           pnl.find('.panel-footer-insert').hide();
                           dangCapPhoi = false;
                       }
                   }
                   , complete: function () {
                       xeLenPhoiHolder = false;
                   }
                });
            });

            // Truy thu
            truyThuBtn.unbind('click').click(function() {
                var laixeTen = pnl.find('.LAIXE_Ten');
                var xeBienSo = pnl.find('.XE_BienSo');

                if (laixeTen.val() == '') {
                    alertErr.show();
                    alertErr.html('Nhập lái xe');
                    laixeTen.focus();
                    setTimeout(function () {
                        alertErr.hide();
                    }, 2000);
                    return;
                }

                if (xeBienSo.val() == '') {
                    alertErr.show();
                    alertErr.html('Nhập xe');
                    xeBienSo.focus();
                    setTimeout(function () {
                        alertErr.hide();
                    }, 2000);
                    return;
                }

                alertErr.hide();
                alertOk.hide();

                var disabled = pnl.find(':input:disabled').removeAttr('disabled');

                // serialize the form
                var data = pnl.find(':input').serializeArray();

                // re-disabled the set of inputs that you previously enabled
                disabled.attr('disabled', 'disabled');

                data.push({ name: 'subAct', value: 'save' });
                data.push({ name: 'saveType', value: 'truyThu' });
                bxVinhFn.utils.loader('Đang lưu', true);
                xeLenPhoiHolder = true;
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') { // E-mail or username is not avaiable
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           setTimeout(function () {
                               alertOk.hide();
                           }, 1000);
                           bxVinhFn.utils.loader('Đang lưu', false);
                           pnl.find('.panel-footer-saved').show();
                           pnl.find('.panel-footer-saved').find('.btn').attr('data-id', rs);
                           printBtn.attr('href', printBtn.attr('data-url') + '?ID=' + rs);
                           editBtn.attr('href', editBtn.attr('data-url') + '?ID=' + rs);
                           pnl.find('.panel-footer-insert').hide();
                           dangCapPhoi = false;
                       }
                   }
                   , complete: function () {
                       xeLenPhoiHolder = false;
                   }
                });
            });

            // Nút tạo mới
            newBtn.unbind('click').click(function () {
                bxVinhFn.normalFormFn.clearPhoiForm();
                bxVinhFn.normalFormFn.addPhoiCurrent(function () {
                    bxVinhFn.normalFormFn.addPhoiGetLates();
                });
                window.history.pushState('obj', 'Thêm mới', '/lib/pages/Phoi/Add.aspx');

            });


            var autoCompletePhoiChonLaiXe = pnl.find('.form-autocomplete-input-Phoi-ChonLaiXe');
            $.each(autoCompletePhoiChonLaiXe, function (i, j) {
                var itemEl = $(j);
                var parentEl = itemEl.parent();
                var btnAutocomplete = parentEl.find('.autocomplete-btn');
                var refId = itemEl.attr('data-refId');
                var refEl = parentEl.find('.' + refId);
                var src = itemEl.attr('data-src');
                btnAutocomplete.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                itemEl.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                bxVinhFn.utils.autoCompleteSearch(itemEl, src, refId
                    , function (event, ui) {
                        refEl.val(ui.item.id);
                        var NgayHetHanBangLaiStr = phoiNghiepVuHanPnl.find('.NgayHetHanBangLaiStr');
                        var NgayHetHanGiayKhamSucKhoeStr = phoiNghiepVuHanPnl.find('.NgayHetHanGiayKhamSucKhoeStr');
                        NgayHetHanBangLaiStr.html(ui.item.NgayHetHanBangLaiStr);
                        NgayHetHanGiayKhamSucKhoeStr.html(ui.item.NgayHetHanGiayKhamSucKhoeStr);
                        bxVinhFn.normalFormFn.addPhoiValidatorFn();

                    }
                    , function (matcher, item) {
                        if (matcher.test(item.Ten.toLowerCase()) || matcher.test(adm.normalizeStr(item.Ten.toLowerCase()))) {
                            return {
                                label: item.Ten,
                                value: item.Ten,
                                id: item.ID,
                                loaiBang: item.LoaiBang,
                                khoa: item.Khoa,
                                hopLe: item.HopLe,
                                hopLeThongBao: item.HopLeThongBao
                                , NgayHetHanBangLaiStr: item.NgayHetHanBangLaiStr
                                , NgayHetHanGiayKhamSucKhoeStr: item.NgayHetHanGiayKhamSucKhoeStr
                            };
                        }
                    }
                );

                itemEl.data('ui-autocomplete')._renderItem = function (ul, item) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a href=\"javascript:;\"><strong class=\"" + (item.hopLe ? "" : "ui-state-error-text") + "\">" + item.label + " (" + item.loaiBang + ")</strong> " + (item.hopLe ? "" : item.hopLeThongBao) + "</a>")
                        .appendTo(ul);
                };
            });

            // Autocomplete in Phoi/Xe
            
            var autoCompletePhoiChonXe = pnl.find('.form-autocomplete-input-Phoi-ChonXe');
            $.each(autoCompletePhoiChonXe, function (i, j) {
                var itemEl = $(j);
                var parentEl = itemEl.parent();
                var btnAutocomplete = parentEl.find('.autocomplete-btn');
                var refId = itemEl.attr('data-refId');
                var refEl = parentEl.find('.' + refId);
                var src = itemEl.attr('data-src');
                btnAutocomplete.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                itemEl.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                bxVinhFn.utils.autoCompleteSearch(itemEl, src, refId
                    , function (event, ui) {
                        refEl.val(ui.item.id);
                        bxVinhFn.normalFormFn.chonXeHandler(ui.item.id, ui.item.label, '');

                        //Phoi-TruyThuPnl-ChamCongPnl
                    }
                    , function (matcher, item) {
                        if (matcher.test(item.Hint.toLowerCase()) || matcher.test(adm.normalizeStr(item.Hint.toLowerCase()))) {
                            return {
                                label: item.Bien,
                                value: item.Bien,
                                id: item.ID,
                                hint: item.Hint
                            };
                        }
                    }
                );

                itemEl.data('ui-autocomplete')._renderItem = function (ul, item) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a href=\"javascript:;\">" + item.label + "</a>")
                        .appendTo(ul);
                };

            });

            bxVinhFn.normalFormFn.phepTinh(pnl);

            var chuyenTruyThu = phoiThuPhiPnl.find('.ChuyenTruyThu');
            $('.Phoi-TruyThuPnl-ChamCongPnl').on('click', '.ChamCongTd-Item-Clickable', function () {
                var item = $(this);
                var ngay = item.attr('data-ngay');
                var tangCuong = item.attr('data-tangCuong');
                var phoiId = pnl.find('.ID').val();
                var id = item.attr('data-id');
                var data = [];
                data.push({ name: 'Ngay', value: ngay });
                data.push({ name: 'TangCuong', value: tangCuong });
                data.push({ name: 'PhoiId', value: phoiId });
                
                if (item.hasClass('ChamCongTd-Item-Clickable-Active')) {
                    item.removeClass('ChamCongTd-Item-Clickable-Active');
                    data.push({ name: 'subAct', value: 'XoaChamCongDraff' });
                    data.push({ name: 'ID', value: id });
                    id = item.attr('data-id');
                    $('.addPhoiTruyThuChamCong-Item[data-id="' + id +'"]').remove();
                }
                else {
                    item.addClass('ChamCongTd-Item-Clickable-Active');
                    data.push({ name: 'subAct', value: 'LuuChamCongDraff' });
                }
                xeLenPhoiHolder = true;
                $.ajax({
                    url: bxVinhFn.url.chamCong,
                    data: data ,
                    success: function (rs) {
                        var newItem = $(rs).appendTo(pnlTruyThuChamCongBodyPnl);
                        var newId = newItem.attr('data-id');
                        newItem.find('a').click(function() {
                            $('td.ChamCongTd-Item-Clickable-Active[data-id="' + newId + '"]').click();
                        });
                        item.attr('data-id', newId);
                        
                        var totalChuyenTruyThu = truyThuChamCongPnl.find('.ChamCongTd-Item-Clickable-Active').length;
                        var totalChuyenBiTruyThu = pnlTruyThuChamCongBodyPnl.find('.ChamCongTruyChuCkb:checked').length;
                        
                        chuyenTruyThu.val(totalChuyenBiTruyThu);
                        var phoiTruyThuPnlId = $('#Phoi-TruyThuNgayChamCongPnl-Body');
                        if (parseInt(totalChuyenTruyThu) > 0) {
                            if (!phoiTruyThuPnlId.hasClass('in')) {
                                phoiTruyThuPnlId.addClass('collapsing');
                                setTimeout(function () {
                                    $('#Phoi-TruyThuNgayChamCongPnl-Body').removeClass('collapsing');
                                    $('#Phoi-TruyThuNgayChamCongPnl-Body').addClass('in');
                                }, 500);
                            }
                        } else {
                            $('#Phoi-TruyThuNgayChamCongPnl-Body').removeClass('in');
                        }
                        setTimeout(function () {
                            bxVinhFn.normalFormFn.phepTinh(pnl);
                        }, 100);
                    },
                    complete: function (rs) {
                        xeLenPhoiHolder = false;
                    }
                });
            });

            $('.Phoi-TruyThuNgayChamCongPnl-Body').on('click', '.ChamCongTruyChuCkb', function () {
                var totalChuyenTruyThu = truyThuChamCongPnl.find('.ChamCongTd-Item-Clickable-Active').length;
                var totalChuyenBiTruyThu = pnlTruyThuChamCongBodyPnl.find('.ChamCongTruyChuCkb:checked').length;

                chuyenTruyThu.val(totalChuyenBiTruyThu);
                var phoiTruyThuPnlId = $('#Phoi-TruyThuNgayChamCongPnl-Body');
                if (parseInt(totalChuyenTruyThu) > 0) {
                    if (!phoiTruyThuPnlId.hasClass('in')) {
                        phoiTruyThuPnlId.addClass('collapsing');
                        setTimeout(function () {
                            $('#Phoi-TruyThuNgayChamCongPnl-Body').removeClass('collapsing');
                            $('#Phoi-TruyThuNgayChamCongPnl-Body').addClass('in');
                        }, 500);
                    }
                } else {
                    $('#Phoi-TruyThuNgayChamCongPnl-Body').removeClass('in');
                }
                setTimeout(function () {
                    bxVinhFn.normalFormFn.phepTinh(pnl);
                }, 100);
            });

            $('.Phoi-TruyThuNgayChamCongPnl-Body').on('blur', '.addPhoiTruyThuChamCong-Item-InputAjax', function () {
                var item = $(this);
                var pform = item.parent();
                var id = $(item).attr('data-id');
                var data = pform.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'UpdateChamCongDraff' });
                data.push({ name: 'ID', value: id });
                xeLenPhoiHolder = true;
                $.ajax({
                    url: bxVinhFn.url.chamCong,
                    data: data,
                    complete: function (rs) {
                        xeLenPhoiHolder = false;
                    }
                });
            });

            $('.Phoi-TruyThuNgayChamCongPnl-Body').on('blur', '.ChamCongTruyChuCkb', function () {
                var item = $(this);
                var pform = item.parent().parent().parent();
                var id = $(item).attr('data-id');
                var data = pform.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'UpdateChamCongDraff' });
                data.push({ name: 'ID', value: id });
                xeLenPhoiHolder = true;
                $.ajax({
                    url: bxVinhFn.url.chamCong,
                    data: data,
                    complete: function (rs) {
                        xeLenPhoiHolder = false;
                    }
                });
            });

            // Add shortcut
            $(document).bind('keydown', 'f8', function () {
                btn.click();
            });
            $('input').bind('keydown', 'f8', function () {
                btn.click();
            });

            $(document).on('keydown', null, 'f9', function () {
                truyThuBtn.click();
            });
            $('input').on('keydown', null, 'f9', function () {
                truyThuBtn.click();
            });
            
            $(document).bind('keydown', 'f10', function () {
                restoreBtn.click();
            });
            $('input').bind('keydown', 'f10', function () {
                restoreBtn.click();
            });

            $(document).bind('keydown', 'f6', function () {
                newBtn.click();
            });
            $('input').bind('keydown', 'f6', function () {
                newBtn.click();
            });
            
        }
        , addPhoiValidatorFn:function() {
            var pnl = $('.Phoi-ThongTinXe-Pnl');
            if ($(pnl).length < 1) return;
            var hanPnl = pnl.find('.Phoi-NghiepVu-HanPnl');
            var dateValidator = hanPnl.find('.DateValidator');
            var todayStr = pnl.find('.NgayXuatBen').val();
            if (todayStr == '') return;
            var today = bxVinhFn.utils.convertToDate(todayStr);
            $.each(dateValidator, function(i,j) {
                var item = $(j);
                var txt = item.html();
                if (txt != '') {
                    var d = bxVinhFn.utils.convertToDate(txt);
                    var rs = d < today;
                    if(rs) {
                        item.addClass('DateValidator-Fail');
                    }
                    else {
                        item.removeClass('DateValidator-Fail');
                    }
                }
                
            });

            var xeKhoa = hanPnl.find('.E_Khoa');
            var isKhoa = xeKhoa.is(':checked');

            var totalValidator = hanPnl.find('.DateValidator-Fail');
            if($(totalValidator).length <1 && !isKhoa) {
                hanPnl.fadeOut(500);
            }
            else {
                hanPnl.fadeIn(500);
            }
        }
        , addPhoiGetLates:function () {
            var pnl = $('.Phoi-ThongTinXe-Pnl');
            if ($(pnl).length < 1) return;
            var url = pnl.attr('data-url');
            var data = [];
            data.push({ name: 'subAct', value: 'getLatest' });
            bxVinhFn.utils.loader('Nạp dữ liệu', true);
            xeLenPhoiHolder = true;
            $.ajax({
                url: url
                , type: 'POST'
                , data: data
               , success: function (rs) {
                   bxVinhFn.utils.loader('Nạp dữ liệu', false);
                   var dt = eval(rs);
                   console.log(dt);
                   pnl.find('.STTBX').val(dt.STTBXStr);
                   pnl.find('.STTALL').val(dt.STTALLStr);
                   pnl.find('.ID').val(dt.ID);
               }
               , complete: function () {
                   xeLenPhoiHolder = false;
               }
            });
        }
        , addPhoiCurrent: function (fn) {
            var pnl = $('.Phoi-ThongTinXe-Pnl');
            var url = '/lib/ajax/XeVaoBen/Default.aspx';
            xeLenPhoiHolder = true;
            $.ajax({
                url: url,
                data: {
                    subAct: 'GetCurrentCapPhoi'
                },
                success: function (rs) {
                   if(rs!='') {
                       var dt = eval(rs);
                       $('.restoreBtn').show();
                       pnl.find('.XVB_ID').val(dt.ID);
                       bxVinhFn.normalFormFn.chonXeHandler(dt.XE_ID, dt.BienSo, dt.ID);
                   }
                   else {
                       if (typeof (fn) == "function") {
                           fn();
                       }
                   }
                },
                complete: function (rs) {
                    xeLenPhoiHolder = false;
                }
            });
        }
        , clearPhoiForm:function () {
            var pnl = $('.Phoi-ThongTinXe-Pnl');
            var alertErr = pnl.find('.alert-danger');
            var alertOk = pnl.find('.alert-success');
            alertErr.hide();
            alertOk.hide();
            if ($(pnl).length > 0) {
                pnl.find('.Phoi-NghiepVu-HanPnl').hide();
                pnl.find('input:not([form-control-hasDefalltValue])').val('');
                pnl.find('.restoreBtn').hide();
                pnl.find('.panel-footer').hide();
                pnl.find('.help-block').hide();
                //pnl.attr('data-id', '');
                //pnl.find('.Id').val('');
                pnl.find('.CQ_ID').val('');
                pnl.find('.XVB_ID').val('');
                pnl.find('.panel-footer-saved').show();
                pnl.find('.panel-footer-insert').hide();
                pnl.find('.Phoi-NghiepVu-Pnl').removeClass('Phoi-NghiepVuActive-Pnl');
                
            }
        }
        , chonXeHandler: function (id, bx, xvbId) {
            dangCapPhoi = true;

            var pnl = $('.Phoi-ThongTinXe-Pnl');
            var alertErr = pnl.find('.alert-danger');
            var alertOk = pnl.find('.alert-success');
            alertErr.hide();
            alertOk.hide();
            
            pnl.find('.panel-footer-saved').hide();
            pnl.find('.panel-footer-insert').show();
            pnl.find('.panel-footer').show();
            var itemEl = pnl.find('.form-autocomplete-input-Phoi-ChonXe');
            var xeId = pnl.find('.XE_ID');
            
            var truyThuChamCongPnl = pnl.find('.Phoi-TruyThuPnl-ChamCongPnl');
            var phoiNghiepVuHanPnl = pnl.find('.Phoi-NghiepVu-HanPnl');
            var ngayXuatBen = pnl.find('.NgayXuatBen');
            var pnlTruyThuChamCongBodyPnl = pnl.find('.Phoi-TruyThuNgayChamCongPnl-Body');
            itemEl.val(bx);
            xeId.val(id);

                var data = [];
                 data.push({ name: 'subAct', value: 'GetById' });
                 data.push({ name: 'Id', value: id });
                 data.push({ name: 'XVB_ID', value: xvbId });
                 data.push({ name: 'NgayXuatBen', value: ngayXuatBen.val() });
                xeLenPhoiHolder = true;
                $.ajax({
                    url: '/lib/ajax/Xe/Default.aspx'
                    , type: 'POST'
                    , data: data
                    , success: function (rs) {

                        $('.Phoi-NghiepVu-Pnl').addClass('Phoi-NghiepVuActive-Pnl');

                        var dt = eval(rs);

                        var thongTinXePnl = $('.Phoi-ThongTinXe-Pnl');

                        var LAIXE_Ten = thongTinXePnl.find('.LAIXE_Ten');
                        var LAIXE_ID = thongTinXePnl.find('.LAIXE_ID');
                        var DONVI_Ten = thongTinXePnl.find('.DONVI_Ten');
                        var DI_Ten = thongTinXePnl.find('.DI_Ten');
                        var DEN_Ten = thongTinXePnl.find('.DEN_Ten');
                        var GioXuatBen = thongTinXePnl.find('.GioXuatBen');
                               
                        // Hạn
                        var TuyenCoDinhStr = phoiNghiepVuHanPnl.find('.TuyenCoDinhStr');
                        var LuuHanhStr = phoiNghiepVuHanPnl.find('.LuuHanhStr');
                        var BaoHiemStr = phoiNghiepVuHanPnl.find('.BaoHiemStr');
                        var NgayHetHanBangLaiStr = phoiNghiepVuHanPnl.find('.NgayHetHanBangLaiStr');
                        var NgayHetHanGiayKhamSucKhoeStr = phoiNghiepVuHanPnl.find('.NgayHetHanGiayKhamSucKhoeStr');
                        var XE_Khoa = phoiNghiepVuHanPnl.find('.XE_Khoa');
                               
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        // FORM THU
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                               
                        // Giá vé
                        var PhoiThuPhiPnl = pnl.find('.Phoi-ThuPhi-Pnl');
                        var GiaVe = PhoiThuPhiPnl.find('.GiaVe');
                        var HoaHongBanVe = PhoiThuPhiPnl.find('.HoaHongBanVe');
                        var PhiTrenMotVe = PhoiThuPhiPnl.find('.PhiTrenMotVe');
                        var PHI_BenBai = PhoiThuPhiPnl.find('.PHI_BenBai');
                        var Ve = PhoiThuPhiPnl.find('.Ve');
                        var PHI_HoaHongBanVe = PhoiThuPhiPnl.find('.PHI_HoaHongBanVe');
                        // Truy thu khách
                        var KhachTruyThu = PhoiThuPhiPnl.find('.KhachTruyThu');
                        var PHI_KhachTruyThu = PhoiThuPhiPnl.find('.PHI_KhachTruyThu');
                        var PHI_TruyThuGiam = PhoiThuPhiPnl.find('.PHI_TruyThuGiam');
                        // Tổng
                        var PHI_Tong = PhoiThuPhiPnl.find('.PHI_Tong');
                        var PHI_Nop = PhoiThuPhiPnl.find('.PHI_Nop');
                        var PHI_ConNo = PhoiThuPhiPnl.find('.PHI_ConNo');
                               
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        // FORM MODAL
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                               
                        var TruyThuModal = pnl.find('#TruyThuModal');
                        var GiaTienDichVuTrongHopDong = TruyThuModal.find('.GiaTienDichVuTrongHopDong');
                        var SoChuyenBieuDo = TruyThuModal.find('#SoChuyenBieuDo');
                        var TongTruyThu = TruyThuModal.find('#TongTruyThu');
                        var GiamTru = TruyThuModal.find('#GiamTru');
                        var ConLai = TruyThuModal.find('#ConLai');


                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        // BIND DỮ LIỆU TỪ AJAX
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                               
                        LAIXE_Ten.val(dt.LaiXe.Ten);
                        LAIXE_ID.val(dt.LaiXe.ID);
                        TuyenCoDinhStr.html(dt.TuyenCoDinhStr);
                        LuuHanhStr.html(dt.LuuHanhStr);
                        BaoHiemStr.html(dt.BaoHiemStr);
                        NgayHetHanBangLaiStr.html(dt.LaiXe.NgayHetHanBangLaiStr);
                        NgayHetHanGiayKhamSucKhoeStr.html(dt.LaiXe.NgayHetHanGiayKhamSucKhoeStr);

                        if(dt.Khoa) {
                            XE_Khoa.attr('checked', 'checked');
                        } else {
                            XE_Khoa.removeAttr('checked');
                        }
                        bxVinhFn.normalFormFn.addPhoiValidatorFn();

                        HoaHongBanVe.val(dt.Tuyen.HoaHongBanVe);
                        GiaTienDichVuTrongHopDong.val(dt.MucPhi);
                        PHI_BenBai.val(dt.MucPhi);
                        Ve.val(dt.SoKhach);
                        GiaVe.val(dt.GiaVe);
                        PhiTrenMotVe.val(dt.GiaVe * dt.Tuyen.HoaHongBanVe / 100);

                        PHI_HoaHongBanVe.val(dt.GiaVe * dt.Tuyen.HoaHongBanVe / 100 * dt.SoKhach);


                        PHI_BenBai.val();
                        DONVI_Ten.val(dt.DONVI_Ten);
                        DONVI_Ten.val(dt.DONVI_Ten);
                        DI_Ten.val(dt.Tuyen.DI_Ten);
                        DEN_Ten.val(dt.Tuyen.DEN_Ten);
                        GioXuatBen.val(dt.GioXuatBen);
                               
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        // HÀM TÍNH TOÁN TRÊN MODAL FORM
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        $(TongTruyThu).unbind('keyup').keyup(function () {
                            var tongModal = parseInt(bxVinhFn.utils.getNumberFormMoney(TongTruyThu.val()));
                            var giamModal = parseInt(bxVinhFn.utils.getNumberFormMoney(GiamTru.val()));
                            var conModal = tongModal - giamModal;
                            ConLai.val(bxVinhFn.utils.convertNumberToMoney(conModal));
                        });
                        $(GiamTru).unbind('keyup').keyup(function () {
                            var tongModal = parseInt(bxVinhFn.utils.getNumberFormMoney(TongTruyThu.val()));
                            var giamModal = parseInt(bxVinhFn.utils.getNumberFormMoney(GiamTru.val()));
                            var conModal = tongModal - giamModal;
                            ConLai.val(bxVinhFn.utils.convertNumberToMoney(conModal));
                        });

                        $(GiaTienDichVuTrongHopDong).unbind('keyup').keyup(function () {
                            var soChuyen = parseInt(bxVinhFn.utils.getNumberFormMoney(SoChuyenBieuDo.val()));
                            var giaChuyen = parseInt(bxVinhFn.utils.getNumberFormMoney(GiaTienDichVuTrongHopDong.val()));
                            var tongModal = (soChuyen * giaChuyen);
                            TongTruyThu.val(bxVinhFn.utils.convertNumberToMoney(tongModal));
                            var giamModal = parseInt(GiamTru.val());
                            var conModal = tongModal - giamModal;
                            ConLai.val(bxVinhFn.utils.convertNumberToMoney(conModal));
                        });


                               
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        // HÀM TÍNH TOÁN FORM THU
                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
                        bxVinhFn.utils.formatTien(pnl.find('.money-input'));

                        // HÀM TÍNH TOÁN TRÊN CLIENT
                        bxVinhFn.normalFormFn.phepTinh(pnl);
                               
                    }
                    , complete: function () {
                        xeLenPhoiHolder = false;
                    }
                });
                pnlTruyThuChamCongBodyPnl.html('');
                truyThuChamCongPnl.html('Đang nạp...');
                data = [];
                data.push({ name: 'subAct', value: 'BangChamCongTheoXe' });
                data.push({ name: 'XE_ID', value: id });
                data.push({ name: 'NgayXuatBen', value: ngayXuatBen.val() });
                xeLenPhoiHolder = true;
                $.ajax({
                    url: '/lib/ajax/ChamCong/Default.aspx'
                    , type: 'POST'
                    , data: data
                    , success: function (rs) {
                        truyThuChamCongPnl.html(rs);
                    },
                    complete:function () {
                        xeLenPhoiHolder = false;
                    }
                });
        }
        , XeVaoBenTodayList: function () {
            var url = bxVinhFn.url.xeVaoBen;
            var pnl = $('.XeRaVaoToDayList');
            if ($(pnl).length > 0) {
                var timerXeVaoRaTodayList;

                var ajaxUpdateTodayList = function () {
                    $.ajax({
                        url: url,
                        data: {
                            subAct: 'GetNewers'
                        },
                        success: function (rs) {
                            pnl.html('');
                            $(rs).prependTo(pnl);
                            if (timerXeVaoRaTodayList) clearTimeout(timerXeVaoRaTodayList);
                            timerXeVaoRaTodayList = setTimeout(function () {
                                ajaxUpdateTodayList();
                            }, globalTimeout);
                        }
                    });
                };

                ajaxUpdateTodayList();

            }

            $(pnl).on('click', 'button', function() {
                var item = $(this);
                item.removeClass('btn-warning');
                item.addClass('btn-default');
                var id = item.attr('data-id');
                $.ajax({
                    url: url,
                    data: {
                        subAct: 'YeuCauXuLy'
                        , Id : id
                    },
                    success: function (rs) {
                    }
                });
            });


            var phoiHangDoiPnl = $('.Phoi-HangDoi-XeYeuCauXuLy-Pnl');
            if ($(phoiHangDoiPnl).length > 0) {
                var body = phoiHangDoiPnl.find('.Phoi-HangDoi-XeYeuCauXuLy-Body');
                
                var timerYeuCauXuLyHangDoiList;

                var ajaxYeuCauXuLyHangDoi = function () {
                    if(xeLenPhoiHolder) {
                        if (timerYeuCauXuLyHangDoiList) clearTimeout(timerYeuCauXuLyHangDoiList);
                        timerYeuCauXuLyHangDoiList = setTimeout(function () {
                            ajaxYeuCauXuLyHangDoi();
                        }, globalTimeout);
                        return;
                    }
                    xeLenPhoiHolder = true;
                    $.ajax({
                        url: url,
                        data: {
                            subAct: 'GetYeuCauXuLyListByUsername'
                        },
                        success: function (rs) {
                            body.html('');
                            $(rs).prependTo(body);
                        }
                        , complete: function () {
                            xeLenPhoiHolder = false;
                            if (timerYeuCauXuLyHangDoiList) clearTimeout(timerYeuCauXuLyHangDoiList);
                            timerYeuCauXuLyHangDoiList = setTimeout(function () {
                                ajaxYeuCauXuLyHangDoi();
                            }, globalTimeout);
                        }
                    });
                };
                ajaxYeuCauXuLyHangDoi();

                $(phoiHangDoiPnl).on('click', 'button', function (e) {
                    var item = $(this);
                    var id = item.attr('data-xvbId');
                    item.parent().parent().remove();
                    $.ajax({
                        url: url,
                        data: {
                            subAct: 'YeuCauXuatBen'
                            , Id: id
                        },
                        success: function (rs) {
                        }
                    });
                    e.stopPropagation();
                });

                $(phoiHangDoiPnl).on('click', '.list-group-item', function (e) {
                    if (e.target !== this) return;
                    var item = $(this);
                    var id = item.attr('data-id');
                    var xvbId = item.attr('data-xvbId');
                    var bx = item.attr('data-bx');
                    item.fadeOut(1000);
                    setTimeout(function() {
                        item.remove();
                    }, 400);
                    $('.XVB_ID').val(xvbId);
                    bxVinhFn.normalFormFn.chonXeHandler(id, bx, xvbId);
                    $('.restoreBtn').show();
                });
                
                $(phoiHangDoiPnl).on('mouseenter', function () {
                    xeLenPhoiHolder = true;
                });
                $(phoiHangDoiPnl).on('mouseleave', function () {
                    xeLenPhoiHolder = false;
                });

            }
            
            var deNghiTruyThuPnl = $('.Phoi-DeNghiTruyThu-Pnl');
            if ($(deNghiTruyThuPnl).length > 0) {
                var bodyDeNghiTruyThu = deNghiTruyThuPnl.find('.Phoi-DeNghiTruyThu-Body');
                
                var timerDeNghiTruyThu;

                var ajaxDeNghiTruyThu = function () {
                    
                    if (xeLenPhoiHolder) {
                        if (timerDeNghiTruyThu) clearTimeout(timerDeNghiTruyThu);
                        timerDeNghiTruyThu = setTimeout(function () {
                            ajaxDeNghiTruyThu();
                        }, globalTimeout * 5);
                        return;
                    }
                    xeLenPhoiHolder = true;
                    $.ajax({
                        url: url,
                        data: {
                            subAct: 'ListDuyetDeNghiTruyThu'
                        },
                        success: function (rs) {
                            bodyDeNghiTruyThu.html('');
                            $(rs).prependTo(bodyDeNghiTruyThu);
                            if(rs=='') {
                                deNghiTruyThuPnl.hide();
                            }else {
                                deNghiTruyThuPnl.show();
                            }
                            
                        }
                        , complete: function () {
                            xeLenPhoiHolder = false;
                            if (timerDeNghiTruyThu) clearTimeout(timerDeNghiTruyThu);
                            timerDeNghiTruyThu = setTimeout(function () {
                                ajaxDeNghiTruyThu();
                            }, globalTimeout * 5);
                        }
                    });
                };
                setTimeout(function() {
                    ajaxDeNghiTruyThu();
                }, globalTimeout / 2);
            }
        }
        , XeChoThanhToanList: function () {
            var url = '/lib/ajax/XeVaoBen/Default.aspx';
            var pnl = $('.XeChoThanhToanList');
            if ($(pnl).length > 0) {
                var timerChoThanhToanList;

                var ajaxUpdateChoThanhToanList = function () {
                    
                    if (xeLenPhoiHolder) {
                        if (timerChoThanhToanList) clearTimeout(timerChoThanhToanList);
                        timerChoThanhToanList = setTimeout(function () {
                            ajaxUpdateChoThanhToanList();
                        }, globalTimeout);
                        return;
                    }

                    $.ajax({
                        url: url,
                        data: {
                            subAct: 'GetChoThanhToan'
                        },
                        success: function (rs) {
                            pnl.html('');
                            $(rs).prependTo(pnl);
                            if (timerChoThanhToanList) clearTimeout(timerChoThanhToanList);
                            timerChoThanhToanList = setTimeout(function () {
                                ajaxUpdateChoThanhToanList();
                            }, globalTimeout);
                        }
                    });
                };

                ajaxUpdateChoThanhToanList();

            }

            $(pnl).on('click', 'button', function () {
                var item = $(this);
                item.removeClass('btn-warning');
                item.addClass('btn-default');
                var id = item.attr('data-id');
                xeLenPhoiHolder = true;
                $.ajax({
                    url: url,
                    data: {
                        subAct: 'YeuCauThanhToan'
                        , Id: id
                    },
                    success: function (rs) {
                    },
                    complete:function () {
                        xeLenPhoiHolder = false;
                    }
                });
            });
            
            var phoiHangDoiPnl = $('.ThuChi-HangDoi-XeYeuCauThanhToan-Pnl');
            if ($(phoiHangDoiPnl).length > 0) {
                var body = phoiHangDoiPnl.find('.ThuChi-HangDoi-XeYeuCauThanhToan-Body');

                var timerYeuCauThanhToanHangDoiList;
                var ajaxYeuCauThanhToanHangDoi = function () {
                    if (xeLenPhoiHolder) {
                        if (timerYeuCauThanhToanHangDoiList) clearTimeout(timerYeuCauThanhToanHangDoiList);
                        timerYeuCauThanhToanHangDoiList = setTimeout(function () {
                            ajaxYeuCauThanhToanHangDoi();
                        }, globalTimeout);
                        return;
                    }
                    xeLenPhoiHolder = true;
                    $.ajax({
                        url: url,
                        data: {
                            subAct: 'GetYeuCauThanhToan'
                        },
                        success: function (rs) {
                            body.html('');
                            $(rs).prependTo(body);
                        }
                        ,complete:function() {
                            xeLenPhoiHolder = false;
                            if (timerYeuCauThanhToanHangDoiList) clearTimeout(timerYeuCauThanhToanHangDoiList);
                            timerYeuCauThanhToanHangDoiList = setTimeout(function () {
                                ajaxYeuCauThanhToanHangDoi();
                            }, globalTimeout);
                        }
                    });
                };
                ajaxYeuCauThanhToanHangDoi();

                $(phoiHangDoiPnl).on('mouseenter', function () {
                    xeLenPhoiHolder = true;
                });
                $(phoiHangDoiPnl).on('mouseleave', function () {
                    xeLenPhoiHolder = false;
                });

                $(phoiHangDoiPnl).on('click', '.list-group-item', function () {
                    var item = $(this);
                    var id = item.attr('data-xvBI');
                    //item.fadeOut(1000);
                    setTimeout(function () {
                        //item.remove();
                    }, 1000);
                    $('.restoreBtn').show();
                    $('.XVB_ID').val(id);
                    xeLenPhoiHolder = true;
                    $.ajax({
                        url: url,
                        data: {
                            subAct: 'NhanYeuCauThanhToan'
                            , ID: id
                        },
                        success: function (rs) {
                            var dt = eval(rs);
                            bxVinhFn.normalFormFn.ThuCapPhoiHanler(dt);
                        }
                        ,complete:function() {
                            xeLenPhoiHolder = false;
                        }
                    });
                });
            }
           
        }
        , XeDaThanhToanList: function () {
            var url = '/lib/ajax/XeVaoBen/Default.aspx';
            var pnl = $('.XeDaThanhToanList');
            if ($(pnl).length > 0) {
                var timerChoThanhToanList;

                var ajaxUpdateChoThanhToanList = function () {
                    $.ajax({
                        url: url,
                        data: {
                            subAct: 'GetDaThanhToan'
                        },
                        success: function (rs) {
                            pnl.html('');
                            $(rs).prependTo(pnl);
                            if (timerChoThanhToanList) clearTimeout(timerChoThanhToanList);
                            timerChoThanhToanList = setTimeout(function () {
                                ajaxUpdateChoThanhToanList();
                            }, globalTimeout);
                        }
                    });
                };

                ajaxUpdateChoThanhToanList();

            }

        }
        , ThuCapPhoiHanler:function (dt) {
            var pnl1 = $('.ThuCapPhoi-Pnl-Add');
            
            var alertErr = pnl1.find('.alert-danger');
            var alertOk = pnl1.find('.alert-success');
            alertErr.hide();
            alertOk.hide();

            pnl1.find('.panel-footer-saved').hide();
            pnl1.find('.panel-footer-insert').show();
            pnl1.find('.panel-footer').show();

            var XVB_ID = pnl1.find('.XVB_ID');

            var sTTBX = pnl1.find('.STTBX');
            var sTTALL = pnl1.find('.STTALL');
            var xE_BienSo = pnl1.find('.XE_BienSo');
            var xE_ID = pnl1.find('.XE_ID');
            var tien = pnl1.find('.Tien');
            var pHOI_ID = pnl1.find('.PHOI_ID');
            var ngay = pnl1.find('.Ngay');

            sTTBX.val(dt.STTBXStr);
            sTTALL.val(dt.STTALLStr);
            xE_BienSo.val(dt.Phoi.Xe.BienSoStr);
            xE_ID.val(dt.Phoi.XE_ID);
            ngay.val(dt.Phoi.NgayXuatBenStr);
            tien.val(bxVinhFn.utils.convertNumberToMoney(dt.Phoi.PHI_Nop));
            pHOI_ID.val(dt.Phoi.ID);
            XVB_ID.val(dt.XeVaoBen.ID);
        }
        , addThuCapPhoiFn:function () {
            var pnl = $('.ThuCapPhoi-Pnl-Add');
            if ($(pnl).length < 1) return;
            var tcId = pnl.find('.ID').val();
            if (tcId == '' || tcId == '0') {
                bxVinhFn.normalFormFn.clearThuCapPhoiForm();
                bxVinhFn.normalFormFn.addThuCapPhoiCurrent();
            }
            else {
                pnl.find('.panel-footer').show();
                pnl.find('.panel-footer-saved').show();
                pnl.find('.panel-footer-insert').hide();
            }
            
            var autoCompletePhoiChonXe = pnl.find('.form-autocomplete-input-ThuChi-ChonXe');
            $.each(autoCompletePhoiChonXe, function (i, j) {
                var itemEl = $(j);
                var parentEl = itemEl.parent();
                var btnAutocomplete = parentEl.find('.autocomplete-btn');
                var refId = itemEl.attr('data-refId');
                var refEl = parentEl.find('.' + refId);
                var src = itemEl.attr('data-src');
                btnAutocomplete.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                itemEl.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                bxVinhFn.utils.autoCompleteSearch(itemEl, src, refId
                    , function (event, ui) {
                        refEl.val(ui.item.id);
                        //bxVinhFn.normalFormFn.chonXeHandler(ui.item.id, ui.item.label);

                        //Phoi-TruyThuPnl-ChamCongPnl
                    }
                    , function (matcher, item) {
                        if (matcher.test(item.Hint.toLowerCase()) || matcher.test(adm.normalizeStr(item.Hint.toLowerCase()))) {
                            return {
                                label: item.Bien,
                                value: item.Bien,
                                id: item.ID,
                                hint: item.Hint
                            };
                        }
                    }
                );

                itemEl.data('ui-autocomplete')._renderItem = function (ul, item) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a href=\"javascript:;\">" + item.label + "</a>")
                        .appendTo(ul);
                };

            });
            var alertErr = pnl.find('.alert-danger');
            var alertOk = pnl.find('.alert-success');
            
            var url = pnl.attr('data-url');

            var btn = pnl.find('.saveBtn');
            var restoreBtn = pnl.find('.restoreBtn');

            var editBtn = pnl.find('.editBtn');
            var newBtn = pnl.find('.newBtn');
            var printBtn = pnl.find('.printBtn');
            

            // Phục hồi trạng thái yêu cầu xử lý
            restoreBtn.unbind('click').click(function () {
                var xvbId = pnl.find('.XVB_ID');
                var id = xvbId.val();
                if (id == '0' || id == '') {
                    return;
                }
                var urlXeVaoBen = '/lib/ajax/XeVaoBen/Default.aspx';
                $.ajax({
                    url: urlXeVaoBen,
                    data: {
                        subAct: 'RestoreXeChuaThanhToan'
                        , Id: id
                    },
                    success: function (rs) {
                        bxVinhFn.normalFormFn.clearThuCapPhoiForm();
                        restoreBtn.hide();
                    }
                });
            });

            // Lưu dữ liệu phơi
            btn.unbind('click').click(function () {

                var tien = pnl.find('.Tien');
                var ngay = pnl.find('.Ngay');

                if (tien.val() == '') {
                    alertErr.show();
                    alertErr.html('Nhập số tiền thu');
                    tien.focus();
                    setTimeout(function () {
                        alertErr.hide();
                    }, 2000);
                    return;
                }

                if (ngay.val() == '') {
                    alertErr.show();
                    alertErr.html('Nhập ngày');
                    ngay.focus();
                    setTimeout(function () {
                        alertErr.hide();
                    }, 2000);
                    return;
                }

                alertErr.hide();
                alertOk.hide();

                var disabled = pnl.find(':input:disabled').removeAttr('disabled');

                // serialize the form
                var data = pnl.find(':input').serializeArray();

                // re-disabled the set of inputs that you previously enabled
                disabled.attr('disabled', 'disabled');

                data.push({ name: 'subAct', value: 'save' });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') { // E-mail or username is not avaiable
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           setTimeout(function () {
                               alertOk.hide();
                               pnl.find('.printBtn').click();
                           }, 1000);
                           
                           

                           bxVinhFn.utils.loader('Đang lưu', false);
                           pnl.find('.panel-footer-saved').show();
                           pnl.find('.panel-footer-saved').find('.btn').attr('data-id', rs);
                           printBtn.attr('href', printBtn.attr('data-url') + '?ID=' + rs);
                           editBtn.attr('href', editBtn.attr('data-url') + '?ID=' + rs);
                           pnl.find('.panel-footer-insert').hide();
                           
                           setTimeout(function () {
                               printBtn.click();
                           }, 1500);
                       }
                   }
                });
            });
            
            // Nút tạo mới
            newBtn.unbind('click').click(function () {
                bxVinhFn.normalFormFn.clearThuCapPhoiForm();
                bxVinhFn.normalFormFn.addThuCapPhoiCurrent(function() {
                    bxVinhFn.normalFormFn.addThuCapPhoiGetLatest();
                });
                window.history.pushState('obj', 'Thêm mới', '/lib/pages/ThuChi/ThuCapPhoi-Add.aspx');

            });
            
            // Add shortcut
            $(document).bind('keydown', 'f8', function () {
                btn.click();
            });
            $('input').bind('keydown', 'f8', function () {
                btn.click();
            });

            $(document).bind('keydown', 'f10', function () {
                restoreBtn.click();
            });
            $('input').bind('keydown', 'f10', function () {
                restoreBtn.click();
            });

            $(document).bind('keydown', 'f6', function () {
                newBtn.click();
            });
            $('input').bind('keydown', 'f6', function () {
                newBtn.click();
            });
        }
        , addThuCapPhoiGetLatest:function () {
            var pnl = $('.ThuCapPhoi-Pnl-Add');
            if ($(pnl).length < 1) return;
            var url = pnl.attr('data-url');
            var data = [];
            data.push({ name: 'subAct', value: 'getLatest' });
            bxVinhFn.utils.loader('Nạp dữ liệu', true);
            $.ajax({
                url: url
                , type: 'POST'
                , data: data
               , success: function (rs) {
                   bxVinhFn.utils.loader('Nạp dữ liệu', false);
                   var dt = eval(rs);
                   pnl.find('.STTBX').val(dt.STTBXStr);
                   pnl.find('.STTALL').val(dt.STTALLStr);
               }
            });
        }
        , addThuCapPhoiCurrent:function (fn) {
            var pnl = $('.ThuCapPhoi-Pnl-Add');
            var url = '/lib/ajax/XeVaoBen/Default.aspx';
            $.ajax({
                url: url,
                data: {
                    subAct: 'GetCurrentThuCapPhoi'
                },
                success: function (rs) {
                    if (rs != '') {
                        var dt = eval(rs);
                        $('.restoreBtn').show();
                        pnl.find('.XVB_ID').val(dt.ID);
                        bxVinhFn.normalFormFn.ThuCapPhoiHanler(dt);
                    }else {
                        if(typeof (fn) == "function") {
                            fn();
                        }
                    }
                }
            });
        }
        , clearThuCapPhoiForm: function () {
            var pnl = $('.ThuCapPhoi-Pnl-Add');
            if ($(pnl).length > 0) {
                pnl.find('input:not([form-control-hasDefalltValue])').val('');
                pnl.find('.restoreBtn').hide();
                
                pnl.find('.panel-footer').hide();
                pnl.find('.help-block').hide();
                pnl.attr('data-id', '');
                pnl.find('.Id').val('');
                pnl.find('.XVB_ID').val('');
                pnl.find('.PHOI_ID').val('');
                pnl.find('.panel-footer-saved').show();
                pnl.find('.panel-footer-insert').hide();
            }
        }
        , addTruyThuFn:function () {
            var pnl = $('.TruyThu-Pnl-Add');
            if ($(pnl).length < 1) return;
           

            var url = pnl.attr('data-url');
            var urlSuccess = pnl.attr('data-success');
            var urlList = pnl.attr('data-list');

            var duyetBtn = pnl.find('.duyetbtn');
            var khongDuyetBtn = pnl.find('.khongDuyetBtn');
            var huyBtn = pnl.find('.huyBtn');

            var alertErr = pnl.find('.alert-danger');
            var alertOk = pnl.find('.alert-success');
            
            duyetBtn.unbind('click').click(function () {
                var soChuyenDuocDuyet = pnl.find('.SoChuyenDuocDuyet');
                if (soChuyenDuocDuyet.val() == '') {
                    alertErr.show();
                    alertErr.html('Nhập số chuyến đống ý');
                    setTimeout(function () {
                        alertErr.hide();
                    }, 2000);
                    return;
                }
                alertErr.hide();
                alertOk.hide();
                var data = pnl.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'duyet' });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') { 
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           bxVinhFn.utils.loader('Đang lưu', false);
                           setTimeout(function () {
                               window.location.reload();
                           }, 1000);
                       }
                   }
                });
            });
            khongDuyetBtn.unbind('click').click(function () {
                alertErr.hide();
                alertOk.hide();
                var data = pnl.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'khongDuyet' });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') {
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           bxVinhFn.utils.loader('Đang lưu', false);
                           setTimeout(function() {
                               window.location.reload();
                           }, 1000);
                       }
                   }
                });
            });

            huyBtn.unbind('click').click(function() {
                alertErr.hide();
                alertOk.hide();
                var data = pnl.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'huyTruyThu' });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    success: function(rs) {
                        bxVinhFn.utils.loader('Lưu', false);
                        if (rs == '0') {
                            alertErr.fadeIn();
                            alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                        } else {
                            alertOk.fadeIn();
                            alertOk.html('Lưu thành công');
                            bxVinhFn.utils.loader('Đang lưu', false);
                            setTimeout(function() {
                                window.location.reload();
                            }, 1000);
                        }
                    }
                });
            });
        }
        , truyThuKetQuaView:function () {
            var pnl = $('.KetQuaDuyetTruyThu-Pnl-Add');
            
            if ($(pnl).length < 1) return;

            bxVinhFn.normalFormFn.truyThuKetQuaViewPhepTinh();

            var url = pnl.attr('data-url');
            var chapNhanBtn = pnl.find('.chapNhanBtn');
            var kienNghiBtn = pnl.find('.kienNghiBtn');

            var truyThuPnl = pnl.find('.TruyThu-KetQuaView-List');
            var urlChamCong = truyThuPnl.attr('data-url');
            
            var alertErr = pnl.find('.alert-danger');
            var alertOk = pnl.find('.alert-success');

            chapNhanBtn.unbind('click').click(function () {
                alertErr.hide();
                alertOk.hide();
                
                var disabled = pnl.find(':input:disabled').removeAttr('disabled');

                // serialize the form
                var data = pnl.find(':input').serializeArray();

                // re-disabled the set of inputs that you previously enabled
                disabled.attr('disabled', 'disabled');
                data.push({ name: 'subAct', value: 'nhaXeChapNhan' });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') {
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           bxVinhFn.utils.loader('Đang lưu', false);
                           setTimeout(function () {
                               window.location.reload();
                           }, 1000);
                       }
                   }
                });
            });
            kienNghiBtn.unbind('click').click(function () {
                alertErr.hide();
                alertOk.hide();
                var data = pnl.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'nhaXeKienNghi' });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') {
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           bxVinhFn.utils.loader('Đang lưu', false);
                           setTimeout(function () {
                               window.location.reload();
                           }, 1000);
                       }
                   }
                });
            });

            truyThuPnl.on('blur', '.TruyThu-KetQuaView-AjaxInput', function () {
                bxVinhFn.normalFormFn.truyThuKetQuaViewPhepTinh();
                var item = $(this);
                var form = item.parent().parent();
                var data = form.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'updateAjaxTruyThuDuyetKetQua' });
                $.ajax({
                    url: urlChamCong
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       if (rs == '0') {
                       } else {
                       }
                   }
                });
            });
            
            truyThuPnl.on('click', '.Loai', function () {
                var item = $(this);
                var ckb = item.is(':checked');

                var soChuyenDuocDuyetValue = $('.SoChuyenDuocDuyet').html();
                var soChuyenDuocDuyet = parseInt(soChuyenDuocDuyetValue);
                var tongDuyetHienTai = $(truyThuPnl.find('.Loai:checked')).length;
                                
                if (tongDuyetHienTai >= soChuyenDuocDuyet) {
                    bxVinhFn.normalFormFn.truyThuKetQuaViewPhepTinh();
                    var form = item.parent().parent();
                    var data = form.find(':input').serializeArray();
                    data.push({ name: 'subAct', value: 'updateAjaxTruyThuDuyetKetQua' });
                    $.ajax({
                        url: urlChamCong
                        , type: 'POST'
                        , data: data
                       , success: function (rs) {
                           if (rs == '0') {
                           } else {
                           }
                       }
                    });
                }
                else { // redo check
                    alert('Cần truy thu đủ ' + soChuyenDuocDuyetValue + ' chuyến');
                    if(!ckb) {
                        item.click();
                    }
                }
            });

            truyThuPnl.on('click', '.TrangThaiNo', function () {
                bxVinhFn.normalFormFn.truyThuKetQuaViewPhepTinh();
                var item = $(this);
                var form = item.parent().parent();
                var data = form.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'updateAjaxTruyThuDuyetKetQua' });
                $.ajax({
                    url: urlChamCong
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       if (rs == '0') {
                       } else {
                       }
                   }
                });
            });
        }
        , truyThuKetQuaViewPhepTinh:function () {
            var pnl = $('.TruyThu-KetQuaView-List');
            if ($(pnl).length < 0) return;

            var phiTruocTruyThuEl = pnl.find('.PhiTruocTruyThu');
            var tongTruyThu = pnl.find('.TongTruyThu');
            var no = pnl.find('.No');
            var tong = pnl.find('.Tong');

            var phiTruocTruyThu = bxVinhFn.utils.getNumberFormMoney(phiTruocTruyThuEl.val());

            var truyThu = 0;
            pnl.find('.Loai:checked').each(function(i,j) {
                var item = $(j);
                var p = item.parent().parent();
                var tienEl = p.find('.CHAMCONG_Tien');
                var tien = bxVinhFn.utils.getNumberFormMoney(tienEl.val());
                truyThu += tien;
            });
            tongTruyThu.val(bxVinhFn.utils.convertNumberToMoney(truyThu));
            
            var tongNo = 0;
            pnl.find('.TrangThaiNo:checked').each(function (i, j) {
                var item = $(j);
                var p = item.parent().parent();
                var tienEl = p.find('.CHAMCONG_Tien');
                var trangThaiTruyThu = p.find('.Loai').is(':checked');
                if (trangThaiTruyThu) {
                    var tien = bxVinhFn.utils.getNumberFormMoney(tienEl.val());
                    tongNo += tien;
                }
            });
            no.val(bxVinhFn.utils.convertNumberToMoney(tongNo));
            
            var tongTien = phiTruocTruyThu + truyThu - tongNo;
            tong.val(bxVinhFn.utils.convertNumberToMoney(tongTien));

        }
        , addThuNoFn:function () {
            var pnl = $('.ThuNo-Pnl-Add');

            if ($(pnl).length < 1) return;
            
            var btn = pnl.find('.savebtn');
            var xoaBtn = pnl.find('.xoaBtn');
            var url = pnl.attr('data-url');
            var urlSuccess = pnl.attr('data-success');
            var chamCongPnl = pnl.find('.ThuNo-ChamCong-Pnl');
            var urlChamCong = chamCongPnl.attr('data-url');

            var alertErr = pnl.find('.alert-danger');
            var alertOk = pnl.find('.alert-success');
            var tienPhaiThu = pnl.find('.TienPhaiThu');

            pnl.on('click', '.TrangThaiNo', function () {
                var item = $(this);
                var chamCongIds = item.parent().find('.ChamCongIds');
                var ckb = item.is(':checked');
                if(ckb) {
                    chamCongIds.removeAttr('disabled');
                }else {
                    chamCongIds.attr('disabled', 'disabled');
                }
                var tienInputs = chamCongPnl.find('.TrangThaiNo:checked');
                
                var tong = 0;
                $.each(tienInputs, function (i1, i2) {
                    var tien = $(i2);
                    tong += parseInt(bxVinhFn.utils.getNumberFormMoney(tien.attr('data-value')));
                });
                tienPhaiThu.val(bxVinhFn.utils.convertNumberToMoney(tong));
            });
            
            var trangThaiNoInputs = chamCongPnl.find('.TrangThaiNo');
            $.each(trangThaiNoInputs, function (i3, i4) {
                var i4Ckb = $(i4);
                var inputIds = i4Ckb.parent().find('.ChamCongIds');
                var isChecked = i4Ckb.is(':checked');
                if (isChecked) {
                    inputIds.removeAttr('disabled');
                } else {
                    inputIds.attr('disabled', 'disabled');
                }
                
            });

            var autoCompletePhoiChonXe = pnl.find('.form-autocomplete-input-ThuNo-ChonXe');
            $.each(autoCompletePhoiChonXe, function (i, j) {
                var itemEl = $(j);
                var parentEl = itemEl.parent();
                var btnAutocomplete = parentEl.find('.autocomplete-btn');
                var refId = itemEl.attr('data-refId');
                var refEl = parentEl.find('.' + refId);
                var src = itemEl.attr('data-src');
                btnAutocomplete.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                itemEl.unbind('click').click(function () {
                    itemEl.autocomplete('search', '');
                });
                bxVinhFn.utils.autoCompleteSearch(itemEl, src, refId
                    , function (event, ui) {
                        refEl.val(ui.item.id);
                        data = [];
                        data.push({ name: 'subAct', value: 'BangCongNoTheoXe' });
                        data.push({ name: 'XE_ID', value: ui.item.id });
                        tienPhaiThu.val('');
                        $.ajax({
                            url: urlChamCong
                            , type: 'POST'
                            , data: data
                            , success: function (rs) {
                                chamCongPnl.html(rs);
                                var moneyInputs = $('.money-input');
                                $.each(moneyInputs, function (i1, j1) {
                                    var itemEls = $(j1);
                                    bxVinhFn.utils.formatTien(itemEls);
                                });
                            }
                        });
                        //Phoi-TruyThuPnl-ChamCongPnl
                    }
                    , function (matcher, item) {
                        if (matcher.test(item.Hint.toLowerCase()) || matcher.test(adm.normalizeStr(item.Hint.toLowerCase()))) {
                            return {
                                label: item.Bien,
                                value: item.Bien,
                                id: item.ID,
                                hint: item.Hint
                            };
                        }
                    }
                );

                itemEl.data('ui-autocomplete')._renderItem = function (ul, item) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a href=\"javascript:;\">" + item.label + "</a>")
                        .appendTo(ul);
                };

            });
            

            // Lưu dữ liệu phơi
            btn.unbind('click').click(function () {
                var tienInputs = chamCongPnl.find('.TrangThaiNo:checked').length;

                if (tienInputs < 1) {
                    alertErr.show();
                    alertErr.html('Chưa có ngày nào được chọn');
                    setTimeout(function () {
                        alertErr.hide();
                    }, 2000);
                    return;
                }

                alertErr.hide();
                alertOk.hide();

                //var disabled = pnl.find(':input:disabled').removeAttr('disabled');

                // serialize the form
                var data = pnl.find(':input').serializeArray();

                // re-disabled the set of inputs that you previously enabled
                //disabled.attr('disabled', 'disabled');

                data.push({ name: 'subAct', value: 'save' });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       if (rs == '0') {
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập và nhập dữ liệu cho chuẩn nhé');
                       } else {
                           alertOk.fadeIn();
                           alertOk.html('Lưu thành công');
                           setTimeout(function () {
                               alertOk.hide();
                               var con = confirm('Move');
                               if(con) {
                                   document.location.href = urlSuccess + rs;
                               }
                           }, 1000);
                          
                       }
                   }
                });
            });
            

            xoaBtn.click(function () {
                var con = confirm('Bạn có thực sự muốn xóa?');
                if (!con) return;

                var data = pnl.find(':input').serializeArray();
                data.push({ name: 'subAct', value: 'remove' });
                $.ajax({
                    url: url
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       if (rs == '0') {
                           window.history.back();
                           document.location.href = urlList;
                       }
                       else {
                           alertErr.fadeIn();
                           alertErr.html('Đăng nhập chỉ người tạo ra mới có quyền xóa bỏ');
                       }
                   }
                });
            });
        }
        , addGheSoDoChoFn: function () {
            var pnl = $('.SoDo-Ghe-AddPnl');
            var tbl = $('.SoDo-Ghe-List');
            if ($(pnl).length < 1) return;

            var btn = pnl.find('.savebtn');
            var url = pnl.attr('data-url');


            tbl.on('click', '.btnXoaGhe', function () {
                var con = confirm('Bạn có thực sự muốn xóa?');
                if (!con) return;
                {
                    var item = $(this);
                    var id = item.attr('data-id');
                    var data = [];
                    data.push({ name: 'subAct', value: 'remove' });
                    data.push({ name: 'ID', value: id });
                    $.ajax({
                        url: bxVinhFn.url.ghe
                        , type: 'POST'
                        , data: data
                       , success: function (rs) {
                           item.parent().parent().remove();
                       }
                    });
                }
                
            });

            // Lưu dữ liệu phơi
            btn.unbind('click').click(function () {
                // serialize the form
                var item = $(this);
                var data = pnl.find(':input').serializeArray();
                var id = item.attr('data-id');
                // re-disabled the set of inputs that you previously enabled
                //disabled.attr('disabled', 'disabled');

                data.push({ name: 'subAct', value: 'save' });
                data.push({ name: 'SoDo', value: id });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: bxVinhFn.url.ghe
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       $(rs).insertAfter(pnl);
                   }
                });
            });
           
        }
        , addXeDiemDungFn: function () {
            var pnl = $('.Xe-DiemDung-AddPnl');
            var tbl = $('.Xe-DiemDung-List');
            if ($(pnl).length < 1) return;

            var btn = pnl.find('.savebtn');
            var url = pnl.attr('data-url');


            tbl.on('click', '.btnXoaDiemDung', function () {
                var con = confirm('Bạn có thực sự muốn xóa?');
                if (!con) return;
                {
                    var item = $(this);
                    var id = item.attr('data-id');
                    var data = [];
                    data.push({ name: 'subAct', value: 'remove' });
                    data.push({ name: 'ID', value: id });
                    $.ajax({
                        url: bxVinhFn.url.xeDiemDung
                        , type: 'POST'
                        , data: data
                       , success: function (rs) {
                           item.parent().parent().remove();
                       }
                    });
                }

            });

            // Lưu dữ liệu phơi
            btn.unbind('click').click(function () {
                // serialize the form
                var item = $(this);
                var data = pnl.find(':input').serializeArray();
                var id = item.attr('data-id');
                // re-disabled the set of inputs that you previously enabled
                //disabled.attr('disabled', 'disabled');

                data.push({ name: 'subAct', value: 'saveTiny' });
                data.push({ name: 'XE_ID', value: id });
                bxVinhFn.utils.loader('Đang lưu', true);
                $.ajax({
                    url: bxVinhFn.url.xeDiemDung
                    , type: 'POST'
                    , data: data
                   , success: function (rs) {
                       bxVinhFn.utils.loader('Lưu', false);
                       $(rs).insertAfter(pnl);
                   }
                });
            });

        }
    }
}