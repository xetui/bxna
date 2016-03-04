<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Item.ascx.cs" Inherits="lib_ui_DiemDung_templates_Item" %>
<tr>
    <td class="">
        <a href="/lib/pages/DiemDung/Add.aspx?ID=<%=Item.ID %>">
            <%=Item.ID %>
        </a>
    </td>
    <td class="">
        <a href="/lib/pages/DiemDung/Add.aspx?ID=<%=Item.ID %>">
            <%=Item.Ten %>
        </a>
    </td>
    <td class="">
        <a href="/lib/pages/DiemDung/?TINH_ID=<%=Item.TINH_ID %>">
            <%=Item.TINH_Ten %>
        </a>
    </td>
    <td>
        <%=Item.Ben ? "✔" : "" %>
    </td>
</tr>