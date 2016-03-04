<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Front_Content.master" AutoEventWireup="true" CodeFile="List.aspx.cs" Inherits="lib_booking_List" %>

<%@ Register Src="~/lib/ui-booking/Ve/ListByDiem.ascx" TagPrefix="uc1" TagName="ListByDiem" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="MainBody MainBodyWhite">
        <div class="Box">
            <uc1:ListByDiem runat="server" id="ListByDiem" />
        </div>
    </div>
</asp:Content>

