<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Ajax-Item.ascx.cs" Inherits="lib_ui_XeDiemDung_templates_Ajax_Item" %>
<tr>
    <td class="">
        <%=Item.ID %>
    </td>
    <td class="">
        <input name="DIEM_ID" class="form-control DIEM_ID" value="<% = Item.DIEM_Ten %>" />
    </td>
    <td class="">
        <input name="ThuTu" class="form-control ThuTu" value="<% = Item.ThuTu %>" />
    </td>
    <td>
        <input name="KhoangCach" class="form-control KhoangCach" value="<% = Item.KhoangCach %>" />
    </td>
    <td>
        <input name="ThoiGian" class="form-control ThoiGian" value="<% = Item.ThoiGian %>" />
    </td>
    <td>
        <%=Item.Di ? "✔" : "" %>
    </td>
    <td>
        <button class="btn btn-default btnXoaDiemDung btn-block" data-id="<%=Item.ID %>">
            <i class="glyphicon glyphicon-remove"></i>
        </button>
    </td>
</tr>