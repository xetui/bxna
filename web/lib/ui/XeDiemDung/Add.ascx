<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Add.ascx.cs" Inherits="lib_ui_XeDiemDung_Add" %>
<div class="panel panel-default Normal-Pnl-Add" 
    data-url="/lib/ajax/XeDiemDung/default.aspx"
    data-success="/lib/pages/XeDiemDung/Add.aspx?ID="
    data-list="/lib/pages/XeDiemDung/"
    >
    <div class="panel-heading">
        <%if (string.IsNullOrEmpty(Ret))
          { %>
            <a href="/lib/pages/XeDiemDung/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
            <a href="/lib/pages/XeDiemDung/Add.aspx" class="btn btn-success">Thêm</a>
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
                <label for="DI_ID" class="col-sm-2 control-label">Điểm:</label>
                <div class="col-sm-4">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/DiemDung/Default.aspx" data-refId="DIEM_ID" class="form-control form-autocomplete-input DIEM_Ten" name="DIEM_Ten" id="DIEM_Ten" value="<%=Item.DIEM_Ten %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control DIEM_ID" name="DIEM_ID" id="DIEM_ID" value="<%=Item.DIEM_ID == 0 ? "" : Item.DIEM_ID.ToString() %>"/>
                    </div>
                </div>
                <label for="DI_ID" class="col-sm-2 control-label">Xe:</label>
                <div class="col-sm-4">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/Xe/Default.aspx" data-refId="XE_ID" class="form-control form-autocomplete-input XE_BienSo" name="XE_BienSo" id="XE_BienSo" value="<%=Item.XE_BienSo %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control XE_ID" name="XE_ID" id="XE_ID" value="<%=Item.XE_ID == 0 ? "" : Item.XE_ID.ToString() %>"/>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="ThuTu" class="col-sm-2 col-xs-2 control-label">Thứ tự:</label>
                <div class="col-sm-4 col-xs-4">
                    <input type="text" name="ThuTu" id="ThuTu" value="<%=Item.ThuTu %>" class="form-control ThuTu">
                </div>
                <label for="ThoiGian" class="col-sm-2 col-xs-2 control-label">Thời gian:</label>
                <div class="col-sm-4 col-xs-4">
                    <input type="text" name="ThoiGian" id="ThoiGian" value="<%=Item.ThoiGian %>" class="form-control ThoiGian">
                </div>
            </div>
            <div class="form-group">
                <label for="KhoangCach" class="col-sm-2 col-xs-2 control-label">Khoảng cách:</label>
                <div class="col-sm-4 col-xs-4">
                    <input type="text" name="KhoangCach" id="KhoangCach" value="<%=Item.KhoangCach %>" class="form-control KhoangCach">
                </div>
                <label for="Di" class="col-sm-2 col-xs-2 control-label">Chiều đi:</label>
                <div class="col-sm-4 col-xs-4">
                    <%if (Item.Di)
                    {%>
                        <input class="Khoa input-sm" id="Di" checked="checked" name="Di" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="Khoa input-sm" id="Di" name="Di" type="checkbox"/>
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
            <a href="/lib/pages/XeDiemDung/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
           <a href="/lib/pages/XeDiemDung/Add.aspx" class="btn btn-success">Thêm</a>
            <a href="javascript:;" data-id="<%=Item.ID %>" class="btn btn-warning xoaBtn">Xóa</a>
        <%}
        else
        {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
        <%} %>
    </div>
</div>