<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ListByDiemQuanLy.ascx.cs" Inherits="lib_ui_booking_Ve_ListByDiemQuanLy" %>
<%@ Register Src="~/lib/ui-booking/Ve/templates/ListByDiem_ItemQuanLy.ascx" TagPrefix="uc1" TagName="ListByDiem_ItemQuanLy" %>

<table class="table table-responsive">
    <thead>
    <tr>
        <td>
            Nhà xe
        </td>
        <td>
            Giường
        </td>
        <td>
            Giá vé
        </td>
        <td>
            
        </td>
    </tr>
    </thead>
    <tbody>
    <asp:Repeater runat="server" ID="rpt">
        <ItemTemplate>
            <uc1:ListByDiem_ItemQuanLy runat="server" ID="ListByDiem_ItemQuanLy" Item='<%# Container.DataItem %>' />
        </ItemTemplate>
    </asp:Repeater>    
    </tbody>
</table>

