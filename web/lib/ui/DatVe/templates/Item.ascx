<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Item.ascx.cs" Inherits="lib_ui_DatVe_templates_Item" %>
<%@ Import Namespace="linh.common" %>
<tr>
    <td class="">
        <a href="/lib/pages/DatVe/Add.aspx?ID=<%=Item.ID %>">
            <%=Item.Ma %>
        </a>
    </td>
    <td class="">
        <a href="/lib/pages/DatVe/Add.aspx?ID=<%=Item.ID %>">
            <%=Item.MaVe %>
        </a> <b><%=Lib.TienVietNam(Item.Gia) %></b>
        <br/><%=Item.DI_Ten %> → <%=Item.DEN_Ten %>
    </td>
    <td class="">
        <%=Item.Ten %> - <%=Item.Mobile %>
        <br/>Ngày đi: <%=Item.Ngay.ToString("dd/MM/yyyy") %>
    </td>
    <td class="">
        <a href="/lib/pages/DatVe/?TT_ID=<%=Item.TT_ID %>">
            <%=Item.TT_Ten %>
        </a>
    </td>
    <td>
        <%=Item.ThanhToan ? "✔" : "" %>
    </td>
    <td>
        <%=Item.Huy ? "✔" : "" %>
    </td>
    <td>
        <%=Item.NgayTao.ToString("HH:mm dd/MM") %>
    </td>
</tr>