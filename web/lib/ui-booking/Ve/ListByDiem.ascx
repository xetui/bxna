<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ListByDiem.ascx.cs" Inherits="lib_ui_booking_Ve_ListByDiem" %>
<%@ Register Src="~/lib/ui-booking/Ve/templates/ListByDiem_Item.ascx" TagPrefix="uc1" TagName="ListByDiem_Item" %>

<table class="table table-hover DatVeRsPnl">
    <thead>
    <tr>
        <td colspan="2">
            <div class="row">
                <div class="col-md-5 col-xs-5">
                    <b><%=Di.TINH_Ten %></b>
                    <br/><%=Di.Ten %>
                </div>
                <div class="col-md-2 col-xs-1">
                    <p>
                        →
                    </p>
                </div>
                <div class="col-md-5 col-xs-5">
                    <b><%=Den.TINH_Ten %></b>
                    <br/><%=Den.Ten %>
                </div>
            </div>
        </td>
        <td>
            <a href="/" class="btn btn-block btn-success btn-lg btn-DatVeBtn">
                <i class="glyphicon glyphicon-search"></i>
            </a>
        </td>
    </tr>
    </thead>
    <asp:Repeater runat="server" ID="rpt">
        <ItemTemplate>
            <uc1:ListByDiem_Item runat="server" id="ListByDiem_Item"  Item='<%# Container.DataItem %>' />
        </ItemTemplate>
    </asp:Repeater>
</table>
<!-- Modal bến đến -->
<div class="modal fade" id="datVe_ChonGheModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="H1">
            CHỌN GHẾ
        </h4>
      </div>
      <div class="modal-body">
        <div 
            data-ngay="<%=NgayStr %>" 
            data-di="<%=Di.ID %>" 
            data-den="<%=Den.ID %>" 
            class="datVe_ChonGheBody"
            data-src="/lib/ajax/booking/Default.aspx"
            ></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-block" data-dismiss="modal">Đóng</button>
      </div>
    </div>
  </div>
</div>