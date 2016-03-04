<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Item.ascx.cs" Inherits="lib_ui_XeDiemDung_templates_Item" %>
<tr>
    <td class="">
        <a href="/lib/pages/XeDiemDung/Add.aspx?ID=<%=Item.ID %>">
            <%=Item.ID %>
        </a>
    </td>
    <td class="">
        <a href="/lib/pages/XeDiemDung/Add.aspx?ID=<%=Item.ID %>">
            <%=Item.DIEM_Ten %>
        </a>
    </td>
    <td class="">
        <a href="/lib/pages/DiemDung/?XE_ID=<%=Item.XE_ID %>">
            <%=Item.XE_BienSo %>
        </a>
    </td>
    <td>
        <%=Item.ThoiGian %>
    </td>
    <td>
        <%=Item.ThuTu %>
    </td>
</tr>