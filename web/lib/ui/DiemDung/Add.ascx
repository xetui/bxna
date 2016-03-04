<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Add.ascx.cs" Inherits="lib_ui_DiemDung_Add" %>
<div class="panel panel-default Normal-Pnl-Add" 
    data-url="/lib/ajax/DiemDung/default.aspx"
    data-success="/lib/pages/DiemDung/Add.aspx?ID="
    data-list="/lib/pages/DiemDung/"
    >
    <div class="panel-heading">
        <%if (string.IsNullOrEmpty(Ret))
          { %>
            <a href="/lib/pages/DiemDung/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
            <a href="/lib/pages/DiemDung/Add.aspx" class="btn btn-success">Thêm</a>
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
                <label for="Ten" class="col-sm-2 control-label">Tên:</label>
                <div class="col-sm-10">
                    <input type="text" name="Ten" id="Ten" value="<%=Item.Ten %>" class="form-control Ten">
                </div>
            </div>
            <div class="form-group">
                <label for="DI_ID" class="col-sm-2 control-label">Tỉnh:</label>
                <div class="col-sm-4">
                    <div class="input-group">
                        <input type="text" data-src="/lib/ajax/DanhMuc/Default.aspx?LDM=Tinh" data-refId="TINH_ID" class="form-control form-autocomplete-input TINH_Ten" name="TINH_Ten" id="TINH_Ten" value="<%=Item.TINH_Ten %>"/>
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control TINH_ID" name="TINH_ID" id="TINH_ID" value="<%=Item.TINH_ID == Guid.Empty ? "" : Item.TINH_ID.ToString() %>"/>
                    </div>
                </div>
                
            </div>

            <div class="form-group">
                <label for="Khoa" class="col-sm-2 control-label">Bến</label>
                <div class="col-sm-10">
                    <%if (Item.Ben)
                    {%>
                        <input class="NoiTinh input-sm" id="Ben" checked="checked" name="Ben" type="checkbox"/>
                    <%}
                    else
                    {%>
                        <input class="NoiTinh input-sm" id="Ben" name="Ben" type="checkbox"/>
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
            <a href="/lib/pages/DiemDung/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
           <a href="/lib/pages/DiemDung/Add.aspx" class="btn btn-success">Thêm</a>
            <a href="javascript:;" data-id="<%=Item.ID %>" class="btn btn-warning xoaBtn">Xóa</a>
        <%}
        else
        {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
        <%} %>
    </div>
</div>