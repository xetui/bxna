<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Add.ascx.cs" Inherits="lib_ui_Xe_Add" %>
<%@ Import Namespace="docsoft" %>
<%@ Import Namespace="linh.common" %>

<link href="/lib/css/web/bootstrap-timepicker.min.css" rel="stylesheet" />
<div class="panel panel-default Normal-Pnl-Add" 
    data-url="/lib/ajax/Xe/default.aspx"
    data-success="/lib/pages/Xe/Add.aspx?ID="
    data-list="/lib/pages/Xe/"
    >
    <div class="panel-heading">
        <%if (string.IsNullOrEmpty(Ret))
          { %>
            <a href="/lib/pages/Xe/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
            <a href="/lib/pages/Xe/Add.aspx" class="btn btn-success">Thêm</a>
            <%if (Item.Username == Security.Username)
              { %>
                <a href="javascript:;" data-id="<%=Item.ID %>" class="btn btn-warning xoaBtn">Xóa</a>
            <%} %>
        <%}
        else
        {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
        <%} %>                    
    </div>
    <div class="panel-body">
        <div class="form-horizontal" role="form">
            <input id="Id" style="display: none;" value="<%=Item.ID == 0 ? string.Empty  : Item.ID.ToString() %>" name="Id" type="text" />
            <div class="form-group">
                <label for="BienSo_Chu" class="col-sm-2 col-xs-4 control-label">Biển số:</label>
                <div class="col-sm-5 col-xs-4">
                    <input type="text" name="BienSo_Chu" id="BienSo_Chu" value="<%=Item.BienSo_Chu %>" class="form-control BienSo_Chu">
                </div>
                <div class="col-sm-5 col-xs-4">
                    <input type="text" name="BienSo_So" id="BienSo_So" value="<%=Item.BienSo_So %>" class="form-control BienSo_So">
                </div>
            </div>

           <div class="form-group">
                <label for="LOAIXE_Ten" class="col-sm-2 control-label">Loại xe:</label>
                <div class="col-sm-2">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/LoaiXe/Default.aspx" data-refId="LOAIXE_ID" class="form-control form-autocomplete-input LOAIXE_Ten" name="LOAIXE_Ten" id="LOAIXE_Ten" value="<%=Item.LOAIXE_Ten %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control LOAIXE_ID" name="LOAIXE_ID" id="LOAIXE_ID" value="<%=Item.LOAIXE_ID %>"/>
                    </div>
                </div>
                <label for="TUYEN_Ten" class="col-sm-2 control-label">Tuyến xe:</label>
                <div class="col-sm-2">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/Tuyen/Default.aspx" data-refId="TUYEN_ID" class="form-control form-autocomplete-input TUYEN_Ten" name="TUYEN_Ten" id="TUYEN_Ten" value="<%=Item.TUYEN_Ten %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control TUYEN_ID" name="TUYEN_ID" id="TUYEN_ID" value="<%=Item.TUYEN_ID %>"/>
                    </div>
                </div>
               <label for="DONVI_Ten" class="col-sm-2 control-label">Nhà xe:</label>
                <div class="col-sm-2">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/DonVi/Default.aspx" data-refId="DONVI_ID" class="form-control form-autocomplete-input DONVI_Ten" name="DONVI_Ten" id="DONVI_Ten" value="<%=Item.DONVI_Ten %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control DONVI_ID" name="DONVI_ID" id="DONVI_ID" value="<%=Item.DONVI_ID %>"/>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="TuyenCoDinh" class="col-sm-2 control-label">Tuyến cố định:</label>
                <div class="col-sm-2">
                    <div id="TuyenCoDinhPicker" class="input-append datepicker-input date input-group">
                        <input 
                            value="<%=Item.TuyenCoDinh == DateTime.MinValue ?  DateTime.Now.ToString("dd/MM/yyyy") : Item.TuyenCoDinh.ToString("dd/MM/yyyy") %>"
                            data-format="dd/MM/yyyy" 
                            class="form-control TuyenCoDinh" 
                            id="TuyenCoDinh" 
                            name="TuyenCoDinh" 
                            type="text"/>
                        <span class="add-on input-group-addon">
                            <i data-time-icon="icon-time" data-date-icon="icon-calendar" class="glyphicon glyphicon-calendar">
                            </i>
                        </span>
                    </div>
                </div>
                
                <label for="LuuHanh" class="col-sm-2 control-label">Lưu hành:</label>
                <div class="col-sm-2">
                    <div id="LuuHanhPicker" class="input-append datepicker-input date input-group">
                        <input 
                            value="<%=Item.LuuHanh == DateTime.MinValue ?  DateTime.Now.ToString("dd/MM/yyyy") : Item.LuuHanh.ToString("dd/MM/yyyy") %>"
                            data-format="dd/MM/yyyy" 
                            class="form-control LuuHanh" 
                            id="LuuHanh" 
                            name="LuuHanh" 
                            type="text"/>
                        <span class="add-on input-group-addon">
                            <i data-time-icon="icon-time" data-date-icon="icon-calendar" class="glyphicon glyphicon-calendar">
                            </i>
                        </span>
                    </div>
                </div>
                
                <label for="BaoHiem" class="col-sm-2 control-label">Bảo hiểm:</label>
                <div class="col-sm-2">
                    <div id="BaoHiemPicker" class="input-append datepicker-input date input-group">
                        <input 
                            value="<%=Item.BaoHiem == DateTime.MinValue ?  DateTime.Now.ToString("dd/MM/yyyy") : Item.BaoHiem.ToString("dd/MM/yyyy") %>"
                            data-format="dd/MM/yyyy" 
                            class="form-control BaoHiem" 
                            id="BaoHiem" 
                            name="BaoHiem" 
                            type="text"/>
                        <span class="add-on input-group-addon">
                            <i data-time-icon="icon-time" data-date-icon="icon-calendar" class="glyphicon glyphicon-calendar">
                            </i>
                        </span>
                    </div>
                </div>

            </div>
            
            
            <div class="form-group">
                <label for="Ghe" class="col-sm-2 control-label">Số ghế:</label>
                <div class="col-sm-2">
                    <input type="text" name="Ghe" id="Ghe" value="<%=Item.Ghe %>" class="form-control Ghe">
                </div>
                <label for="SoKhach" class="col-sm-2 control-label">Số khách:</label>
                <div class="col-sm-2">
                    <input type="text" name="SoKhach" id="SoKhach" value="<%=Item.SoKhach %>" class="form-control SoKhach">
                </div>
                <label for="MucPhi" class="col-sm-2 control-label">Mức phí:</label>
                <div class="col-sm-2">
                    <input type="text" name="MucPhi" id="MucPhi" value="<%=Item.MucPhi %>" class="form-control MucPhi money-input">
                </div>
            </div>
            
            
            <div class="form-group">
                <label for="GiaVe" class="col-sm-2 control-label">Giá vé:</label>
                <div class="col-sm-2">
                    <input type="text" name="GiaVe" id="GiaVe" value="<%=Item.GiaVe %>" class="form-control GiaVe money-input">
                </div>
                
                <label for="BIEUDO_Ten" class="col-sm-2 control-label">Loại biểu đồ:</label>
                <div class="col-sm-2">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/LoaiBieuDo/Default.aspx" data-refId="BIEUDO_ID" class="form-control form-autocomplete-input BIEUDO_Ten" name="BIEUDO_Ten" id="Text1" value="<%=Item.BIEUDO_Ten %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control BIEUDO_ID" name="BIEUDO_ID" id="BIEUDO_ID" value="<%=Item.BIEUDO_ID %>"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="ChonGhe" class="col-sm-2 control-label">Hỗ trợ chọn ghế:</label>
                <div class="col-sm-2">
                    <%if (Item.ChonGhe)
                    {%>
                        <input class="ChonGhe input-sm" id="ChonGhe" checked="checked" name="ChonGhe" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="ChonGhe input-sm" id="Checkbox4" name="ChonGhe" type="checkbox"/>
                    <% } %>
                </div>
                <label for="SODO_Ten" class="col-sm-2 control-label">Chọn ghế:</label>
                <div class="col-sm-2">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/SoDo/Default.aspx" data-refId="SODO_ID" class="form-control form-autocomplete-input SODO_Ten" name="SODO_Ten" id="SODO_Ten" value="<%=Item.SODO_Ten %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control SODO_ID" name="SODO_ID" id="SODO_ID" value="<%=Item.SODO_ID %>"/>
                    </div>
                </div>
                <label for="DI_GioXuatBen" class="col-sm-2 control-label">ĐI-xuất bến:</label>
                <div class="col-sm-2">
                    <div class="input-group bootstrap-timepicker">
                        <input type="text" name="DI_GioXuatBen" id="DI_GioXuatBen" value="<%=Item.DI_GioXuatBen %>" class="form-control DI_GioXuatBen timePicker-input"/>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="DI_GioDen" class="col-sm-2 control-label">ĐI-đến:</label>
                <div class="col-sm-2">
                    <div class="input-group bootstrap-timepicker">
                        <input type="text" name="DI_GioDen" id="DI_GioDen" value="<%=Item.DI_GioDen %>" class="form-control DI_GioDen timePicker-input"/>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                    </div>
                </div>
                <label for="DEN_GioXuatBen" class="col-sm-2 control-label">VỀ-xuất bến:</label>
                <div class="col-sm-2">
                    <div class="input-group bootstrap-timepicker">
                        <input type="text" name="DEN_GioXuatBen" id="DEN_GioXuatBen" value="<%=Item.DEN_GioXuatBen %>" class="form-control DEN_GioXuatBen timePicker-input"/>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                    </div>
                </div>
                <label for="DEN_GioDen" class="col-sm-2 control-label">VỀ-đến:</label>
                <div class="col-sm-2">
                    <div class="input-group bootstrap-timepicker">
                        <input type="text" name="DEN_GioDen" id="DEN_GioDen" value="<%=Item.DEN_GioDen %>" class="form-control DEN_GioDen timePicker-input"/>
                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="Ghe" class="col-sm-2 control-label">Năm S/X:</label>
                <div class="col-sm-2">
                    <input type="text" name="NamSanXuat" id="NamSanXuat" value="<%=Item.NamSanXuat %>" class="form-control NamSanXuat">
                </div>
                <label for="ChapThuanTuyen_SoChuyen" class="col-sm-2 control-label">Chấp thuận tuyến:</label>
                <div class="col-sm-2">
                    <input type="text" name="ChapThuanTuyen_SoChuyen" id="ChapThuanTuyen_SoChuyen" value="<%=Item.ChapThuanTuyen_SoChuyen %>" class="form-control ChapThuanTuyen_SoChuyen"/>
                </div>
                <label for="XeTai" class="col-sm-2 control-label">Xe tải:</label>
                <div class="col-sm-2">
                    <%if (Item.XeTai)
                    {%>
                        <input class="XeTai input-sm" id="XeTai" checked="checked" name="XeTai" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="XeTai input-sm" id="XeTai" name="XeTai" type="checkbox"/>
                    <% } %>
                </div>
                
            </div>
            
            
            <div class="form-group">
                <label for="XeVangLai" class="col-sm-2 control-label">Vãng lai:</label>
                <div class="col-sm-1">
                    <%if (Item.XeVangLai)
                    {%>
                        <input class="XeVangLai input-sm" id="XeVangLai" checked="checked" name="XeVangLai" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="XeVangLai input-sm" id="Checkbox1" name="XeVangLai" type="checkbox"/>
                    <% } %>
                </div>
                <label for="ChuaDangKy" class="col-sm-1 control-label">Đã đăng ký:</label>
                <div class="col-sm-1">
                    <%if (!Item.ChuaDangKy)
                    {%>
                        <input class="ChuaDangKy input-sm" id="ChuaDangKy" checked="checked" name="ChuaDangKy" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="ChuaDangKy input-sm" id="ChuaDangKy" name="ChuaDangKy" type="checkbox"/>
                    <% } %>
                </div>
                <label for="ChuaDangKy" class="col-sm-1 control-label">Ký gửi vé:</label>
                <div class="col-sm-1">
                    <%if (Item.KyGuiBanVe)
                    {%>
                        <input class="KyGuiBanVe " id="KyGuiBanVe" checked="checked" name="KyGuiBanVe" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="KyGuiBanVe " id="Checkbox2" name="KyGuiBanVe" type="checkbox"/>
                    <% } %>
                </div>
                <label for="Khoa" class="col-sm-1 control-label">Khóa:</label>
                <div class="col-sm-1">
                    <%if (Item.Khoa)
                    {%>
                        <input class="Khoa input-sm" id="Khoa" checked="checked" name="Khoa" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="Khoa input-sm" id="Checkbox3" name="Khoa" type="checkbox"/>
                    <% } %>
                </div>               
                <label for="KyGuiBanVe" class="col-sm-1 control-label">Ngày ký gửi:</label>
                <div class="col-sm-2">
                    <div class="input-append datepicker-input date input-group">
                        <input 
                            value="<%=Item.NgayKyGuiBanVe.NgayVn()%>"
                            data-format="dd/MM/yyyy" 
                            class="form-control NgayKyGuiBanVe" 
                            id="NgayKyGuiBanVe" 
                            name="NgayKyGuiBanVe" 
                            type="text"/>
                        <span class="add-on input-group-addon">
                            <i data-time-icon="icon-time" data-date-icon="icon-calendar" class="glyphicon glyphicon-calendar">
                            </i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="Anh" class="col-sm-2 control-label">Ảnh</label>
                <div class="col-sm-2">
                    <div class="imgfinder-box">
                        <input class="Anh" name="Anh" value="<%=Item.Anh %>" type="text" style="display: none;" />
                        <div class="imgfinder-cover">
                            <div class="imgfinder-overlay">
                                <span title="Chọn ảnh" class="btn btn-primary imgfinder-changeBtn">Chọn</span> &nbsp;
                                <span title="xóa ảnh" class="btn btn-default imgfinder-removeBtn">
                                    <i class="glyphicon glyphicon-remove"></i>
                                </span>
                            </div>
                        </div>
                        <img src="<%=Item.Anh %>" class="img-rounded img-thumbnail imgfinder-img"/>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="imgfinder-box">
                        <input class="Anh" name="Anh1" value="<%=Item.Anh1 %>" type="text" style="display: none;" />
                        <div class="imgfinder-cover">
                            <div class="imgfinder-overlay">
                                <span title="Chọn ảnh" class="btn btn-primary imgfinder-changeBtn">Chọn</span> &nbsp;
                                <span title="xóa ảnh" class="btn btn-default imgfinder-removeBtn">
                                    <i class="glyphicon glyphicon-remove"></i>
                                </span>
                            </div>
                        </div>
                        <img src="<%=Item.Anh1 %>" class="img-rounded img-thumbnail imgfinder-img"/>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="imgfinder-box">
                        <input class="Anh" name="Anh2" value="<%=Item.Anh2 %>" type="text" style="display: none;" />
                        <div class="imgfinder-cover">
                            <div class="imgfinder-overlay">
                                <span title="Chọn ảnh" class="btn btn-primary imgfinder-changeBtn">Chọn</span> &nbsp;
                                <span title="xóa ảnh" class="btn btn-default imgfinder-removeBtn">
                                    <i class="glyphicon glyphicon-remove"></i>
                                </span>
                            </div>
                        </div>
                        <img src="<%=Item.Anh2 %>" class="img-rounded img-thumbnail imgfinder-img"/>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="imgfinder-box">
                        <input class="Anh" name="Anh3" value="<%=Item.Anh3 %>" type="text" style="display: none;" />
                        <div class="imgfinder-cover">
                            <div class="imgfinder-overlay">
                                <span title="Chọn ảnh" class="btn btn-primary imgfinder-changeBtn">Chọn</span> &nbsp;
                                <span title="xóa ảnh" class="btn btn-default imgfinder-removeBtn">
                                    <i class="glyphicon glyphicon-remove"></i>
                                </span>
                            </div>
                        </div>
                        <img src="<%=Item.Anh3 %>" class="img-rounded img-thumbnail imgfinder-img"/>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="imgfinder-box">
                        <input class="Anh" name="Anh4" value="<%=Item.Anh4 %>" type="text" style="display: none;" />
                        <div class="imgfinder-cover">
                            <div class="imgfinder-overlay">
                                <span title="Chọn ảnh" class="btn btn-primary imgfinder-changeBtn">Chọn</span> &nbsp;
                                <span title="xóa ảnh" class="btn btn-default imgfinder-removeBtn">
                                    <i class="glyphicon glyphicon-remove"></i>
                                </span>
                            </div>
                        </div>
                        <img src="<%=Item.Anh4 %>" class="img-rounded img-thumbnail imgfinder-img"/>
                    </div>
                </div>
            </div>
            
            
            <div class="form-group">
                <label for="TIENICH_Wifi" class="col-sm-2 control-label">Wifi:</label>
                <div class="col-sm-2">
                    <%if (Item.TIENICH_Wifi)
                    {%>
                        <input class="TIENICH_Wifi input-sm" id="TIENICH_Wifi" checked="checked" name="TIENICH_Wifi" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="TIENICH_Wifi input-sm" id="TIENICH_Wifi" name="TIENICH_Wifi" type="checkbox"/>
                    <% } %>
                </div>
                <label for="TIENICH_Wc" class="col-sm-2 control-label">Wc:</label>
                <div class="col-sm-2">
                    <%if (Item.TIENICH_Wc)
                    {%>
                        <input class="TIENICH_Wc input-sm" id="TIENICH_Wc" checked="checked" name="TIENICH_Wc" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="TIENICH_Wc input-sm" id="TIENICH_Wc" name="TIENICH_Wc" type="checkbox"/>
                    <% } %>
                </div>
                <label for="TIENICH_Tivi" class="col-sm-2 control-label">Tivi:</label>
                <div class="col-sm-2">
                    <%if (Item.TIENICH_Tivi)
                    {%>
                        <input class="TIENICH_Tivi input-sm" id="TIENICH_Tivi" checked="checked" name="TIENICH_Tivi" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="TIENICH_Tivi input-sm" id="TIENICH_Tivi" name="TIENICH_Tivi" type="checkbox"/>
                    <% } %>
                </div>
            </div>
            
            <div class="form-group">
                <label for="TIENICH_Nuoc" class="col-sm-2 control-label">Nước uống:</label>
                <div class="col-sm-2">
                    <%if (Item.TIENICH_Nuoc)
                    {%>
                        <input class="TIENICH_Nuoc input-sm" id="TIENICH_Nuoc" checked="checked" name="TIENICH_Nuoc" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="TIENICH_Nuoc input-sm" id="TIENICH_Nuoc" name="TIENICH_Nuoc" type="checkbox"/>
                    <% } %>
                </div>
                <label for="TIENICH_Chan" class="col-sm-2 control-label">Chăn mềm:</label>
                <div class="col-sm-2">
                    <%if (Item.TIENICH_Chan)
                    {%>
                        <input class="TIENICH_Chan input-sm" id="TIENICH_Chan" checked="checked" name="TIENICH_Chan" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="TIENICH_Chan input-sm" id="TIENICH_Chan" name="TIENICH_Chan" type="checkbox"/>
                    <% } %>
                </div>
                <label for="TIENICH_AnNhe" class="col-sm-2 control-label">Ăn nhẹ:</label>
                <div class="col-sm-2">
                    <%if (Item.TIENICH_AnNhe)
                    {%>
                        <input class="TIENICH_AnNhe input-sm" id="TIENICH_AnNhe" checked="checked" name="TIENICH_AnNhe" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="TIENICH_AnNhe input-sm" id="TIENICH_AnNhe" name="TIENICH_AnNhe" type="checkbox"/>
                    <% } %>
                </div>
            </div>
            
            <div class="form-group">
                <label for="DanhGia_Luot" class="col-sm-2 control-label">Lượt đánh giá:</label>
                <div class="col-sm-2">
                    <input type="text" name="DanhGia_Luot" id="DanhGia_Luot" value="<%=Item.DanhGia_Luot %>" class="form-control DanhGia_Luot">
                </div>
                <label for="DanhGia_Diem" class="col-sm-2 control-label">Tổng điểm đánh giá:</label>
                <div class="col-sm-2">
                    <input type="text" name="DanhGia_Diem" id="DanhGia_Diem" value="<%=Item.DanhGia_Diem %>" class="form-control DanhGia_Diem">
                </div>
            </div>

            <%if (!string.IsNullOrEmpty(Id)){ %>
                <div class="help-block">
                    <div class="well well-sm">
                        <i class="glyphicon glyphicon-info-sign"></i>
                        <strong><%=Item.Username %></strong> tạo ngày <%=Item.NgayTao.ToString("HH:mm dd/MM/yyyy") %>.
                        sửa lúc <%=Item.NgayCapNhat.ToString("HH:mm dd/MM/yyyy") %>
                    </div>
                </div>
            <%} %>
            <p class="alert alert-danger" style="display: none;"></p>
            <p class="alert alert-success" style="display: none;"></p>
        </div>
        
    
    </div>
    
    

    <div class="panel-footer">
        <%if (string.IsNullOrEmpty(Ret))
          { %>
            <a href="/lib/pages/Xe/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
            <a href="/lib/pages/Xe/Add.aspx" class="btn btn-success">Thêm</a>
            <%if(Item.Username == Security.Username){ %>
                <a href="javascript:;" data-id="<%=Item.ID %>" class="btn btn-warning xoaBtn">Xóa</a>
            <%} %>
        <%}
        else
        {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
        <%} %>
    </div>
</div>
<script src="/lib/js/jQueryLib/bootstrap-timepicker.min.js"></script>

<%if(!string.IsNullOrEmpty(Id))
  {%>
  <script>
      $(function () {
      });
  </script>    
<%  } %>