﻿<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Admin_User.master" AutoEventWireup="true" CodeFile="Add.aspx.cs" Inherits="lib_pages_DiemDung_Add" %>

<%@ Register Src="~/lib/ui/DiemDung/Add.ascx" TagPrefix="uc1" TagName="Add" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head3" Runat="Server">
    <title>Thêm sửa điểm dừng</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder4" Runat="Server">
    <uc1:Add runat="server" id="Add" />
</asp:Content>

