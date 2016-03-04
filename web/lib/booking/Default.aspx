<%@ Page Title="" Language="C#" MasterPageFile="~/lib/master/Front_Content.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="lib_booking_Default" %>

<%@ Register Src="~/lib/ui-booking/Ve/DatVe.ascx" TagPrefix="uc1" TagName="DatVe" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <title>Đặt vé - Bến xe nghệ an</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    
        <div class="MainBody MainBodyWhite">
            <div class="Box">
                <div class="Box-header">
                    <span class="Box-title">
                        Đặt vé
                    </span>
                    <span class="Box-headerArrow">
                    </span>
                </div>
                <div class="Box-Body">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <uc1:DatVe runat="server" id="DatVe" />                                                                
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <br/><br/><br/><br/><br/><br/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="MainBody MainBodyGray">
            
        </div>
</asp:Content>

