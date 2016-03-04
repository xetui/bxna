<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Item.ascx.cs" Inherits="lib_ui_SoDo_templates_Item" %>
<tr>
    <td class="">
        <a href="/lib/pages/SoDo/Add.aspx?ID=<%=Item.ID %>">
            <%=Item.ID %>
        </a>
    </td>
    <td class="">
        <a href="/lib/pages/SoDo/Add.aspx?ID=<%=Item.ID %>">
            <%=Item.Ten %>
        </a>
    </td>
    <td class="">
        <%=Item.CssClass %>
    </td>
    <td>
        <%=Item.ThuTu %>
    </td>
</tr>