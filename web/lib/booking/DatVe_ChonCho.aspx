<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Front_Content.master" AutoEventWireup="true" CodeFile="DatVe_ChonCho.aspx.cs" Inherits="lib_booking_DatVe_ChonCho" %>
<%@ Register Src="~/lib/ui-booking/Ve/DatVe_ChonCho.ascx" TagPrefix="uc1" TagName="DatVe_ChonCho" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="MainBody MainBodyWhite">
        <div class="Box">
            <uc1:DatVe_ChonCho runat="server" id="DatVe_ChonCho" />
        </div>
    </div>
</asp:Content>

