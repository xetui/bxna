<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Add.ascx.cs" Inherits="lib_ui_DatVe_Add" %>
<%@ Import Namespace="linh.common" %>
<div class="panel panel-default Normal-Pnl-Add" 
    data-url="/lib/ajax/DatVe/default.aspx"
    data-success="/lib/pages/DatVe/Add.aspx?ID="
    data-list="/lib/pages/DatVe/"
    >
    <div class="panel-heading">
        <%if (string.IsNullOrEmpty(Ret))
          { %>
            <a href="/lib/pages/DatVe/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
            <% if (!Item.ThanhToan)
               { %>
            <a href="javascript:;" class="btn btn-danger btn-datVeThanhToan">Thanh toán</a>
            <% } %>
            <a href="/lib/pages/DatVe/Add.aspx" class="btn btn-success">Thêm</a>
            <a href="javascript:;" data-id="<%=Item.ID %>" class="btn btn-warning xoaBtn">Xóa</a>

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
                <label class="col-sm-2 control-label">Hành trình:</label>
                <div class="col-sm-4">
                    <p class="form-control-static">
                        <%=Item.DI_Ten %> → <%=Item.DEN_Ten %>
                    </p>
                </div>
                <label for="Ngay" class="col-sm-2 control-label">Ngày:</label>
                <div class="col-sm-4">
                    <div id="LuuHanhPicker" class="input-append datepicker-input date input-group">
                        <input 
                            value="<%=Item.Ngay == DateTime.MinValue ?  DateTime.Now.ToString("dd/MM/yyyy") : Item.Ngay.ToString("dd/MM/yyyy") %>"
                            data-format="dd/MM/yyyy" 
                            class="form-control Ngay" 
                            id="Ngay" 
                            name="Ngay" 
                            type="text"/>
                        <span class="add-on input-group-addon">
                            <i data-time-icon="icon-time" data-date-icon="icon-calendar" class="glyphicon glyphicon-calendar">
                            </i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="TT_Ten" class="col-sm-2 control-label">Tình trạng:</label>
                <div class="col-sm-4">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/DanhMuc/Default.aspx?LDM=TTVE" data-refId="TT_ID" class="form-control form-autocomplete-input TT_Ten" name="TT_Ten" id="TT_Ten" value="<%=Item.TT_Ten %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control TT_ID" name="TT_ID" id="TT_ID" value="<%=Item.TT_ID == Guid.Empty ? "" : Item.TT_ID.ToString() %>"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="MaVe" class="col-sm-2 control-label">Mã:</label>
                <div class="col-sm-4">
                    <input type="text" name="MaVe" id="MaVe" value="<%=Item.MaVe %>" class="form-control MaVe">
                </div>
                <label for="Gia" class="col-sm-2 control-label">Tổng:</label>
                <div class="col-sm-4">
                    <input type="text" name="Gia" id="Gia" value="<%=Lib.TienVietNam(Item.Gia) %>" class="form-control Gia">
                </div>
            </div>
            <div class="form-group">
                <label for="Ten" class="col-sm-2 control-label">Tên:</label>
                <div class="col-sm-4">
                    <input type="text" name="Ten" id="Ten" value="<%=Item.Ten %>" class="form-control Ten">
                </div>
                <label for="Mobile" class="col-sm-2 control-label">Mobile:</label>
                <div class="col-sm-4">
                    <input type="text" name="Mobile" id="Mobile" value="<%=Item.Mobile %>" class="form-control Mobile">
                </div>
            </div>
            <div class="form-group">
                <label for="ThanhToan" class="col-sm-2 control-label">Thanh toán:</label>
                <div class="col-sm-4">
                    <%if (Item.ThanhToan)
                    {%>
                        <input class="ThanhToan input-sm" id="ThanhToan" checked="checked" name="ThanhToan" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="ThanhToan input-sm" id="ThanhToan" name="ThanhToan" type="checkbox"/>
                    <% } %>
                </div>
                <label for="ThanhToan" class="col-sm-2 control-label">Thanh toán:</label>
                <div class="col-sm-4">
                    <p class="form-control-static">
                        <%=Item.NgayThanhToan == DateTime.MinValue ? "" : Item.NgayThanhToan.ToString("HH:mm dd/MM") %>
                    </p>
                </div>
            </div>
            <div class="form-group">
                <label for="ChonGhe" class="col-sm-2 control-label">Chọn ghế:</label>
                <div class="col-sm-4">
                    <%if (Item.ChonGhe)
                    {%>
                        <input class="ChonGhe input-sm" id="ChonGhe" checked="checked" name="ChonGhe" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="ChonGhe input-sm" id="ChonGhe" name="ChonGhe" type="checkbox"/>
                    <% } %>
                </div>
                
                <label for="Huy" class="col-sm-2 control-label">Hủy:</label>
                <div class="col-sm-4">
                    <%if (Item.Huy)
                    {%>
                        <input class="Huy input-sm" id="Huy" checked="checked" name="Huy" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="Huy input-sm" id="Huy" name="Huy" type="checkbox"/>
                    <% } %>
                </div>
            </div>
            <p class="alert alert-danger" style="display: none;"></p>
            <p class="alert alert-success" style="display: none;"></p>
        </div>
    </div>
    <div class="panel-footer">
        <%if (string.IsNullOrEmpty(Ret))
          { %>
            <a href="/lib/pages/DatVe/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
            <% if (!Item.ThanhToan)
                { %>
                <a href="javascript:;" class="btn btn-danger btn-datVeThanhToan">Thanh toán</a>
            <% } %>
           <a href="/lib/pages/DatVe/Add.aspx" class="btn btn-success">Thêm</a>
            <a href="javascript:;" data-id="<%=Item.ID %>" class="btn btn-warning xoaBtn">Xóa</a>
        <%}
        else
        {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
        <%} %>
    </div>
</div>