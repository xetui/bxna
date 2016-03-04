<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Front_Content.master" AutoEventWireup="true" CodeFile="DatVe_View.aspx.cs" Inherits="lib_booking_DatVe_View" %>

<%@ Register Src="~/lib/ui-booking/Ve/DatVe_View.ascx" TagPrefix="uc1" TagName="DatVe_View" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="MainBody MainBodyWhite">
        <div class="Box">
            <uc1:DatVe_View runat="server" id="DatVe_View" />
        </div>
    </div>
</asp:Content>

