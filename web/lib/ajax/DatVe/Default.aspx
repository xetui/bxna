<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="lib_ajax_DatVe_Default" %>
<%@ Register Src="~/lib/ui-booking/Ve/ListByDiemQuanLy.ascx" TagPrefix="uc1" TagName="ListByDiemQuanLy" %>
<%@ Register Src="~/lib/ui-booking/Ve/DatVe_ChonCho.ascx" TagPrefix="uc1" TagName="DatVe_ChonCho" %>
<%@ Register Src="~/lib/ui/DatVe/ChonChoQuanLy.ascx" TagPrefix="uc1" TagName="ChonChoQuanLy" %>
<uc1:ListByDiemQuanLy runat="server" ID="ListByDiemQuanLy" Visible="False" />
<uc1:ChonChoQuanLy runat="server" ID="ChonChoQuanLy" Visible="False" />
