<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ListByDiem_ItemQuanLy.ascx.cs" Inherits="lib_ui_booking_Ve_templates_ListByDiem_ItemQuanLy" %>
<%@ Import Namespace="linh.common" %>
<tr class="datVeXe-Item">
    <td>
        <a href="/datve?XE_ID=<%=Item.ID %>&CHIEUDI=<%=Item.Di %>&DI_ID=<%=Item.DI_ID %>&DEN_ID=<%=Item.DEN_ID %>&Ngay=<%=Item.NgayStr %>"
            title="<%=Item.BienSo %>" class="datVeXe-Item-NhaXe">
            <%=Item.DONVI_Ten %>
        </a>
        <br/><span class="datVeXe-Item-Gio"><%=Item.DI_GioXuatBen %> ➡ <%=Item.DI_GioDen %></span>
    </td>
    <td>
        <span class="datVeXe-Item-GheConLai">
           Còn <b><%=Item.Ghe - Item.VeDaBan %></b> ghế
        </span>
        <br/>
        <span class="datVeXe-Item-LoaiXe">
            <%=Item.LOAIXE_Ten %>
        </span>
    </td>
    <td class="text-right">        
        <span style="color: red; font-size: 20pt; font-weight: bold;"><%=Item.GiaVe.TienVietNam() %></span>
    </td>
    <td>
        <button class="btn btn-danger btn-block btn-lg btnQuanLyDatVe"
            data-xeId="<%=Item.ID %>"
            data-diId="<%=Item.DI_ID %>"
            data-denId="<%=Item.DEN_ID %>"
            data-chieuDi="<%=Item.Di %>"
            data-ngay="<%=Item.NgayStr %>"
            >
            <i class="glyphicon glyphicon-plus"></i>
        </button>
    </td>
</tr>