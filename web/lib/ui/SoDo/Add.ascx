<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Add.ascx.cs" Inherits="lib_ui_SoDo_Add" %>
<div class="panel panel-default Normal-Pnl-Add" 
    data-url="/lib/ajax/SoDo/default.aspx"
    data-success="/lib/pages/SoDo/Add.aspx?ID="
    data-list="/lib/pages/SoDo/"
    >
    <div class="panel-heading">
        <%if (string.IsNullOrEmpty(Ret))
          { %>
            <a href="/lib/pages/SoDo/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
            <a href="/lib/pages/SoDo/Add.aspx" class="btn btn-success">Thêm</a>
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
                <div class="col-sm-4">
                    <input type="text" name="Ten" id="Ten" value="<%=Item.Ten %>" class="form-control Ten">
                </div>
                <label for="ThuTu" class="col-sm-2 control-label">Thứ tự:</label>
                <div class="col-sm-4">
                    <input type="text" name="ThuTu" id="ThuTu" value="<%=Item.ThuTu %>" class="form-control ThuTu">
                </div>
            </div>
            <div class="form-group">
               <label for="ThuTu" class="col-sm-2 control-label">Class:</label>
                <div class="col-sm-10">
                    <input type="text" name="CssClass" id="CssClass" value="<%=Item.CssClass %>" class="form-control CssClass">
                </div>
                
            </div>
            
            <p class="alert alert-danger" style="display: none;"></p>
            <p class="alert alert-success" style="display: none;"></p>
        </div>
    </div>
    <div class="panel-footer">
        <%if (string.IsNullOrEmpty(Ret))
          { %>
            <a href="/lib/pages/SoDo/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <% }else{ %>
            <a href="<%=Ret %>" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i></a>
        <%} %>
        <%if (!string.IsNullOrEmpty(Id))
            {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
           <a href="/lib/pages/SoDo/Add.aspx" class="btn btn-success">Thêm</a>
            <a href="javascript:;" data-id="<%=Item.ID %>" class="btn btn-warning xoaBtn">Xóa</a>
        <%}
        else
        {%>
            <a href="javascript:;" data-ret="<%=Ret %>" class="btn btn-primary savebtn">Lưu</a>
        <%} %>
    </div>
</div>
