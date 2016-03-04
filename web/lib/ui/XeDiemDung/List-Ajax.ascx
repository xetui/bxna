<%@ Control Language="C#" AutoEventWireup="true" CodeFile="List-Ajax.ascx.cs" Inherits="lib_ui_XeDiemDung_List_Ajax" %>
<%@ Register Src="~/lib/ui/XeDiemDung/templates/Ajax-Item.ascx" TagPrefix="uc1" TagName="AjaxItem" %>
<table class="table Xe-DiemDung-List">
    <thead>    
        <tr>
            <th>
                #
            </th>
            <th>
                Điểm dừng
            </th>
            <th>
                Thứ tự
            </th>
            <th>
                K.Cách
            </th>
            <th>
                T.Gian
            </th>
            <th>
                Đi
            </th>
            <th>
                
            </th>
        </tr>
    </thead>
    <tbody>
        <tr class="Xe-DiemDung-AddPnl" data-url="/lib/ajax/DiemDung/Default.aspx">
            <td class="">

            </td>
            <td class="" style="width: 200px;">
                <div class="input-group">
                        <input type="text" data-src="/lib/ajax/DiemDung/Default.aspx" data-refId="DIEM_ID" class="form-control form-autocomplete-input DIEM_Ten" name="DIEM_Ten" id="DIEM_Ten" />
                        <span class="input-group-btn">
                        <button class="btn btn-default autocomplete-btn" tabindex="-1" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        </span>
                        <input type="text" style="display: none;" class="form-control DIEM_ID" name="DIEM_ID" id="DIEM_ID"/>
                    </div>
            </td>
            <td class="">
                <input name="ThuTu" placeholder="Thứ tự" class="form-control ThuTu"/>
            </td>
            <td>
                <input name="KhoangCach" placeholder="Khoảng cách" class="form-control KhoangCach"/>
            </td>
            <td>
                <input name="ThoiGian" placeholder="Thời gian" class="form-control ThoiGian" />
            </td>
            <td>
                <input name="Di" type="checkbox" class="form-control Di" />
            </td>
            <td>
                <button class="btn btn-default btn-block savebtn" data-id="<%=Item.ID %>">
                    <i class="glyphicon glyphicon-plus"></i>
                </button>
            </td>
        </tr>    
        <asp:Repeater runat="server" ID="rpt">
            <ItemTemplate>
                <uc1:AjaxItem runat="server" id="AjaxItem" Item='<%# Container.DataItem %>' />
            </ItemTemplate>
        </asp:Repeater> 
    </tbody>
    
</table>