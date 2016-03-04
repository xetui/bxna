($(function() {
    datVe.init();
}));


var datVe = {
    init:function () {
        $('.toggleBtn').click(function () {
            var body = $('body');
            if (body.hasClass('ActiveBody')) {
                body.removeClass('ActiveBody');
            } else {
                body.addClass('ActiveBody');
            }
        });
        
        var timePickerElements = $('.timePicker-input');
        if ($(timePickerElements).length > 0) {
            $.each(timePickerElements, function (i, j) {
                var itemEl = $(j);
                itemEl.timepicker({
                    minuteStep: 15,
                    showMeridian: false,
                    defaultTime: false
                });
            });
        }
        
        var datePickerElements = $('.datepicker-input');
        if ($(datePickerElements).length > 0) {
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
        }

        datVe.chonVeFn();
        datVe.benQuanLyVeFn();
        datVe.chonGheFn();

        

       

    },
    chonVeFn:function () {
        var pnl = $('.DatVePnl');
        if ($(pnl).length > 0) {
            var btn = pnl.find('.btnTimVe');
            var diInput = pnl.find('.DI_Input');
            var denInput = pnl.find('.DEN_Input');
            var ngay = pnl.find('.Ngay');

            var url = '/lib/ajax/Ve/Default.aspx';
            var tinhDataSrc = diInput.attr('data-src');


            var chonBenDiModal = $('#chonBenDiModal');
            var diTinh = chonBenDiModal.find('.DI_Tinh');
            var diBen = chonBenDiModal.find('.DI_Ben');

            var benSrc = diBen.attr('data-src');

            bxVinhFn.utils.autoCompleteSearch(diInput, tinhDataSrc, 'DI_Tinh'
                        , function (event, ui) {
                            diInput.val(ui.item.hint);
                            diTinh.autocomplete('close');
                            diBen.val('');
                            chonBenDiModal.modal('show');
                            diBen.focus();


                            diBen.attr('data-realSrc', benSrc + ui.item.id);
                            var benRealSrc = diBen.attr('data-realSrc');
                            bxVinhFn.utils.autoCompleteSearch(diBen, benRealSrc, 'DI_Ben'
                                , function (event1, ui1) {
                                    diInput.attr('data-id', ui1.item.id);
                                    diInput.val(ui1.item.label);
                                    chonBenDiModal.modal('hide');
                                }
                                , function (matcher1, item1) {
                                    if (matcher1.test(item1.Hint.toLowerCase()) || matcher1.test(bxVinhFn.utils.normalizeStr(item1.Hint.toLowerCase()))) {
                                        return {
                                            label: item1.Ten,
                                            value: item1.Ten,
                                            id: item1.ID,
                                            hint: item1.Hint
                                        };
                                    }
                                }
                            );
                            diBen.unbind('click').click(function () {
                                diBen.autocomplete('search', '');
                            });
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


            diInput.unbind('click').click(function () {
                diInput.autocomplete('search', '');
            });


            pnl.find('.Ngay').datepicker();

            var chonBenDenModal = $('#chonBenDenModal');
            var denTinh = chonBenDenModal.find('.DEN_Tinh');
            var denBen = chonBenDenModal.find('.DEN_Ben');


            bxVinhFn.utils.autoCompleteSearch(denInput, tinhDataSrc, 'DEN_Tinh'
                        , function (event, ui) {
                            denInput.val(ui.item.hint);
                            denInput.autocomplete('close');
                            denBen.val('');
                            chonBenDenModal.modal('show');
                            denBen.focus();

                            denBen.attr('data-realSrc', benSrc + ui.item.id);
                            var benRealSrc = denBen.attr('data-realSrc');
                            bxVinhFn.utils.autoCompleteSearch(denBen, benRealSrc, 'DEN_Ben'
                                , function (event1, ui1) {
                                    denInput.attr('data-id', ui1.item.id);
                                    denInput.val(ui1.item.label);
                                    chonBenDenModal.modal('hide');
                                }
                                , function (matcher1, item1) {
                                    if (matcher1.test(item1.Hint.toLowerCase()) || matcher1.test(bxVinhFn.utils.normalizeStr(item1.Hint.toLowerCase()))) {
                                        return {
                                            label: item1.Ten,
                                            value: item1.Ten,
                                            id: item1.ID,
                                            hint: item1.Hint
                                        };
                                    }
                                }
                            );
                            denBen.unbind('click').click(function () {
                                denBen.autocomplete('search', '');
                            });
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

            denInput.unbind('click').click(function () {
                denInput.autocomplete('search', '');
            });

            btn.click(function () {
                var di = diInput.attr('data-id');
                var den = denInput.attr('data-id');
                if (di === '') {
                    alert('Vui lòng chọn bến đi');
                    return;
                }
                if (den === '') {
                    alert('Vui lòng chọn bến đến');
                    return;
                }
                var url = 'tim?route=' + di + ',' + den + '&ngay=' + ngay.val();
                document.location.href = url;
            });


            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (location) {

                    var geocoder = new google.maps.Geocoder();
                    var lat = location.coords.latitude;
                    var lng = location.coords.longitude;

                    var latlng = new google.maps.LatLng(lat, lng);
                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                //formatted address
                                //find country name
                                for (var i = 0; i < results[0].address_components.length; i++) {
                                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                            //this is the object you are looking for
                                            city = results[0].address_components[i];
                                            break;
                                        }
                                    }
                                }
                                //city data

                                var data = [];
                                data.push({ name: 'subAct', value: 'searchByMap' });
                                data.push({ name: 'q', value: city.short_name });
                                $.ajax({
                                    url: tinhDataSrc
                                    , data: data
                                    , success: function (tinhRs) {
                                        if (tinhRs.length > 4) {
                                            var dsTinh = eval(tinhRs);
                                            diInput.val(dsTinh[0].Ten);
                                        }
                                    }
                                });

                            } else {
                            }
                        } else {
                        }
                    });
                });

            } else {
            }

            

        }
        



        var pnlRs = $('.DatVeRsPnl');
        var datVeChonGheModal = $('#datVe_ChonGheModal');
        var datVeChonGheBody = datVeChonGheModal.find('.datVe_ChonGheBody');
        pnlRs.on('click', '.btnChonGhe', function () {
            var item = $(this);
            var xeId = item.attr('data-xeId');
            var chieuDi = item.attr('data-chieuDi');
            var ngay = datVeChonGheBody.attr('data-ngay');
            var diId = datVeChonGheBody.attr('data-di');
            var denId = datVeChonGheBody.attr('data-den');
            var src = datVeChonGheBody.attr('data-src');

            var data = [];
            data.push({ name: 'subAct', value: 'chonGhe' });
            data.push({ name: 'XE_ID', value: xeId });
            data.push({ name: 'CHIEUDI', value: chieuDi });
            data.push({ name: 'DI_ID', value: diId });
            data.push({ name: 'DEN_ID', value: denId });
            data.push({ name: 'Ngay', value: ngay });
            datVeChonGheModal.modal('show');
            $.ajax({
                url: src
                , data: data
                , success: function (rs) {
                    datVeChonGheBody.html(rs);
                }
            });
        });

        $('.datVe-Xe-AnhPreview').slick({
            dots: true,
            infinite: true,
            adaptiveHeight: true
        });


        
    }
    , benQuanLyVeFn:function () {
       
    }
    , chonGheFn: function () {
        var src = '/lib/ajax/booking/Default.aspx';


        var chonGhePnl = $('.SoDoChoNgoi-ChonGhePnl');
        var gheNgois = chonGhePnl.find('.SoDoChoNgoi-ChoNgoi');
        gheNgois.each(function (i, j) {
            var item = $(j);
            item.click(function () {
                if (item.hasClass('btn-success')) {
                    item.removeClass('btn-success');
                } else {
                    item.addClass('btn-success');
                }
            });
        });

        var pnl = $('.datVe-chonGhePnl');
        var btn = pnl.find('.btnDatVe');

        btn.click(function() {
            var item = $(this);
            var xeId = item.attr('data-xeId');
            var diId = item.attr('data-diId');
            var denId = item.attr('data-denId');
            var ngay = item.attr('data-ngay');
            var chieuDi = item.attr('data-chieuDi');
            var chonGhe = item.attr('data-chonGhe');

            var ten = pnl.find('.Ten');
            var mobile = pnl.find('.Mobile');
            var _ten = ten.val();
            var _mobile = mobile.val();

            if (_ten == '') {
                alert('Nhập tên');
                ten.focus();
                return;
            }
            if (_mobile == '') {
                alert('Nhập số điện thoại');
                ten.focus();
                return;
            }



            var veStr = '';
            
            if (chonGhe.toLowerCase() == 'true') {
                chonGhePnl.find('.btn-success').each(function (i, j) {
                    var choNgoi = $(j);
                    veStr += choNgoi.attr('data-id') + ',';
                });
                if (veStr == '') {
                    alert('Vui lòng chọn ghế ngồi');
                    return;
                }
            }

            var data = [];
            data.push({ name: 'subAct', value: 'datVe-web' });
            data.push({ name: 'XE_ID', value: xeId });
            data.push({ name: 'CHIEUDI', value: chieuDi });
            data.push({ name: 'DI_ID', value: diId });
            data.push({ name: 'DEN_ID', value: denId });
            data.push({ name: 'Ngay', value: ngay });

            data.push({ name: 'Ten', value: _ten });
            data.push({ name: 'Mobile', value: _mobile });
            data.push({ name: 'VeStr', value: veStr });
            data.push({ name: 'ChonGhe', value: chonGhe });

            btn.attr('disabled', 'disabled');

            $.ajax({
                url: src
                , data: data
                , success: function (rs) {
                    document.location.href = '/pay?ID=' + rs;
                }
            });
        });

    }
        
}