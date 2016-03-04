<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Item-Ajax.ascx.cs" Inherits="lib_ui_Ghe_templates_Item_Ajax" %>
<tr>
    <td class="">
        <%=Item.ID %>
    </td>
    <td class="">
        <input name="Ma" class="form-control Ma" value="<% = Item.Ma %>" />
    </td>
    <td class="">
        <input name="Tang" class="form-control Tang" value="<% = Item.Tang %>" />
    </td>
    <td>
        <input name="ThuTu" class="form-control ThuTu" value="<% = Item.ThuTu %>" />
    </td>
    <td>
        <input name="CssClass" class="form-control CssClass" value="<% = Item.CssClass %>" />
    </td>
    <td>
        <button class="btn btn-default btnXoaGhe btn-block" data-id="<%=Item.ID %>">
            <i class="glyphicon glyphicon-remove"></i>
        </button>
    </td>
</tr>