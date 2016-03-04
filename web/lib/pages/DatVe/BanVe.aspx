<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Admin_Blank.master" AutoEventWireup="true" CodeFile="BanVe.aspx.cs" Inherits="lib_pages_DatVe_BanVe" %>
<%@ Register Src="~/lib/ui/DatVe/BanVe.ascx" TagPrefix="uc1" TagName="BanVe" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <title>Bán vé</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <uc1:BanVe runat="server" ID="BanVe" />
</asp:Content>

