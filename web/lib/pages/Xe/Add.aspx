<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Admin_User.master" AutoEventWireup="true" CodeFile="Add.aspx.cs" Inherits="lib_pages_Xe_Add" %>

<%@ Register Src="~/lib/ui/Xe/Add.ascx" TagPrefix="uc1" TagName="Add" %>
<%@ Register Src="~/lib/ui/XeDiemDung/List-Ajax.ascx" TagPrefix="uc1" TagName="ListAjax" %>



<asp:Content ID="Content1" ContentPlaceHolderID="head3" Runat="Server">
    <title>
        <%=Item.ID==0 ? "Thêm mới xe" : Item.BienSo_Chu + " " + Item.BienSo_So %>
    </title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder4" Runat="Server">
    <uc1:Add runat="server" id="Add" />
    <%if(Item.ID!=0){ %>
    <uc1:ListAjax runat="server" id="ListAjax" />
    <%} %>
</asp:Content>

