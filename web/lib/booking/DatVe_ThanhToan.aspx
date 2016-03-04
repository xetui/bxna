<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Front_Content.master" AutoEventWireup="true" CodeFile="DatVe_ThanhToan.aspx.cs" Inherits="lib_booking_DatVe_ThanhToan" %>

<%@ Register Src="~/lib/ui-booking/Ve/DatVe_ThanhToan.ascx" TagPrefix="uc1" TagName="DatVe_ThanhToan" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="MainBody MainBodyWhite">
        <div class="Box">
            <uc1:DatVe_ThanhToan runat="server" ID="DatVe_ThanhToan" />
        </div>
    </div>    
</asp:Content>

