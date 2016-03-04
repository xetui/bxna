<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Admin_User.master" AutoEventWireup="true" CodeFile="Add.aspx.cs" Inherits="lib_pages_SoDo_Add" %>

<%@ Register Src="~/lib/ui/SoDo/Add.ascx" TagPrefix="uc1" TagName="Add" %>
<%@ Register Src="~/lib/ui/Ghe/List-Ajax.ascx" TagPrefix="uc1" TagName="ListAjax" %>



<asp:Content ID="Content1" ContentPlaceHolderID="head3" Runat="Server">
    <title>
        Sơ đồ chỗ ngồi
    </title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder4" Runat="Server">
    <uc1:Add runat="server" id="Add" />
    <uc1:ListAjax runat="server" id="ListAjax" Visible="False" />
</asp:Content>

